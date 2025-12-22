"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useBooking } from "../../components/BookingContext";
import Link from "next/link";

export default function ThankYouPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { booking, resetBooking } = useBooking();
	const bookingId = searchParams.get("bookingId") || booking.bookingId;

	return (
		<main className="flex-grow w-full max-w-[800px] mx-auto px-4 py-16 text-center">
			{/* Success Icon */}
			<div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
				<span className="material-symbols-outlined text-primary text-5xl">
					check_circle
				</span>
			</div>

			{/* Thank You Message */}
			<h1 className="text-4xl font-bold text-white mb-4">
				Booking Confirmed!
			</h1>
			<p className="text-text-secondary text-lg mb-8">
				Terima kasih! Pemesanan Anda telah dikonfirmasi.
				<br />
				Thank you! Your booking has been confirmed.
			</p>

			{/* Booking ID */}
			<div className="bg-surface-dark rounded-xl p-6 border border-border-dark mb-8">
				<p className="text-text-secondary text-sm mb-2">Booking ID</p>
				<p className="text-primary text-2xl font-bold font-mono">{bookingId}</p>
				<p className="text-text-secondary text-xs mt-3">
					Konfirmasi booking telah dikirim ke email dan WhatsApp Anda
					<br />
					Booking confirmation has been sent to your email and WhatsApp
				</p>
			</div>

			{/* Trip Summary Card */}
			<div className="bg-surface-dark rounded-xl p-6 border border-border-dark mb-8 text-left">
				<h3 className="text-lg font-bold text-white mb-4">Trip Summary</h3>
				<div className="space-y-3 text-sm">
					<div className="flex justify-between">
						<span className="text-text-secondary">Trip Name</span>
						<span className="text-white font-medium">{booking.tripName}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-text-secondary">Date</span>
						<span className="text-white font-medium">
							{booking.selectedSlot?.displayDate}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-text-secondary">Participants</span>
						<span className="text-white font-medium">
							{booking.participantCount} Person(s)
						</span>
					</div>
					<div className="flex justify-between">
						<span className="text-text-secondary">Main Booker</span>
						<span className="text-white font-medium">
							{booking.mainBooker?.fullName}
						</span>
					</div>
				</div>
			</div>

			{/* What's Next */}
			<div className="bg-primary/5 rounded-xl p-6 border border-primary/20 mb-8 text-left">
				<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
					<span className="material-symbols-outlined text-primary">
						checklist
					</span>
					What's Next?
				</h3>
				<ul className="space-y-3">
					<li className="flex items-start gap-3">
						<span className="material-symbols-outlined text-primary mt-0.5 text-sm">
							check
						</span>
						<span className="text-text-secondary text-sm">
							Cek email dan WhatsApp untuk detail trip / Check your email and
							WhatsApp for trip details
						</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="material-symbols-outlined text-primary mt-0.5 text-sm">
							check
						</span>
						<span className="text-text-secondary text-sm">
							Bergabung dengan grup WhatsApp trip / Join the trip WhatsApp group
						</span>
					</li>
					<li className="flex items-start gap-3">
						<span className="material-symbols-outlined text-primary mt-0.5 text-sm">
							check
						</span>
						<span className="text-text-secondary text-sm">
							Siapkan perlengkapan sesuai packing list / Prepare your gear
							according to the packing list
						</span>
					</li>
				</ul>
			</div>

			{/* Action Buttons */}
			<div className="flex flex-col sm:flex-row gap-4 justify-center">
				<Link
					className="px-8 py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary/10 transition-colors"
					href={`/booking/track?bookingId=${bookingId}`}>
					Track My Booking
				</Link>
				<Link
					className="px-8 py-3 rounded-xl bg-primary text-white font-bold hover:bg-green-600 transition-colors"
					href="/"
					onClick={() => resetBooking()}>
					Browse More Trips
				</Link>
			</div>
		</main>
	);
}
