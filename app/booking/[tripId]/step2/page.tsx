"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBooking, ParticipantData } from "../../components/BookingContext";
import BookingStepper from "../../components/BookingStepper";
import BookingSummary from "../../components/BookingSummary";

export default function Step2Page() {
	const params = useParams();
	const router = useRouter();
	const { booking, updateBooking } = useBooking();
	const tripId = params.tripId as string;

	// Initialize forms from booking context or empty
	const [mainBooker, setMainBooker] = useState<ParticipantData>(
		booking.mainBooker || {
			fullName: "",
			idNumber: "",
			phone: "",
			email: "",
			emergencyContactName: "",
			emergencyContactPhone: "",
		}
	);

	const [participants, setParticipants] = useState<ParticipantData[]>(() => {
		// Initialize array based on participant count
		const count = booking.participantCount || 1;
		const existing = booking.participants || [];
		const result = [];
		for (let i = 0; i < count; i++) {
			result.push(
				existing[i] || {
					fullName: "",
					idNumber: "",
					phone: "",
				}
			);
		}
		return result;
	});

	const [sameAsMainBooker, setSameAsMainBooker] = useState<boolean[]>(
		new Array(booking.participantCount || 1).fill(false)
	);

	const handleMainBookerChange = (field: keyof ParticipantData, value: string) => {
		setMainBooker((prev) => ({ ...prev, [field]: value }));
	};

	const handleParticipantChange = (
		index: number,
		field: keyof ParticipantData,
		value: string
	) => {
		setParticipants((prev) => {
			const updated = [...prev];
			updated[index] = { ...updated[index], [field]: value };
			return updated;
		});
	};

	const handleSameAsMainBooker = (index: number, checked: boolean) => {
		setSameAsMainBooker((prev) => {
			const updated = [...prev];
			updated[index] = checked;
			return updated;
		});

		if (checked) {
			// Copy main booker data to participant
			setParticipants((prev) => {
				const updated = [...prev];
				updated[index] = {
					fullName: mainBooker.fullName,
					idNumber: mainBooker.idNumber,
					phone: mainBooker.phone,
				};
				return updated;
			});
		}
	};

	const handleBack = () => {
		router.push(`/booking/${tripId}/step1`);
	};

	const handleContinue = () => {
		// Basic validation
		if (!mainBooker.fullName || !mainBooker.email || !mainBooker.phone) {
			alert("Please fill in all main booker fields");
			return;
		}

		for (let i = 0; i < participants.length; i++) {
			if (!participants[i].fullName || !participants[i].idNumber || !participants[i].phone) {
				alert(`Please fill in all fields for Participant ${i + 1}`);
				return;
			}
		}

		// Save to context
		updateBooking({
			mainBooker,
			participants,
		});

		router.push(`/booking/${tripId}/step3`);
	};

	return (
		<main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<BookingStepper currentStep={2} />

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* Left Column: Forms */}
				<div className="lg:col-span-8 flex flex-col gap-8">
					{/* Header */}
					<div className="flex flex-col gap-4">
						{/* Progress */}
						<div className="flex items-center justify-between">
							<p className="text-primary text-sm font-bold tracking-wider uppercase">
								Step 2 of 4
							</p>
							<span className="text-text-secondary text-sm hidden sm:block">
								Detailed Information
							</span>
						</div>
						{/* Progress Bar */}
						<div className="rounded-full bg-border-dark h-2 w-full overflow-hidden">
							<div
								className="h-full rounded-full bg-primary"
								style={{ width: "50%" }}
							/>
						</div>
						{/* Title */}
						<div className="mt-2">
							<h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
								Data Pemesanan
							</h1>
							<p className="text-text-secondary text-base font-normal leading-normal mt-2">
								Mohon isi detail untuk pemesan utama dan semua peserta. <br />
								<span className="italic text-sm opacity-80">
									Please fill in the details for the main booker and all
									participants.
								</span>
							</p>
						</div>
					</div>

					{/* Main Booker Form */}
					<section className="flex flex-col gap-6 rounded-2xl bg-surface-dark p-6 md:p-8 border border-border-dark">
						<div className="flex items-center gap-3 border-b border-border-dark pb-4">
							<span className="material-symbols-outlined text-primary">
								badge
							</span>
							<h2 className="text-white text-xl font-bold leading-tight">
								Pemesan Utama{" "}
								<span className="text-base font-normal text-text-secondary">
									(Main Booker)
								</span>
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Full Name */}
							<label className="flex flex-col gap-2">
								<span className="text-white text-sm font-medium">
									Nama Lengkap (Full Name)
								</span>
								<input
									className="w-full rounded-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
									placeholder="Sesuai KTP / As per ID Card"
									type="text"
									value={mainBooker.fullName}
									onChange={(e) =>
										handleMainBookerChange("fullName", e.target.value)
									}
								/>
							</label>
							{/* NIK */}
							<label className="flex flex-col gap-2">
								<span className="text-white text-sm font-medium">
									Nomor Identitas (NIK/ID Number)
								</span>
								<input
									className="w-full rounded-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
									placeholder="16 digit NIK"
									type="text"
									value={mainBooker.idNumber}
									onChange={(e) =>
										handleMainBookerChange("idNumber", e.target.value)
									}
								/>
							</label>
							{/* Email */}
							<label className="flex flex-col gap-2">
								<span className="text-white text-sm font-medium">
									Alamat Email (Email Address)
								</span>
								<input
									className="w-full rounded-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
									placeholder="example@email.com"
									type="email"
									value={mainBooker.email}
									onChange={(e) =>
										handleMainBookerChange("email", e.target.value)
									}
								/>
							</label>
							{/* WhatsApp */}
							<label className="flex flex-col gap-2">
								<span className="text-white text-sm font-medium">
									Nomor WhatsApp (WhatsApp Number)
								</span>
								<div className="flex">
									<div className="flex items-center justify-center bg-input-bg border-r border-border-dark rounded-l-lg px-3 text-text-secondary">
										+62
									</div>
									<input
										className="w-full rounded-r-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
										placeholder="812-3456-7890"
										type="tel"
										value={mainBooker.phone}
										onChange={(e) =>
											handleMainBookerChange("phone", e.target.value)
										}
									/>
								</div>
							</label>
							{/* Emergency Contact Name */}
							<label className="flex flex-col gap-2">
								<span className="text-white text-sm font-medium">
									Kontak Darurat (Emergency Contact Name)
								</span>
								<input
									className="w-full rounded-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
									placeholder="Nama Kerabat / Relative Name"
									type="text"
									value={mainBooker.emergencyContactName}
									onChange={(e) =>
										handleMainBookerChange(
											"emergencyContactName",
											e.target.value
										)
									}
								/>
							</label>
							{/* Emergency Contact Number */}
							<label className="flex flex-col gap-2">
								<span className="text-white text-sm font-medium">
									No. Kontak Darurat (Emergency Number)
								</span>
								<div className="flex">
									<div className="flex items-center justify-center bg-input-bg border-r border-border-dark rounded-l-lg px-3 text-text-secondary">
										+62
									</div>
									<input
										className="w-full rounded-r-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
										placeholder="812-xxxx-xxxx"
										type="tel"
										value={mainBooker.emergencyContactPhone}
										onChange={(e) =>
											handleMainBookerChange(
												"emergencyContactPhone",
												e.target.value
											)
										}
									/>
								</div>
							</label>
						</div>
					</section>

					{/* Participant Forms */}
					{participants.map((participant, index) => (
						<section
							key={index}
							className="flex flex-col gap-6 rounded-2xl bg-surface-dark p-6 md:p-8 border border-border-dark">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-dark pb-4">
								<div className="flex items-center gap-3">
									<span className="material-symbols-outlined text-primary">
										groups
									</span>
									<h2 className="text-white text-xl font-bold leading-tight">
										Peserta {index + 1}{" "}
										<span className="text-base font-normal text-text-secondary">
											(Participant {index + 1})
										</span>
									</h2>
								</div>
								<label className="flex items-center gap-3 cursor-pointer group">
									<input
										checked={sameAsMainBooker[index]}
										className="h-5 w-5 rounded border-gray-600 bg-border-dark text-primary focus:ring-0 focus:ring-offset-0 transition duration-150 ease-in-out"
										onChange={(e) =>
											handleSameAsMainBooker(index, e.target.checked)
										}
										type="checkbox"
									/>
									<span className="text-sm text-text-secondary group-hover:text-white transition-colors">
										Sama dengan Pemesan Utama
									</span>
								</label>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Full Name */}
								<label className="flex flex-col gap-2 md:col-span-2">
									<span className="text-white text-sm font-medium">
										Nama Lengkap (Full Name)
									</span>
									<input
										className="w-full rounded-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
										disabled={sameAsMainBooker[index]}
										placeholder="Sesuai KTP / As per ID Card"
										type="text"
										value={participant.fullName}
										onChange={(e) =>
											handleParticipantChange(index, "fullName", e.target.value)
										}
									/>
								</label>
								{/* NIK */}
								<label className="flex flex-col gap-2">
									<span className="text-white text-sm font-medium">
										Nomor Identitas (NIK/ID Number)
									</span>
									<input
										className="w-full rounded-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
										disabled={sameAsMainBooker[index]}
										placeholder="16 digit NIK"
										type="text"
										value={participant.idNumber}
										onChange={(e) =>
											handleParticipantChange(index, "idNumber", e.target.value)
										}
									/>
								</label>
								{/* Phone Number */}
								<label className="flex flex-col gap-2">
									<span className="text-white text-sm font-medium">
										Nomor Telepon (Phone Number)
									</span>
									<div className="flex">
										<div className="flex items-center justify-center bg-input-bg border-r border-border-dark rounded-l-lg px-3 text-text-secondary">
											+62
										</div>
										<input
											className="w-full rounded-r-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-50"
											disabled={sameAsMainBooker[index]}
											placeholder="812-3456-7890"
											type="tel"
											value={participant.phone}
											onChange={(e) =>
												handleParticipantChange(index, "phone", e.target.value)
											}
										/>
									</div>
								</label>
							</div>
						</section>
					))}

					{/* Action Buttons */}
					<div className="flex items-center justify-between pt-4 pb-12">
						<button
							className="flex items-center gap-2 px-8 py-3 rounded-xl border border-border-dark text-white font-medium hover:bg-border-dark transition-colors"
							onClick={handleBack}
							type="button">
							<span className="material-symbols-outlined text-sm">
								arrow_back
							</span>
							Kembali
						</button>
						<button
							className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-green-600 shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px]"
							onClick={handleContinue}
							type="button">
							Lanjut
							<span className="material-symbols-outlined text-sm">
								arrow_forward
							</span>
						</button>
					</div>
				</div>

				{/* Right Column: Trip Summary Sidebar */}
				<BookingSummary step={2} />
			</div>
		</main>
	);
}
