import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFAB from "../components/WhatsAppFAB";
import Link from "next/link";

export default function AboutPage() {
	const teamMembers = [
		{
			name: "Rizky Pratama",
			role: "Founder & Lead Guide",
			image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
			description: "10+ years mountaineering experience across Indonesia.",
		},
		{
			name: "Dewi Sartika",
			role: "Operations Manager",
			image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
			description: "Ensures every trip runs smoothly from start to finish.",
		},
		{
			name: "Ahmad Fauzi",
			role: "Senior Guide",
			image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
			description: "Expert in Rinjani and Semeru expeditions.",
		},
	];

	const stats = [
		{ number: "500+", label: "Trips Completed" },
		{ number: "10,000+", label: "Happy Travelers" },
		{ number: "15+", label: "Destinations" },
		{ number: "8+", label: "Years Experience" },
	];

	return (
		<>
			<Navbar activePage="about" />

			{/* Hero Section */}
			<section className="relative py-20 px-4 md:px-10">
				<div className="max-w-[1280px] mx-auto text-center">
					<span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 uppercase">
						About Us
					</span>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Your Adventure Starts Here
					</h1>
					<p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
						AdventureHub is Indonesia's premier mountain trekking company,
						dedicated to creating safe, memorable, and transformative outdoor
						experiences for adventurers of all levels.
					</p>
				</div>
			</section>

			{/* Stats Section */}
			<section className="py-12 px-4 md:px-10 bg-surface-dark border-y border-border-dark">
				<div className="max-w-[1280px] mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<div key={index} className="text-center">
								<p className="text-3xl md:text-4xl font-bold text-primary mb-2">
									{stat.number}
								</p>
								<p className="text-text-secondary text-sm">{stat.label}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Our Story Section */}
			<section className="py-16 px-4 md:px-10">
				<div className="max-w-[1280px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
							<div className="space-y-4 text-text-secondary leading-relaxed">
								<p>
									Founded in 2016, AdventureHub began with a simple mission: to
									share the breathtaking beauty of Indonesia's mountains with
									the world, while prioritizing safety and sustainability.
								</p>
								<p>
									What started as a small team of passionate mountaineers has
									grown into a trusted adventure company, guiding thousands of
									travelers to summit peaks across Java, Sumatra, Lombok, and
									beyond.
								</p>
								<p>
									We believe that mountains have the power to transform lives.
									Every sunrise witnessed from a summit, every challenge
									overcome on the trail, brings us closer to our true selves and
									to each other.
								</p>
							</div>
						</div>
						<div className="relative">
							<div
								className="aspect-[4/3] rounded-2xl bg-cover bg-center"
								style={{
									backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800')`,
								}}
							/>
							<div className="absolute -bottom-6 -left-6 bg-surface-dark border border-border-dark rounded-xl p-4 shadow-xl">
								<p className="text-primary font-bold text-2xl">Since 2016</p>
								<p className="text-text-secondary text-sm">
									Trusted by adventurers
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Why Choose Us */}
			<section className="py-16 px-4 md:px-10 bg-surface-dark">
				<div className="max-w-[1280px] mx-auto">
					<h2 className="text-3xl font-bold text-white text-center mb-12">
						Why Choose AdventureHub?
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="bg-background-dark rounded-xl p-6 border border-border-dark">
							<div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
								<span className="material-symbols-outlined text-[28px]">
									verified_user
								</span>
							</div>
							<h3 className="text-white font-bold text-lg mb-2">
								Safety First
							</h3>
							<p className="text-text-secondary text-sm leading-relaxed">
								All guides are certified and trained in wilderness first aid.
								We never compromise on safety protocols.
							</p>
						</div>
						<div className="bg-background-dark rounded-xl p-6 border border-border-dark">
							<div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
								<span className="material-symbols-outlined text-[28px]">
									groups
								</span>
							</div>
							<h3 className="text-white font-bold text-lg mb-2">
								Expert Guides
							</h3>
							<p className="text-text-secondary text-sm leading-relaxed">
								Our team consists of experienced local guides who know every
								trail and can share fascinating stories.
							</p>
						</div>
						<div className="bg-background-dark rounded-xl p-6 border border-border-dark">
							<div className="size-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">
								<span className="material-symbols-outlined text-[28px]">
									eco
								</span>
							</div>
							<h3 className="text-white font-bold text-lg mb-2">
								Eco-Friendly
							</h3>
							<p className="text-text-secondary text-sm leading-relaxed">
								We practice Leave No Trace principles and contribute to local
								conservation efforts.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-16 px-4 md:px-10">
				<div className="max-w-[1280px] mx-auto">
					<h2 className="text-3xl font-bold text-white text-center mb-4">
						Meet Our Team
					</h2>
					<p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
						The passionate people behind your unforgettable adventures
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{teamMembers.map((member, index) => (
							<div
								key={index}
								className="bg-surface-dark rounded-xl p-6 border border-border-dark text-center group hover:-translate-y-1 transition-transform">
								<div
									className="w-24 h-24 mx-auto rounded-full bg-cover bg-center mb-4 border-2 border-primary/30"
									style={{ backgroundImage: `url('${member.image}')` }}
								/>
								<h3 className="text-white font-bold text-lg mb-1">
									{member.name}
								</h3>
								<p className="text-primary text-sm font-medium mb-2">
									{member.role}
								</p>
								<p className="text-text-secondary text-sm">
									{member.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 px-4 md:px-10 bg-gradient-to-r from-primary/20 to-primary/5 border-y border-border-dark">
				<div className="max-w-[1280px] mx-auto text-center">
					<h2 className="text-3xl font-bold text-white mb-4">
						Ready for Your Next Adventure?
					</h2>
					<p className="text-text-secondary mb-8 max-w-xl mx-auto">
						Browse our upcoming trips and find your perfect mountain experience.
					</p>
					<Link
						href="/trips"
						className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-green-600 text-background-dark font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(25,179,102,0.3)]">
						Explore Trips
						<span className="material-symbols-outlined">arrow_forward</span>
					</Link>
				</div>
			</section>

			<Footer />
			<WhatsAppFAB />
		</>
	);
}
