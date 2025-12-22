import Link from "next/link";

interface TripCardProps {
	id: string;
	title: string;
	location: string;
	difficulty:
		| "Easy"
		| "Medium"
		| "Hard"
		| "Beginner"
		| "Intermediate"
		| "Expert";
	duration: string;
	price: string;
	imageUrl: string;
	rating?: number;
	badge?: "Open Trip" | "Private Trip";
	date?: string;
}

export default function TripCard({
	id,
	title,
	location,
	difficulty,
	duration,
	price,
	imageUrl,
	rating,
	badge,
	date,
}: TripCardProps) {
	const difficultyColors = {
		Easy: "bg-blue-500/20 text-blue-400",
		Beginner: "bg-blue-500/20 text-blue-400",
		Medium: "bg-orange-500/20 text-orange-400",
		Intermediate: "bg-orange-500/20 text-orange-400",
		Hard: "bg-red-500/20 text-red-400",
		Expert: "bg-red-500/20 text-red-400",
	};

	return (
		<div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden hover:-translate-y-1 transition-transform duration-300 group h-full flex flex-col">
			{/* Image - Clickable to trip detail */}
			<Link href={`/trips/${id}`} className="block">
				<div className="relative h-48 overflow-hidden">
					<img
						src={imageUrl}
						alt={title}
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
					{date && (
						<div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white flex items-center gap-1">
							<span className="material-symbols-outlined text-[14px] text-primary">
								calendar_today
							</span>
							{date}
						</div>
					)}
						{badge && (
						<div
							className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full ${
								badge === "Open Trip"
									? "bg-primary text-white"
									: "bg-violet-500 text-white"
							}`}>
							{badge}
						</div>
					)}
				</div>
			</Link>

			{/* Content */}
			<div className="p-4 flex flex-col gap-3 flex-1">
				<Link href={`/trips/${id}`} className="block">
					<div className="flex justify-between items-start mb-1">
						<h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
							{title}
						</h3>
						{rating && (
							<div className="flex items-center gap-1 text-[#FFD700]">
								<span className="material-symbols-outlined text-[16px]">
									star
								</span>
								<span className="text-xs font-bold text-white">{rating}</span>
							</div>
						)}
					</div>
					<div className="flex items-center gap-1 text-sm text-text-secondary mt-1">
						<span className="material-symbols-outlined text-[16px]">
							location_on
						</span>
						{location}
					</div>
				</Link>

				<div className="flex items-center gap-2">
					<span
						className={`px-2 py-0.5 rounded text-xs font-medium ${difficultyColors[difficulty]}`}>
						{difficulty}
					</span>
					<span className="px-2 py-0.5 rounded bg-gray-700 text-gray-300 text-xs font-medium">
						{duration}
					</span>
				</div>

				<div className="pt-3 mt-auto border-t border-border-dark flex items-center justify-between">
					<div className="flex flex-col">
						<span className="text-xs text-text-secondary">Starting at</span>
						<span className="font-bold text-primary">{price}</span>
					</div>
					<Link
						href={`/booking/${id}/step1`}
						className="px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:bg-green-600 transition-colors flex items-center gap-1">
						Book Now
						<span className="material-symbols-outlined text-sm">
							arrow_forward
						</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
