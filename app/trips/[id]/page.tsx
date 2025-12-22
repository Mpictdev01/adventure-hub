import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppFAB from "../../components/WhatsAppFAB";
import Link from "next/link";
import { getTripById, TRIPS_DATA } from "../../data/trips";
import { notFound } from "next/navigation";

interface TripDetailPageProps {
	params: Promise<{ id: string }>;
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
	const { id } = await params;
	const trip = getTripById(id);

	if (!trip) {
		notFound();
	}

	return (
		<>
			<Navbar activePage="trips" />

			{/* Main Content */}
			<main className="flex-grow w-full flex flex-col items-center py-6 px-4 md:px-8">
				<div className="w-full max-w-[1280px] flex flex-col gap-6">
					{/* Breadcrumbs */}
					<nav className="flex flex-wrap gap-2 text-sm">
						<Link
							href="/"
							className="text-text-secondary hover:text-primary transition-colors font-medium">
							Home
						</Link>
						<span className="text-text-secondary font-medium">/</span>
						<Link
							href="/trips"
							className="text-text-secondary hover:text-primary transition-colors font-medium">
							Trips
						</Link>
						<span className="text-text-secondary font-medium">/</span>
						<span className="text-white font-medium">{trip.name}</span>
					</nav>

					{/* Hero Section: Split Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
						{/* Left Column: Gallery */}
						<div className="lg:col-span-7 flex flex-col gap-3">
							{/* Main Image */}
							<div
								className="w-full aspect-video md:aspect-[16/9] lg:aspect-[16/10] bg-center bg-cover rounded-xl overflow-hidden relative group cursor-pointer"
								style={{
									backgroundImage: `url('${trip.imageUrl}')`,
								}}>
								<div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
							</div>

							{/* Thumbnails Grid */}
							<div className="grid grid-cols-4 gap-3">
								<div
									className="aspect-square bg-center bg-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
									style={{
										backgroundImage: `url('${trip.imageUrl}')`,
									}}></div>
								<div
									className="aspect-square bg-center bg-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
									style={{
										backgroundImage: `url('${trip.imageUrl}')`,
									}}></div>
								<div
									className="aspect-square bg-center bg-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
									style={{
										backgroundImage: `url('${trip.imageUrl}')`,
									}}></div>
								<div className="aspect-square bg-surface-dark border border-border-dark rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-border-dark transition-colors group">
									<span className="material-symbols-outlined text-text-secondary group-hover:text-white mb-1">
										grid_view
									</span>
									<span className="text-xs text-text-secondary group-hover:text-white font-medium">
										View All
									</span>
								</div>
							</div>
						</div>

						{/* Right Column: Booking Details */}
						<div className="lg:col-span-5">
							<div className="sticky top-24 flex flex-col gap-5 p-6 rounded-2xl bg-surface-dark border border-border-dark/50">
								{/* Chips */}
								<div className="flex flex-wrap gap-2">
									<div className="px-3 py-1 rounded-full bg-border-dark text-xs font-semibold text-white uppercase tracking-wider">
										{trip.badge}
									</div>
									<div className="px-3 py-1 rounded-full bg-primary/20 text-xs font-semibold text-primary uppercase tracking-wider">
										Best Seller
									</div>
								</div>

								{/* Title & Rating */}
								<div>
									<h1 className="text-3xl font-bold text-white leading-tight mb-2">
										{trip.name}
									</h1>
									<div className="flex items-center gap-2">
										<div className="flex text-yellow-400">
											<span className="material-symbols-outlined text-[20px]">
												star
											</span>
											<span className="material-symbols-outlined text-[20px]">
												star
											</span>
											<span className="material-symbols-outlined text-[20px]">
												star
											</span>
											<span className="material-symbols-outlined text-[20px]">
												star
											</span>
											<span className="material-symbols-outlined text-[20px]">
												star_half
											</span>
										</div>
										<span className="text-white font-bold text-sm">
											{trip.rating}
										</span>
										<span className="text-text-secondary text-sm">
											(124 Reviews)
										</span>
									</div>
								</div>

								{/* Price */}
								<div className="py-2 border-y border-border-dark flex items-baseline gap-2">
									<span className="text-text-secondary text-sm">
										Starts from
									</span>
									<span className="text-2xl font-bold text-primary">
										{trip.price}
									</span>
									<span className="text-text-secondary text-sm">/ pax</span>
								</div>

								{/* Meta Data Grid */}
								<div className="grid grid-cols-2 gap-y-4 gap-x-2">
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-lg bg-background-dark text-text-secondary">
											<span className="material-symbols-outlined text-[20px]">
												calendar_month
											</span>
										</div>
										<div>
											<p className="text-xs text-text-secondary uppercase font-bold tracking-wide">
												Next Trip
											</p>
											<p className="text-sm font-medium text-white">
												{trip.slots[0]?.displayDate || "Coming Soon"}
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-lg bg-background-dark text-text-secondary">
											<span className="material-symbols-outlined text-[20px]">
												schedule
											</span>
										</div>
										<div>
											<p className="text-xs text-text-secondary uppercase font-bold tracking-wide">
												Duration
											</p>
											<p className="text-sm font-medium text-white">
												{trip.duration}
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-lg bg-background-dark text-text-secondary">
											<span className="material-symbols-outlined text-[20px]">
												location_on
											</span>
										</div>
										<div>
											<p className="text-xs text-text-secondary uppercase font-bold tracking-wide">
												Location
											</p>
											<p className="text-sm font-medium text-white">
												{trip.location}
											</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="p-2 rounded-lg bg-background-dark text-text-secondary">
											<span className="material-symbols-outlined text-[20px]">
												group
											</span>
										</div>
										<div>
											<p className="text-xs text-text-secondary uppercase font-bold tracking-wide">
												Availability
											</p>
											<p className="text-sm font-medium text-primary">
												{trip.slots[0]?.spotsLeft || 0} Slots Left
											</p>
										</div>
									</div>
								</div>

								{/* Actions */}
								<div className="flex flex-col gap-3 mt-2">
									<Link
										href={`/booking/${trip.id}/step1`}
										className="w-full h-12 bg-primary hover:bg-[#159a57] text-background-dark font-bold rounded-lg text-base transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(25,179,102,0.3)]">
										Book Now
									</Link>
									<button className="w-full h-12 bg-transparent border border-border-dark hover:border-text-secondary text-white font-medium rounded-lg text-base transition-colors flex items-center justify-center gap-2">
										<span className="material-symbols-outlined text-[20px]">
											chat
										</span>
										Ask via WhatsApp
									</button>
									<p className="text-center text-xs text-text-secondary">
										No account required to book. Instant confirmation.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Content Tabs Section */}
					<div className="mt-12 w-full">
						{/* Tab Headers */}
						<div className="border-b border-border-dark flex overflow-x-auto gap-8 mb-8">
							<button className="pb-3 text-primary border-b-2 border-primary font-bold text-sm whitespace-nowrap">
								Description
							</button>
							<button className="pb-3 text-text-secondary hover:text-white font-medium text-sm whitespace-nowrap transition-colors">
								Itinerary
							</button>
							<button className="pb-3 text-text-secondary hover:text-white font-medium text-sm whitespace-nowrap transition-colors">
								Facilities
							</button>
							<button className="pb-3 text-text-secondary hover:text-white font-medium text-sm whitespace-nowrap transition-colors">
								Terms & Policy
							</button>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
							{/* Main Content Column */}
							<div className="lg:col-span-8 flex flex-col gap-10">
								{/* Description */}
								<section>
									<h3 className="text-xl font-bold text-white mb-4">
										About the Trip
									</h3>
									<div className="text-text-secondary leading-relaxed space-y-4">
										<p>{trip.description}</p>
										<p>
											Perfect for solo travelers, couples, and small groups
											looking for a hassle-free adventure. We handle all the
											logistics so you can focus on the breathtaking views.
										</p>
									</div>

									{/* Highlights */}
									<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="flex items-center gap-3 p-4 rounded-xl bg-surface-dark border border-border-dark">
											<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
												<span className="material-symbols-outlined">
													landscape
												</span>
											</div>
											<span className="text-white font-medium">
												Stunning Views
											</span>
										</div>
										<div className="flex items-center gap-3 p-4 rounded-xl bg-surface-dark border border-border-dark">
											<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
												<span className="material-symbols-outlined">
													directions_car
												</span>
											</div>
											<span className="text-white font-medium">
												Transport Included
											</span>
										</div>
									</div>
								</section>

								{/* Itinerary */}
								<section className="border-t border-border-dark pt-8">
									<h3 className="text-xl font-bold text-white mb-6">
										Itinerary
									</h3>
									<div className="relative pl-4 border-l border-border-dark space-y-8">
										<div className="relative pl-6">
											<div className="absolute -left-[21px] top-1 size-3 rounded-full bg-primary border-4 border-background-dark"></div>
											<span className="text-primary font-bold text-sm block mb-1">
												Day 1
											</span>
											<h4 className="text-white font-bold text-lg mb-2">
												Pick up & Start Adventure
											</h4>
											<p className="text-text-secondary text-sm">
												Gather at the designated meeting point. Briefing by the
												tour leader and start the journey.
											</p>
										</div>
										<div className="relative pl-6">
											<div className="absolute -left-[21px] top-1 size-3 rounded-full bg-border-dark border-4 border-background-dark"></div>
											<span className="text-text-secondary font-bold text-sm block mb-1">
												Day 2
											</span>
											<h4 className="text-white font-bold text-lg mb-2">
												Summit & Return
											</h4>
											<p className="text-text-secondary text-sm">
												Early morning summit push. Enjoy the views and return
												safely.
											</p>
										</div>
									</div>
								</section>

								{/* Facilities */}
								<section className="border-t border-border-dark pt-8">
									<h3 className="text-xl font-bold text-white mb-6">
										Facilities
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
										<div>
											<h4 className="text-white font-bold mb-4 flex items-center gap-2">
												<span className="material-symbols-outlined text-primary">
													check_circle
												</span>
												Included
											</h4>
											<ul className="space-y-3">
												<li className="flex items-start gap-3 text-text-secondary text-sm">
													<span className="size-1.5 rounded-full bg-primary mt-2"></span>
													Transport (MPV/Minibus)
												</li>
												<li className="flex items-start gap-3 text-text-secondary text-sm">
													<span className="size-1.5 rounded-full bg-primary mt-2"></span>
													Professional Driver & Guide
												</li>
												<li className="flex items-start gap-3 text-text-secondary text-sm">
													<span className="size-1.5 rounded-full bg-primary mt-2"></span>
													Entrance Tickets
												</li>
											</ul>
										</div>
										<div>
											<h4 className="text-white font-bold mb-4 flex items-center gap-2">
												<span className="material-symbols-outlined text-red-500">
													cancel
												</span>
												Excluded
											</h4>
											<ul className="space-y-3">
												<li className="flex items-start gap-3 text-text-secondary text-sm">
													<span className="size-1.5 rounded-full bg-border-dark mt-2"></span>
													Meals
												</li>
												<li className="flex items-start gap-3 text-text-secondary text-sm">
													<span className="size-1.5 rounded-full bg-border-dark mt-2"></span>
													Personal Expenses & Tips
												</li>
												<li className="flex items-start gap-3 text-text-secondary text-sm">
													<span className="size-1.5 rounded-full bg-border-dark mt-2"></span>
													Travel Insurance
												</li>
											</ul>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
			<WhatsAppFAB />
		</>
	);
}
