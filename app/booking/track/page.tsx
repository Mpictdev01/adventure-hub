"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TrackBookingPage() {
	const [bookingId, setBookingId] = useState("");
	const [searchResult, setSearchResult] = useState<any>(null);

	const handleTrack = () => {
		// Mock tracking - in real app would fetch from database
		if (bookingId) {
			setSearchResult({
				bookingId,
				status: "Confirmed",
				tripName: "Mount Bromo Sunrise Tour",
				date: "Mon, 05 Aug 2024",
				participants: 2,
				bookerName: "Example User",
				bookerEmail: "example@email.com",
				bookerPhone: "+62 812-3456-7890",
				totalPaid: "IDR 1.500.000",
			});
		}
	};

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-background-dark flex-grow w-full max-w-[800px] mx-auto px-4 py-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-white mb-4">Track Booking</h1>
					<p className="text-text-secondary">
						Enter your Booking ID or email to track your trip status
					</p>
				</div>

				{/* Search Form */}
				<div className="bg-surface-dark rounded-xl p-8 border border-border-dark mb-8">
					<label className="flex flex-col gap-2 mb-6">
						<span className="text-white font-medium">
							Booking ID atau Email / Booking ID or Email
						</span>
						<input
							className="w-full rounded-lg border-none bg-input-bg p-4 text-white placeholder-text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
							onChange={(e) => setBookingId(e.target.value)}
							placeholder="Enter Booking ID (e.g., ADVHUB1234567890)"
							type="text"
							value={bookingId}
						/>
					</label>
					<button
						className="w-full bg-primary hover:bg-green-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg"
						onClick={handleTrack}>
						Track Booking
					</button>
				</div>

				{/* Search Result */}
				{searchResult && (
					<div className="bg-surface-dark rounded-xl p-8 border border-border-dark">
						{/* Status Badge */}
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-2xl font-bold text-white">Booking Details</h2>
							<span className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-bold">
								✓ {searchResult.status}
							</span>
						</div>

						{/* Booking Info */}
						<div className="space-y-4 mb-6">
							<div className="flex justify-between border-b border-border-dark pb-3">
								<span className="text-text-secondary">Booking ID</span>
								<span className="text-white font-mono font-bold">
									{searchResult.bookingId}
								</span>
							</div>
							<div className="flex justify-between border-b border-border-dark pb-3">
								<span className="text-text-secondary">Trip Name</span>
								<span className="text-white font-medium">
									{searchResult.tripName}
								</span>
							</div>
							<div className="flex justify-between border-b border-border-dark pb-3">
								<span className="text-text-secondary">Date</span>
								<span className="text-white font-medium">
									{searchResult.date}
								</span>
							</div>
							<div className="flex justify-between border-b border-border-dark pb-3">
								<span className="text-text-secondary">Participants</span>
								<span className="text-white font-medium">
									{searchResult.participants} Person(s)
								</span>
							</div>
							<div className="flex justify-between border-b border-border-dark pb-3">
								<span className="text-text-secondary">Booker Name</span>
								<span className="text-white font-medium">
									{searchResult.bookerName}
								</span>
							</div>
							<div className="flex justify-between border-b border-border-dark pb-3">
								<span className="text-text-secondary">Email</span>
								<span className="text-white font-medium">
									{searchResult.bookerEmail}
								</span>
							</div>
							<div className="flex justify-between border-b border-border-dark pb-3">
								<span className="text-text-secondary">Phone</span>
								<span className="text-white font-medium">
									{searchResult.bookerPhone}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-text-secondary">Total Paid</span>
								<span className="text-primary font-bold text-lg">
									{searchResult.totalPaid}
								</span>
							</div>
						</div>

						{/* Actions */}
						<div className="flex flex-col sm:flex-row gap-3">
							<button className="flex-1 px-6 py-3 rounded-xl border border-border-dark text-white font-medium hover:bg-border-dark transition-colors flex items-center justify-center gap-2">
								<span className="material-symbols-outlined text-sm">
									download
								</span>
								Download Ticket
							</button>
							<button className="flex-1 px-6 py-3 rounded-xl border border-red-500/50 text-red-400 font-medium hover:bg-red-500/10 transition-colors">
								Request Cancellation
							</button>
						</div>
					</div>
				)}
			</main>
			<Footer />
		</>
	);
}
