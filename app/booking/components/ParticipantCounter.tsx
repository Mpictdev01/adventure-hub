"use client";

interface ParticipantCounterProps {
	count: number;
	onChange: (count: number) => void;
	min?: number;
	max?: number;
}

export default function ParticipantCounter({
	count,
	onChange,
	min = 1,
	max = 10,
}: ParticipantCounterProps) {
	const handleDecrement = () => {
		if (count > min) {
			onChange(count - 1);
		}
	};

	const handleIncrement = () => {
		if (count < max) {
			onChange(count + 1);
		}
	};

	return (
		<div className="pt-4 border-t border-border-dark">
			<h3 className="text-white font-semibold mb-4 text-lg">
				Number of Participants
			</h3>
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-dark p-5 rounded-xl border border-border-dark">
				<div>
					<p className="text-white font-medium">Adults / Pax</p>
					<p className="text-text-secondary text-sm">Age 12+</p>
				</div>
				<div className="flex items-center gap-4">
					<button
						className="w-10 h-10 rounded-lg border border-border-dark bg-background-dark text-white hover:border-primary hover:text-primary transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={count <= min}
						onClick={handleDecrement}
						type="button">
						<span className="material-symbols-outlined">remove</span>
					</button>
					<input
						className="w-12 text-center bg-transparent border-none text-white text-xl font-bold focus:ring-0 p-0"
						readOnly
						type="text"
						value={count}
					/>
					<button
						className="w-10 h-10 rounded-lg border border-border-dark bg-background-dark text-white hover:border-primary hover:text-primary transition flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={count >= max}
						onClick={handleIncrement}
						type="button">
						<span className="material-symbols-outlined">add</span>
					</button>
				</div>
			</div>
		</div>
	);
}
