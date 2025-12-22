"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBooking } from "../../components/BookingContext";

// Bank account interface
interface BankAccountData {
	id: string;
	bankName: string;
	accountNumber: string;
	accountName: string;
	logo: string;
	isActive: boolean;
}

type PaymentMethod = "bank" | "ewallet" | "va";
type PaymentStep = "select-method" | "select-bank" | "transfer-instructions" | "upload-proof";

export default function Step4Page() {
	const params = useParams();
	const router = useRouter();
	const { booking, updateBooking, getTotalPrice } = useBooking();
	const tripId = params.tripId as string;

	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
	const [paymentStep, setPaymentStep] = useState<PaymentStep>("select-method");
	const [selectedBank, setSelectedBank] = useState<BankAccountData | null>(null);
	const [proofFile, setProofFile] = useState<File | null>(null);
	const [proofPreview, setProofPreview] = useState<string>("");
	const [uploading, setUploading] = useState(false);
	const [copied, setCopied] = useState(false);
	const [bankAccounts, setBankAccounts] = useState<BankAccountData[]>([]);
	const [loadingBanks, setLoadingBanks] = useState(true);

	useEffect(() => {
		// Generate booking ID when reaching payment page
		if (!booking.bookingId) {
			const bookingId = `ADVHUB${Date.now()}`;
			updateBooking({ bookingId });
		}

		// Fetch bank accounts from API
		const fetchBankAccounts = async () => {
			try {
				const res = await fetch('/api/bank-accounts?active=true');
				if (res.ok) {
					const data = await res.json();
					setBankAccounts(data);
				}
			} catch (error) {
				console.error('Failed to fetch bank accounts:', error);
			} finally {
				setLoadingBanks(false);
			}
		};
		fetchBankAccounts();
	}, []);

	const handleMethodSelect = (method: PaymentMethod) => {
		setPaymentMethod(method);
		if (method === "bank") {
			setPaymentStep("select-bank");
		}
		// For e-wallet and VA, stay on select-method (coming soon)
	};

	const handleBankSelect = (bank: typeof bankAccounts[0]) => {
		setSelectedBank(bank);
		setPaymentStep("transfer-instructions");
	};

	const handleCopyAccountNumber = () => {
		if (selectedBank) {
			navigator.clipboard.writeText(selectedBank.accountNumber);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setProofFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setProofPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUploadProof = async () => {
		if (!proofFile) {
			alert("Please select a proof of payment image");
			return;
		}

		setUploading(true);

		try {
			// Upload the file
			const formData = new FormData();
			formData.append("file", proofFile);

			const uploadRes = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			let proofUrl = "";
			if (uploadRes.ok) {
				const data = await uploadRes.json();
				proofUrl = data.url;
			} else {
				// Fallback: use base64 preview if upload fails
				proofUrl = proofPreview;
			}

				// Create booking with payment proof
			const bookingData = {
				tripId: booking.tripId,
				tripName: booking.tripName,
				tripImage: booking.tripImage,
				tripLocation: booking.tripLocation,
				customerName: booking.mainBooker?.fullName || '',
				email: booking.mainBooker?.email || '',
				phone: booking.mainBooker?.phone || '',
				date: booking.selectedSlot?.date,
				guests: booking.participantCount,
				totalPrice: getTotalPrice(),
				pricePerPax: booking.pricePerPax,
				participants: booking.participants,
				status: "Pending",
				paymentStatus: "Unpaid",
				paymentMethod: `Bank Transfer - ${selectedBank?.bankName}`,
				proofOfPaymentUrl: proofUrl,
			};

			const res = await fetch("/api/bookings", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bookingData),
			});

			if (res.ok) {
				const savedBooking = await res.json();
				router.push(`/booking/${tripId}/thankyou?bookingId=${savedBooking.id}`);
			} else {
				alert("Failed to save booking. Please try again.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred. Please try again.");
		} finally {
			setUploading(false);
		}
	};

	const handleBack = () => {
		if (paymentStep === "upload-proof") {
			setPaymentStep("transfer-instructions");
		} else if (paymentStep === "transfer-instructions") {
			setPaymentStep("select-bank");
		} else if (paymentStep === "select-bank") {
			setPaymentStep("select-method");
		} else {
			router.push(`/booking/${tripId}/step3`);
		}
	};

	return (
		<main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Progress */}
			<div className="mb-10 max-w-[960px] mx-auto">
				<div className="flex justify-between items-end mb-3">
					<p className="text-base font-semibold text-white">Step 4 of 4</p>
					<p className="text-text-secondary text-sm">Payment</p>
				</div>
				<div className="h-2 w-full rounded-full bg-border-dark overflow-hidden">
					<div
						className="h-full bg-primary transition-all duration-500 ease-out"
						style={{ width: "100%" }}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1100px] mx-auto">
				{/* Left Column */}
				<div className="lg:col-span-8 flex flex-col gap-8">
					<div>
						<h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2 text-white">
							Complete Payment
						</h1>
						<p className="text-text-secondary">
							{paymentStep === "select-method" && "Choose your preferred payment method."}
							{paymentStep === "select-bank" && "Select your bank for transfer."}
							{paymentStep === "transfer-instructions" && "Transfer to the account below."}
							{paymentStep === "upload-proof" && "Upload your proof of payment."}
						</p>
					</div>

					{/* Step 1: Select Payment Method */}
					{paymentStep === "select-method" && (
						<div className="bg-surface-dark rounded-xl p-6 border border-border-dark">
							<h3 className="text-lg font-bold mb-4 text-white">
								Payment Methods
							</h3>
							<div className="space-y-3">
								{/* Bank Transfer - Active */}
								<button
									onClick={() => handleMethodSelect("bank")}
									className={`w-full flex items-center gap-4 p-4 rounded-lg border text-left transition ${
										paymentMethod === "bank"
											? "border-primary bg-primary/10"
											: "border-border-dark bg-background-dark hover:border-primary"
									}`}>
									<span className="material-symbols-outlined text-primary text-2xl">
										account_balance
									</span>
									<div className="flex-1">
										<p className="text-white font-medium">Bank Transfer</p>
										<p className="text-text-secondary text-sm">
											BCA, Mandiri, BNI
										</p>
									</div>
									<span className="material-symbols-outlined text-primary">
										chevron_right
									</span>
								</button>

								{/* E-Wallet - Coming Soon */}
								<div
									className="flex items-center gap-4 p-4 rounded-lg border border-border-dark bg-background-dark opacity-60 cursor-not-allowed">
									<span className="material-symbols-outlined text-gray-500 text-2xl">
										account_balance_wallet
									</span>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<p className="text-gray-400 font-medium">E-Wallet</p>
											<span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full font-medium">
												Coming Soon
											</span>
										</div>
										<p className="text-gray-500 text-sm">
											GoPay, OVO, Dana, ShopeePay
										</p>
									</div>
								</div>

								{/* Virtual Account - Coming Soon */}
								<div
									className="flex items-center gap-4 p-4 rounded-lg border border-border-dark bg-background-dark opacity-60 cursor-not-allowed">
									<span className="material-symbols-outlined text-gray-500 text-2xl">
										payment
									</span>
									<div className="flex-1">
										<div className="flex items-center gap-2">
											<p className="text-gray-400 font-medium">Virtual Account</p>
											<span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded-full font-medium">
												Coming Soon
											</span>
										</div>
										<p className="text-gray-500 text-sm">
											All Indonesian banks
										</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Step 2: Select Bank */}
					{paymentStep === "select-bank" && (
						<div className="bg-surface-dark rounded-xl p-6 border border-border-dark">
							<h3 className="text-lg font-bold mb-4 text-white">
								Select Bank Account
							</h3>
							<div className="space-y-3">
								{bankAccounts.map((bank) => (
									<button
										key={bank.id}
										onClick={() => handleBankSelect(bank)}
										className="w-full flex items-center gap-4 p-4 rounded-lg border border-border-dark bg-background-dark hover:border-primary text-left transition">
										<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl">
											{bank.logo}
										</div>
										<div className="flex-1">
											<p className="text-white font-medium">{bank.bankName}</p>
											<p className="text-text-secondary text-sm font-mono">
												{bank.accountNumber}
											</p>
										</div>
										<span className="material-symbols-outlined text-primary">
											chevron_right
										</span>
									</button>
								))}
							</div>
						</div>
					)}

					{/* Step 3: Transfer Instructions */}
					{paymentStep === "transfer-instructions" && selectedBank && (
						<div className="space-y-6">
							{/* Amount Card */}
							<div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
								<p className="text-text-secondary text-sm mb-1">Amount to Transfer</p>
								<p className="text-3xl font-black text-primary">
									IDR {getTotalPrice().toLocaleString("id-ID")}
								</p>
								<p className="text-yellow-500 text-xs mt-2 flex items-center gap-1">
									<span className="material-symbols-outlined text-sm">warning</span>
									Please transfer the exact amount
								</p>
							</div>

							{/* Bank Details */}
							<div className="bg-surface-dark rounded-xl p-6 border border-border-dark">
								<h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
									<span className="material-symbols-outlined text-primary">account_balance</span>
									Transfer to
								</h3>
								
								<div className="space-y-4">
									<div>
										<p className="text-text-secondary text-sm">Bank</p>
										<p className="text-white font-medium">{selectedBank.bankName}</p>
									</div>
									<div>
										<p className="text-text-secondary text-sm">Account Number</p>
										<div className="flex items-center gap-2">
											<p className="text-white font-mono text-xl font-bold">{selectedBank.accountNumber}</p>
											<button 
												onClick={handleCopyAccountNumber}
												className="px-3 py-1 bg-primary/20 text-primary text-sm rounded hover:bg-primary/30 transition flex items-center gap-1">
												<span className="material-symbols-outlined text-sm">
													{copied ? "check" : "content_copy"}
												</span>
												{copied ? "Copied!" : "Copy"}
											</button>
										</div>
									</div>
									<div>
										<p className="text-text-secondary text-sm">Account Name</p>
										<p className="text-white font-medium">{selectedBank.accountName}</p>
									</div>
								</div>
							</div>

							{/* Transfer Instructions */}
							<div className="bg-surface-dark rounded-xl p-6 border border-border-dark">
								<h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
									<span className="material-symbols-outlined text-primary">info</span>
									Transfer Instructions
								</h3>
								
								<ol className="space-y-3 text-text-secondary">
									<li className="flex gap-3">
										<span className="w-6 h-6 rounded-full bg-primary text-background-dark flex items-center justify-center text-sm font-bold shrink-0">1</span>
										<span>Open your mobile banking or visit an ATM</span>
									</li>
									<li className="flex gap-3">
										<span className="w-6 h-6 rounded-full bg-primary text-background-dark flex items-center justify-center text-sm font-bold shrink-0">2</span>
										<span>Select Transfer and enter the account number above</span>
									</li>
									<li className="flex gap-3">
										<span className="w-6 h-6 rounded-full bg-primary text-background-dark flex items-center justify-center text-sm font-bold shrink-0">3</span>
										<span>Enter the exact amount: <strong className="text-primary">IDR {getTotalPrice().toLocaleString("id-ID")}</strong></span>
									</li>
									<li className="flex gap-3">
										<span className="w-6 h-6 rounded-full bg-primary text-background-dark flex items-center justify-center text-sm font-bold shrink-0">4</span>
										<span>Complete the transfer and save the receipt/screenshot</span>
									</li>
									<li className="flex gap-3">
										<span className="w-6 h-6 rounded-full bg-primary text-background-dark flex items-center justify-center text-sm font-bold shrink-0">5</span>
										<span>Click the button below to upload your proof of payment</span>
									</li>
								</ol>
							</div>

							{/* Next Button */}
							<button
								onClick={() => setPaymentStep("upload-proof")}
								className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-green-600 shadow-lg shadow-primary/20 transition-all">
								<span className="material-symbols-outlined">upload</span>
								I've Transferred - Upload Proof
							</button>
						</div>
					)}

					{/* Step 4: Upload Proof */}
					{paymentStep === "upload-proof" && (
						<div className="space-y-6">
							<div className="bg-surface-dark rounded-xl p-6 border border-border-dark">
								<h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
									<span className="material-symbols-outlined text-primary">cloud_upload</span>
									Upload Proof of Payment
								</h3>
								
								<div className="space-y-4">
									{!proofPreview ? (
										<label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border-dark rounded-xl cursor-pointer hover:border-primary transition-colors bg-background-dark">
											<span className="material-symbols-outlined text-4xl text-text-secondary mb-2">
												add_photo_alternate
											</span>
											<p className="text-text-secondary text-sm">
												Click to upload or drag and drop
											</p>
											<p className="text-text-secondary text-xs mt-1">
												PNG, JPG, JPEG (Max 5MB)
											</p>
											<input
												type="file"
												accept="image/*"
												className="hidden"
												onChange={handleFileChange}
											/>
										</label>
									) : (
										<div className="relative">
											<img
												src={proofPreview}
												alt="Proof of payment"
												className="w-full max-h-64 object-contain rounded-lg border border-border-dark"
											/>
											<button
												onClick={() => {
													setProofFile(null);
													setProofPreview("");
												}}
												className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
												<span className="material-symbols-outlined text-sm">close</span>
											</button>
										</div>
									)}

									{proofFile && (
										<div className="flex items-center gap-2 text-sm text-text-secondary">
											<span className="material-symbols-outlined text-primary">check_circle</span>
											{proofFile.name}
										</div>
									)}
								</div>
							</div>

							{/* Warning */}
							<div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex gap-3">
								<span className="material-symbols-outlined text-yellow-500 mt-0.5">
									info
								</span>
								<div>
									<p className="text-sm font-medium text-yellow-500">
										Important
									</p>
									<p className="text-xs text-text-secondary mt-1">
										Make sure the proof clearly shows the transfer details (amount, date, recipient).
										Your booking will be confirmed after our admin verifies the payment.
									</p>
								</div>
							</div>

							{/* Submit Button */}
							<button
								onClick={handleUploadProof}
								disabled={!proofFile || uploading}
								className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-green-600 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
								{uploading ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
										Uploading...
									</>
								) : (
									<>
										<span className="material-symbols-outlined">check</span>
										Submit Payment Proof
									</>
								)}
							</button>
						</div>
					)}

					{/* Back Button */}
					<div className="flex items-center pt-4">
						<button
							className="flex items-center gap-2 px-8 py-3 rounded-xl border border-border-dark text-white font-medium hover:bg-border-dark transition-colors"
							onClick={handleBack}
							type="button">
							<span className="material-symbols-outlined text-sm">
								arrow_back
							</span>
							Kembali / Back
						</button>
					</div>
				</div>

				{/* Right Column: Summary */}
				<div className="lg:col-span-4">
					<div className="sticky top-24 bg-surface-dark rounded-xl p-6 border border-border-dark">
						<h3 className="text-lg font-bold mb-4 text-white">Order Summary</h3>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between">
								<span className="text-text-secondary">Booking ID</span>
								<span className="text-white font-mono text-xs">
									{booking.bookingId}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-text-secondary">Trip</span>
								<span className="text-white font-medium">
									{booking.tripName}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-text-secondary">Date</span>
								<span className="text-white font-medium">
									{booking.selectedSlot?.date}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-text-secondary">Participants</span>
								<span className="text-white font-medium">
									{booking.participantCount} Pax
								</span>
							</div>
							{selectedBank && (
								<div className="flex justify-between">
									<span className="text-text-secondary">Payment</span>
									<span className="text-white font-medium">
										{selectedBank.name}
									</span>
								</div>
							)}
							<div className="h-px bg-border-dark" />
							<div className="flex justify-between text-lg">
								<span className="text-white font-bold">Total</span>
								<span className="text-primary font-black">
									IDR {getTotalPrice().toLocaleString("id-ID")}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
