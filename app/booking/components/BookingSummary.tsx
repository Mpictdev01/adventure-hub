"use client";

import { useBooking } from "./BookingContext";
import Link from "next/link";

interface BookingSummaryProps {
	showContinueButton?: boolean;
	continueHref?: string;
	continueLabel?: string;
	showBackButton?: boolean;
	backHref?: string;
	onContinue?: () => void;
	onBack?: () => void;
	step?: number;
}

export default function BookingSummary({
	showContinueButton = false,
	continueHref,
	continueLabel = "Lanjut / Continue",
	showBackButton = false,
	backHref,
	onContinue,
	onBack,
	step = 1,
}: BookingSummaryProps) {
	const { booking, getTotalPrice } = useBooking();

	const serviceFee = 0; // Free for now
	const totalPrice = getTotalPrice();

	return (
		<div className="lg:col-span-4">
			<div className="sticky top-24 space-y-4">
				<div className="bg-surface-dark border border-border-dark rounded-xl p-6 shadow-xl">
					{/* Trip Image & Info */}
					<div className="flex items-center gap-4 mb-6">
						<div
							className="w-20 h-20 rounded-lg bg-cover bg-center shrink-0"
							style={{
								backgroundImage: booking.tripImage
									? `url(${booking.tripImage})`
									: "url('https://via.placeholder.com/80')",
							}}
						/>
						<div>
							<h4 className="text-white font-bold leading-tight line-clamp-2">
								{booking.tripName || "Select a trip"}
							</h4>
							{booking.selectedSlot && (
								<div className="flex items-center gap-1 mt-1 text-xs text-text-secondary">
									<span className="material-symbols-outlined text-[14px]">
										calendar_today
									</span>
									<span>{booking.selectedSlot.displayDate}</span>
								</div>
							)}
						</div>
					</div>

					{/* Price Breakdown */}
					<div className="space-y-3 mb-6">
						<div className="flex justify-between text-sm">
							<span className="text-text-secondary">Price per pax</span>
							<span className="text-white">
								IDR {booking.pricePerPax.toLocaleString("id-ID")}
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-text-secondary">Quantity</span>
							<span className="text-white">{booking.participantCount} Pax</span>
						</div>
						<div className="h-px bg-border-dark my-2" />
						<div className="flex justify-between text-base font-medium">
							<span className="text-white">Subtotal</span>
							<span className="text-white">
								IDR {totalPrice.toLocaleString("id-ID")}
							</span>
						</div>
						<div className="flex justify-between text-sm text-primary">
							<span>Service Fee</span>
							<span>Included</span>
						</div>
					</div>

					{/* Total */}
					<div className="flex justify-between items-end mb-6">
						<span className="text-text-secondary text-sm font-medium">
							Total Payment
						</span>
						<span className="text-2xl font-bold text-primary">
							IDR {totalPrice.toLocaleString("id-ID")}
						</span>
					</div>

					{/* Continue Button */}
					{showContinueButton && (
						<>
							{continueHref ? (
								<Link
									href={continueHref}
									className="w-full bg-primary hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(25,179,102,0.39)] hover:shadow-[0_6px_20px_rgba(25,179,102,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
									<span>{continueLabel}</span>
									<span className="material-symbols-outlined text-sm font-bold">
										arrow_forward
									</span>
								</Link>
							) : (
								<button
									onClick={onContinue}
									className="w-full bg-primary hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(25,179,102,0.39)] hover:shadow-[0_6px_20px_rgba(25,179,102,0.23)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
									<span>{continueLabel}</span>
									<span className="material-symbols-outlined text-sm font-bold">
										arrow_forward
									</span>
								</button>
							)}
							<p className="text-xs text-center text-text-secondary mt-4">
								Step {step} of 4 • You won't be charged yet
							</p>
						</>
					)}

					{/* Back Button */}
					{showBackButton && (
						<>
							{backHref ? (
								<Link
									href={backHref}
									className="w-full mt-3 bg-transparent hover:bg-border-dark text-white font-medium py-3 px-4 rounded-xl transition-colors border border-border-dark flex items-center justify-center gap-2">
									<span className="material-symbols-outlined text-sm">
										arrow_back
									</span>
									<span>Kembali / Back</span>
								</Link>
							) : (
								<button
									onClick={onBack}
									className="w-full mt-3 bg-transparent hover:bg-border-dark text-white font-medium py-3 px-4 rounded-xl transition-colors border border-border-dark flex items-center justify-center gap-2">
									<span className="material-symbols-outlined text-sm">
										arrow_back
									</span>
									<span>Kembali / Back</span>
								</button>
							)}
						</>
					)}
				</div>

				{/* Trust Signals */}
				<div className="bg-primary/5 rounded-lg p-4 border border-primary/10 flex items-start gap-3">
					<span className="material-symbols-outlined text-primary mt-0.5">
						verified_user
					</span>
					<div>
						<p className="text-white text-sm font-medium">Free Cancellation</p>
						<p className="text-text-secondary text-xs mt-1">
							Cancel up to 24 hours before the trip starts for a full refund.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
