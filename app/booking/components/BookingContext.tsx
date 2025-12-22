"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types
export interface SlotInfo {
	id: string;
	date: string;
	displayDate: string;
	price: number;
	spotsLeft: number;
	status: "filling-fast" | "weekend" | "normal" | "fully-booked";
	label?: string;
}

export interface ParticipantData {
	fullName: string;
	idNumber: string;
	phone: string;
	email?: string;
	emergencyContactName?: string;
	emergencyContactPhone?: string;
}

export interface BookingState {
	tripId: string;
	tripName: string;
	tripImage: string;
	tripLocation: string;
	selectedDate: Date | null;
	selectedSlot: SlotInfo | null;
	participantCount: number;
	pricePerPax: number;
	mainBooker: ParticipantData | null;
	participants: ParticipantData[];
	bookingId: string | null;
	paymentMethod: string | null;
}

interface BookingContextType {
	booking: BookingState;
	updateBooking: (updates: Partial<BookingState>) => void;
	resetBooking: () => void;
	getTotalPrice: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(
	undefined
);

const defaultBookingState: BookingState = {
	tripId: "",
	tripName: "",
	tripImage: "",
	tripLocation: "",
	selectedDate: null,
	selectedSlot: null,
	participantCount: 1,
	pricePerPax: 0,
	mainBooker: null,
	participants: [],
	bookingId: null,
	paymentMethod: null,
};

export function BookingProvider({ children }: { children: React.ReactNode }) {
	const [booking, setBooking] = useState<BookingState>(defaultBookingState);

	// Load from localStorage on mount
	useEffect(() => {
		const savedBooking = localStorage.getItem("adventurehub_booking");
		if (savedBooking) {
			try {
				const parsed = JSON.parse(savedBooking);
				// Convert date string back to Date object
				if (parsed.selectedDate) {
					parsed.selectedDate = new Date(parsed.selectedDate);
				}
				setBooking(parsed);
			} catch (error) {
				console.error("Failed to parse saved booking:", error);
			}
		}
	}, []);

	// Save to localStorage whenever booking changes
	useEffect(() => {
		if (booking.tripId) {
			localStorage.setItem("adventurehub_booking", JSON.stringify(booking));
		}
	}, [booking]);

	const updateBooking = (updates: Partial<BookingState>) => {
		setBooking((prev) => ({ ...prev, ...updates }));
	};

	const resetBooking = () => {
		setBooking(defaultBookingState);
		localStorage.removeItem("adventurehub_booking");
	};

	const getTotalPrice = () => {
		return booking.pricePerPax * booking.participantCount;
	};

	return (
		<BookingContext.Provider
			value={{ booking, updateBooking, resetBooking, getTotalPrice }}>
			{children}
		</BookingContext.Provider>
	);
}

export function useBooking() {
	const context = useContext(BookingContext);
	if (context === undefined) {
		throw new Error("useBooking must be used within a BookingProvider");
	}
	return context;
}
