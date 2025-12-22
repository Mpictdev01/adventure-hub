"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBooking, SlotInfo } from "../../components/BookingContext";
import BookingStepper from "../../components/BookingStepper";
import BookingSummary from "../../components/BookingSummary";
import SlotSelection from "../../components/SlotSelection";
import ParticipantCounter from "../../components/ParticipantCounter";

// Extended trip data for booking with slots
interface BookingTripData {
	id: string;
	name: string;
	location: string;
	badge: string;
	imageUrl: string;
	basePrice: number;
	slots: SlotInfo[];
}

export default function Step1Page() {
	const params = useParams();
	const router = useRouter();
	const { booking, updateBooking } = useBooking();
	const tripId = params.tripId as string;

	const [tripData, setTripData] = useState<BookingTripData | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(
		booking.selectedSlot
	);
	const [participantCount, setParticipantCount] = useState(
		booking.participantCount || 1
	);
	
	// State for Private Trip date picker
	const [selectedDate, setSelectedDate] = useState<string>("");

	// Check if trip is private
	const isPrivateTrip = tripData?.badge === "Private Trip";

	// Fetch trip data from API
	useEffect(() => {
		async function fetchTrip() {
			try {
				const response = await fetch(`/api/trips/${tripId}`);
				if (response.ok) {
					const trip = await response.json();
					const basePrice = parsePrice(trip.price);
					// Transform API response to booking trip format
					const bookingTrip: BookingTripData = {
						id: trip.id,
						name: trip.title,
						location: trip.location,
						badge: trip.badge || 'Open Trip',
						imageUrl: trip.imageUrl,
						basePrice: basePrice,
						// Generate sample slots for Open Trip
						slots: [
							{
								id: "slot-1",
								date: trip.date || "Jan 15-17, 2025",
								price: basePrice,
								availableSpots: 8,
							},
							{
								id: "slot-2",
								date: "Jan 22-24, 2025",
								price: basePrice,
								availableSpots: 5,
							},
							{
								id: "slot-3",
								date: "Feb 5-7, 2025",
								price: basePrice,
								availableSpots: 10,
							},
						],
					};
					setTripData(bookingTrip);
				}
			} catch (error) {
				console.error("Error fetching trip:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchTrip();
	}, [tripId]);

	// Helper to parse price string to number
	function parsePrice(priceStr: string): number {
		// Extract numbers from string like "IDR 1.2M" or "IDR 2,500,000"
		const numStr = priceStr.replace(/[^0-9.]/g, '');
		const num = parseFloat(numStr);
		if (priceStr.toLowerCase().includes('m')) {
			return num * 1000000;
		}
		if (priceStr.toLowerCase().includes('k')) {
			return num * 1000;
		}
		return num || 1500000; // Default price
	}

	// Load trip data into booking context
	useEffect(() => {
		if (tripData) {
			updateBooking({
				tripId: tripData.id,
				tripName: tripData.name,
				tripImage: tripData.imageUrl,
				tripLocation: tripData.location,
			});
		}
	}, [tripData]);

	// Update booking when slot or participant count changes (Open Trip)
	useEffect(() => {
		if (selectedSlot && !isPrivateTrip) {
			updateBooking({
				selectedSlot,
				pricePerPax: selectedSlot.price,
				participantCount,
			});
		}
	}, [selectedSlot, participantCount, isPrivateTrip]);

	// Update booking when date changes (Private Trip)
	useEffect(() => {
		if (selectedDate && isPrivateTrip && tripData) {
			// Create a custom slot for private trip
			const privateSlot: SlotInfo = {
				id: "private-slot",
				date: formatDateForDisplay(selectedDate),
				price: tripData.basePrice,
				availableSpots: 99, // Private trip = custom group
			};
			setSelectedSlot(privateSlot);
			updateBooking({
				selectedSlot: privateSlot,
				pricePerPax: tripData.basePrice,
				participantCount,
			});
		}
	}, [selectedDate, participantCount, isPrivateTrip, tripData]);

	// Format date from input to display format
	function formatDateForDisplay(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { 
			month: 'short', 
			day: 'numeric', 
			year: 'numeric' 
		});
	}

	// Get minimum date (today)
	function getMinDate(): string {
		const today = new Date();
		today.setDate(today.getDate() + 3); // Minimum 3 days from now
		return today.toISOString().split('T')[0];
	}

	const handleContinue = () => {
		if (isPrivateTrip) {
			if (!selectedDate) {
				alert("Please select your preferred departure date");
				return;
			}
		} else {
			if (!selectedSlot) {
				alert("Please select a trip slot");
				return;
			}
		}
		router.push(`/booking/${tripId}/step2`);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p className="text-text-secondary">Loading trip details...</p>
			</div>
		);
	}

	if (!tripData) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4">
				<p className="text-white text-xl">Trip not found</p>
				<p className="text-text-secondary">
					The trip you're looking for doesn't exist.
				</p>
				<button
					onClick={() => router.push("/")}
					className="mt-4 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-green-600 transition-colors">
					Browse All Trips
				</button>
			</div>
		);
	}

	return (
		<main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Breadcrumbs / Stepper */}
			<BookingStepper currentStep={1} />

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
				{/* Left Column: Selection Area */}
				<div className="lg:col-span-8 flex flex-col gap-10">
					{/* Trip Header */}
					<div className="space-y-2">
						<div className="flex items-start justify-between">
							<div>
								<span className={`inline-block px-3 py-1 mb-3 text-xs font-medium tracking-wider rounded-full border ${
									isPrivateTrip 
										? 'text-violet-400 bg-violet-500/10 border-violet-500/20' 
										: 'text-primary bg-primary/10 border-primary/20'
								}`}>
									{tripData.badge.toUpperCase()}
								</span>
								<h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
									{tripData.name}
								</h1>
								<div className="flex items-center gap-2 mt-2 text-text-secondary">
									<span className="material-symbols-outlined text-sm">
										location_on
									</span>
									<span className="text-sm">{tripData.location}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Date Selection Section */}
					<div className="bg-surface-dark rounded-xl border border-border-dark p-6">
						<div className="flex items-center gap-3 mb-4">
							<span className="material-symbols-outlined text-primary">
								calendar_month
							</span>
							<h3 className="text-white font-semibold">
								{isPrivateTrip ? "Choose Your Departure Date" : "Available Dates"}
							</h3>
						</div>
						<p className="text-text-secondary text-sm">
							{isPrivateTrip 
								? "Select your preferred departure date. As a private trip, you have full flexibility to choose when to start your adventure."
								: "Select from the available slots below. Each slot shows the date, price, and remaining spots."
							}
						</p>
					</div>

					{/* Conditional: Date Picker for Private Trip OR Slot Selection for Open Trip */}
					{isPrivateTrip ? (
						<div className="bg-surface-dark rounded-xl border border-border-dark p-6">
							<h4 className="text-white font-semibold mb-4 flex items-center gap-2">
								<span className="material-symbols-outlined text-violet-400">event</span>
								Select Departure Date
							</h4>
							
							<div className="space-y-4">
								<div>
									<label className="block text-text-secondary text-sm mb-2">
										Preferred Start Date
									</label>
									<input
										type="date"
										value={selectedDate}
										onChange={(e) => setSelectedDate(e.target.value)}
										min={getMinDate()}
										className="w-full bg-background border border-border-dark rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
									/>
								</div>
								
								{selectedDate && (
									<div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
										<div className="flex items-center gap-3">
											<span className="material-symbols-outlined text-violet-400">check_circle</span>
											<div>
												<p className="text-white font-medium">
													Departure: {formatDateForDisplay(selectedDate)}
												</p>
												<p className="text-text-secondary text-sm">
													Price: IDR {tripData.basePrice.toLocaleString()} per person
												</p>
											</div>
										</div>
									</div>
								)}

								<div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
									<div className="flex items-start gap-3">
										<span className="material-symbols-outlined text-blue-400 mt-0.5">info</span>
										<div className="text-sm text-text-secondary">
											<p className="font-medium text-blue-400 mb-1">Private Trip Benefits:</p>
											<ul className="list-disc list-inside space-y-1">
												<li>Flexible departure date</li>
												<li>Exclusive group (just you & your group)</li>
												<li>Customizable itinerary</li>
												<li>Dedicated guide for your group</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<SlotSelection
							onSelectSlot={setSelectedSlot}
							selectedSlotId={selectedSlot?.id || null}
							slots={tripData.slots}
						/>
					)}

					{/* Participant Counter */}
					<ParticipantCounter
						count={participantCount}
						onChange={setParticipantCount}
					/>
				</div>

				{/* Right Column: Sticky Summary */}
				<BookingSummary
					continueLabel="Lanjut / Continue"
					onContinue={handleContinue}
					showContinueButton={true}
					step={1}
				/>
			</div>
		</main>
	);
}
