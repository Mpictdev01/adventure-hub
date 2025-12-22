import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFAB from "../components/WhatsAppFAB";
import Link from "next/link";

export default function GalleryPage() {
	const galleryImages = [
		{
			src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
			title: "Mt. Bromo Sunrise",
			location: "East Java",
		},
		{
			src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
			title: "Mt. Rinjani Summit",
			location: "Lombok",
		},
		{
			src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800",
			title: "Sea of Clouds",
			location: "Mt. Prau",
		},
		{
			src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800",
			title: "Golden Hour",
			location: "Mt. Semeru",
		},
		{
			src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
			title: "Starry Night",
			location: "Mt. Merbabu",
		},
		{
			src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
			title: "Lake Segara Anak",
			location: "Mt. Rinjani",
		},
		{
			src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
			title: "Campsite",
			location: "Mt. Kerinci",
		},
		{
			src: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=800",
			title: "Blue Fire",
			location: "Kawah Ijen",
		},
		{
			src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
			title: "Morning Mist",
			location: "Mt. Bromo",
		},
		{
			src: "https://images.unsplash.com/photo-1433477155337-9aea4e790195?w=800",
			title: "Trekking Trail",
			location: "Mt. Semeru",
		},
		{
			src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
			title: "Forest Path",
			location: "Mt. Merbabu",
		},
		{
			src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
			title: "Sunset View",
			location: "Mt. Prau",
		},
	];

	return (
		<>
			<Navbar />

			{/* Hero Section */}
			<section className="py-16 px-4 md:px-10">
				<div className="max-w-[1280px] mx-auto text-center">
					<span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 uppercase">
						Gallery
					</span>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Moments from the Mountains
					</h1>
					<p className="text-text-secondary text-lg max-w-2xl mx-auto">
						Stunning captures from our adventures across Indonesia's most
						beautiful peaks. Every photo tells a story of courage, beauty, and
						unforgettable memories.
					</p>
				</div>
			</section>

			{/* Gallery Grid */}
			<section className="px-4 md:px-10 pb-16">
				<div className="max-w-[1280px] mx-auto">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
						{galleryImages.map((image, index) => (
							<div
								key={index}
								className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer">
								<div
									className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
									style={{ backgroundImage: `url('${image.src}')` }}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								<div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
									<h3 className="text-white font-bold text-lg">{image.title}</h3>
									<p className="text-text-secondary text-sm flex items-center gap-1">
										<span className="material-symbols-outlined text-[14px]">
											location_on
										</span>
										{image.location}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-12 px-4 md:px-10 bg-surface-dark border-y border-border-dark">
				<div className="max-w-[1280px] mx-auto text-center">
					<h2 className="text-2xl font-bold text-white mb-4">
						Want to be in Our Next Gallery?
					</h2>
					<p className="text-text-secondary mb-6">
						Join one of our trips and create your own mountain memories!
					</p>
					<Link
						href="/trips"
						className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-green-600 text-background-dark font-bold rounded-xl transition-colors">
						Browse Upcoming Trips
						<span className="material-symbols-outlined">arrow_forward</span>
					</Link>
				</div>
			</section>

			<Footer />
			<WhatsAppFAB />
		</>
	);
}
