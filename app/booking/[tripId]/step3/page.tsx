"use client";

import { useParams, useRouter } from "next/navigation";
import { useBooking } from "../../components/BookingContext";
import BookingStepper from "../../components/BookingStepper";
import BookingSummary from "../../components/BookingSummary";

export default function Step3Page() {
	const params = useParams();
	const router = useRouter();
	const { booking, getTotalPrice } = useBooking();
	const tripId = params.tripId as string;

	const handleBack = () => {
		router.push(`/booking/${tripId}/step2`);
	};

	const handleContinue = () => {
		router.push(`/booking/${tripId}/step4`);
	};

	const serviceFee = 50000;
	const discount = 100000;
	const subtotal = getTotalPrice();
	const total = subtotal + serviceFee - discount;

	return (
		<main className="flex-grow w-full max-w-[1280px] mx-auto px-4 lg:px-10 py-8 lg:py-12">
			{/* Progress Bar */}
			<div className="mb-10 max-w-[960px] mx-auto">
				<div className="flex justify-between items-end mb-3">
					<p className="text-base font-semibold text-white">Step 3 of 4</p>
					<p className="text-text-secondary text-sm">Review / Tinjauan</p>
				</div>
				<div className="h-2 w-full rounded-full bg-border-dark overflow-hidden">
					<div
						className="h-full bg-primary transition-all duration-500 ease-out"
						style={{ width: "75%" }}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-[1100px] mx-auto">
				{/* Left Column: Details */}
				<div className="lg:col-span-8 flex flex-col gap-8">
					{/* Header */}
					<div>
						<h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2 text-white">
							Review Your Booking
						</h1>
						<p className="text-text-secondary">
							Please review your order details before proceeding to payment.
						</p>
					</div>

					{/* Trip Card */}
					<div className="bg-surface-dark rounded-xl p-5 shadow-sm border border-border-dark">
						<div className="flex flex-col-reverse sm:flex-row gap-5">
							<div className="flex-1 flex flex-col justify-between gap-4">
								<div>
									<div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold mb-2">
										<span className="material-symbols-outlined text-[16px]">
											verified
										</span>
										Open Trip
									</div>
									<h3 className="text-xl font-bold leading-tight mb-2 text-white">
										{booking.tripName}
									</h3>
									<div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
										<span className="material-symbols-outlined text-[18px]">
											calendar_month
										</span>
										{booking.selectedSlot?.displayDate || "Date not selected"}
									</div>
									<div className="flex items-center gap-2 text-text-secondary text-sm">
										<span className="material-symbols-outlined text-[18px]">
											group
										</span>
										{booking.participantCount} Adults
									</div>
								</div>
								<button
									className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors w-fit group"
									onClick={() => router.push(`/booking/${tripId}/step1`)}>
									<span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">
										edit
									</span>
									Change Trip Details
								</button>
							</div>
							<div
								className="w-full sm:w-48 aspect-video sm:aspect-square rounded-lg bg-cover bg-center relative overflow-hidden"
								style={{
									backgroundImage: `url(${booking.tripImage})`,
								}}
							/>
						</div>
					</div>

					{/* Participants Section */}
					<div>
						<div className="flex items-center justify-between border-b border-border-dark pb-4 mb-5">
							<h3 className="text-lg font-bold text-white">
								Participant Details
							</h3>
							<button
								className="text-sm text-primary font-medium hover:underline"
								onClick={() => router.push(`/booking/${tripId}/step2`)}>
								Edit Details
							</button>
						</div>
						<div className="flex flex-col gap-4">
							{/* Main Booker */}
							{booking.mainBooker && (
								<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-dark p-4 rounded-lg border border-border-dark">
									<div className="flex items-center gap-4">
										<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
											1
										</div>
										<div>
											<p className="font-semibold text-white">
												{booking.mainBooker.fullName}
											</p>
											<p className="text-text-secondary text-sm">Lead Guest</p>
										</div>
									</div>
									<div className="flex items-center gap-2 text-text-secondary text-sm bg-black/20 px-3 py-2 rounded">
										<span className="material-symbols-outlined text-[18px]">
											call
										</span>
										+62 {booking.mainBooker.phone}
									</div>
								</div>
							)}

							{/* Other Participants */}
							{booking.participants.map((participant, index) => (
								<div
									key={index}
									className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-dark p-4 rounded-lg border border-border-dark">
									<div className="flex items-center gap-4">
										<div className="size-10 rounded-full bg-border-dark text-text-secondary flex items-center justify-center font-bold">
											{index + 2}
										</div>
										<div>
											<p className="font-semibold text-white">
												{participant.fullName}
											</p>
											<p className="text-text-secondary text-sm">Adult</p>
										</div>
									</div>
									<div className="flex items-center gap-2 text-text-secondary text-sm bg-black/20 px-3 py-2 rounded">
										<span className="material-symbols-outlined text-[18px]">
											call
										</span>
										+62 {participant.phone}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Important Note */}
					<div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
						<span className="material-symbols-outlined text-primary mt-0.5">
							info
						</span>
						<div>
							<p className="text-sm font-medium text-white">Important Note</p>
							<p className="text-xs text-text-secondary mt-1">
								Please ensure all participant names match their ID cards. Changes
								after booking may incur additional fees.
							</p>
						</div>
					</div>

					{/* Navigation Buttons */}
					<div className="flex items-center justify-between pt-4">
						<button
							className="flex items-center gap-2 px-8 py-3 rounded-xl border border-border-dark text-white font-medium hover:bg-border-dark transition-colors"
							onClick={handleBack}
							type="button">
							<span className="material-symbols-outlined text-sm">
								arrow_back
							</span>
							Kembali / Back
						</button>
						<button
							className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-green-600 shadow-lg shadow-primary/20 transition-all"
							onClick={handleContinue}
							type="button">
							<span className="material-symbols-outlined text-sm">lock</span>
							Bayar / Pay Now
						</button>
					</div>
				</div>

				{/* Right Column: Price Summary */}
				<div className="lg:col-span-4">
					<div className="sticky top-24 flex flex-col gap-6">
						<div className="bg-surface-dark rounded-xl p-6 shadow-lg border border-border-dark">
							<h3 className="text-lg font-bold mb-6 text-white">
								Price Details
							</h3>
							<div className="flex flex-col gap-3 text-sm mb-6">
								<div className="flex justify-between items-center">
									<span className="text-text-secondary">
										Open Trip (x{booking.participantCount} Pax)
									</span>
									<span className="font-medium text-white">
										IDR {subtotal.toLocaleString("id-ID")}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-text-secondary">Service Fee</span>
									<span className="font-medium text-white">
										IDR {serviceFee.toLocaleString("id-ID")}
									</span>
								</div>
								<div className="flex justify-between items-center text-primary">
									<span>Discount (Early Bird)</span>
									<span>- IDR {discount.toLocaleString("id-ID")}</span>
								</div>
							</div>
							<div className="h-px bg-border-dark w-full mb-4" />
							<div className="flex justify-between items-end mb-8">
								<span className="text-base font-semibold text-text-secondary">
									Total Amount
								</span>
								<span className="text-2xl font-black text-primary">
									IDR {total.toLocaleString("id-ID")}
								</span>
							</div>
						</div>

						{/* WhatsApp Notification */}
						<div className="flex items-start gap-3 px-4">
							<div className="size-8 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0 mt-1">
								<span className="material-symbols-outlined text-[#25D366] text-sm">
									chat
								</span>
							</div>
							<p className="text-xs text-text-secondary leading-relaxed">
								Booking confirmation and ticket details will be sent
								automatically to your <strong>WhatsApp</strong> number after
								payment is completed.
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
