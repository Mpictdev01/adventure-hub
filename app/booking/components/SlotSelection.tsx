"use client";

import { SlotInfo } from "./BookingContext";

interface SlotSelectionProps {
	slots: SlotInfo[];
	selectedSlotId: string | null;
	onSelectSlot: (slot: SlotInfo) => void;
}

export default function SlotSelection({
	slots,
	selectedSlotId,
	onSelectSlot,
}: SlotSelectionProps) {
	return (
		<div>
			<h3 className="text-white font-semibold mb-4 text-lg">
				Select Available Slot
			</h3>
			<div className="flex flex-col gap-3">
				{slots.map((slot) => {
					const isSelected = selectedSlotId === slot.id;
					const isDisabled = slot.status === "fully-booked";

					return (
						<label
							key={slot.id}
							className={`group cursor-pointer relative flex items-center gap-4 rounded-xl p-4 transition-all ${
								isDisabled
									? "border border-dashed border-border-dark bg-transparent opacity-50 cursor-not-allowed"
									: isSelected
									? "border border-primary bg-primary/5 hover:bg-primary/10"
									: "border border-border-dark bg-surface-dark hover:border-border-dark/70"
							}`}>
							<input
								checked={isSelected}
								className={`h-5 w-5 border-2 ${
									isSelected
										? "border-primary bg-transparent text-primary"
										: "border-border-dark bg-transparent"
								} focus:ring-primary focus:ring-offset-background-dark cursor-pointer`}
								disabled={isDisabled}
								name="slot"
								onChange={() => !isDisabled && onSelectSlot(slot)}
								type="radio"
							/>
							<div className="flex grow flex-col sm:flex-row sm:items-center justify-between">
								<div className="flex flex-col">
									<p className="text-white text-base font-medium">
										{slot.displayDate}
									</p>
									<p
										className={`text-sm font-medium ${
											slot.status === "filling-fast"
												? "text-primary"
												: slot.status === "fully-booked"
												? "text-text-secondary"
												: "text-text-secondary"
										}`}>
										{slot.label ||
											(slot.status === "filling-fast"
												? "Filling Fast"
												: slot.status === "weekend"
												? "Weekend Trip"
												: slot.status === "fully-booked"
												? "Fully Booked"
												: "Available")}
									</p>
								</div>
								<div className="text-right mt-2 sm:mt-0">
									<p className="text-white font-bold">
										IDR {slot.price.toLocaleString("id-ID")}
									</p>
									<p
										className={`text-sm ${
											slot.spotsLeft === 0
												? "text-red-400"
												: "text-text-secondary"
										}`}>
										{slot.spotsLeft === 0
											? "0 spots left"
											: `${slot.spotsLeft} spots left`}
									</p>
								</div>
							</div>
						</label>
					);
				})}
			</div>
		</div>
	);
}
