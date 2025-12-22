import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFAB from "../components/WhatsAppFAB";

export default function PrivacyPage() {
	return (
		<>
			<Navbar />

			<main className="py-16 px-4 md:px-10">
				<div className="max-w-[800px] mx-auto">
					<span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 uppercase">
						Legal
					</span>
					<h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
					<p className="text-text-secondary mb-8">
						Last updated: December 2024
					</p>

					<div className="prose prose-invert max-w-none space-y-8">
						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								1. Information We Collect
							</h2>
							<p className="text-text-secondary leading-relaxed mb-4">
								We collect information you provide directly to us, including:
							</p>
							<ul className="list-disc list-inside text-text-secondary space-y-2">
								<li>Name, email address, phone number</li>
								<li>ID number (KTP/Passport) for trip registration</li>
								<li>Emergency contact information</li>
								<li>Payment information</li>
								<li>Trip preferences and feedback</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								2. How We Use Your Information
							</h2>
							<ul className="list-disc list-inside text-text-secondary space-y-2">
								<li>Process bookings and payments</li>
								<li>Communicate trip details and updates</li>
								<li>Provide customer support</li>
								<li>Send promotional offers (with your consent)</li>
								<li>Improve our services</li>
								<li>Comply with legal obligations</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								3. Information Sharing
							</h2>
							<p className="text-text-secondary leading-relaxed">
								We do not sell your personal information. We may share your
								information with trusted partners only when necessary to provide
								our services (e.g., tour guides, transportation providers,
								insurance companies). All partners are bound by confidentiality
								agreements.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								4. Data Security
							</h2>
							<p className="text-text-secondary leading-relaxed">
								We implement appropriate security measures to protect your
								personal information against unauthorized access, alteration, or
								destruction. However, no method of transmission over the internet
								is 100% secure.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								5. Cookies & Tracking
							</h2>
							<p className="text-text-secondary leading-relaxed">
								We use cookies to improve your browsing experience and analyze
								website traffic. You can control cookie settings through your
								browser preferences.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								6. Your Rights
							</h2>
							<ul className="list-disc list-inside text-text-secondary space-y-2">
								<li>Access your personal data</li>
								<li>Request corrections to your data</li>
								<li>Request deletion of your data</li>
								<li>Opt-out of marketing communications</li>
								<li>Withdraw consent at any time</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								7. Data Retention
							</h2>
							<p className="text-text-secondary leading-relaxed">
								We retain your personal information for as long as necessary to
								provide our services and comply with legal obligations. Booking
								records are kept for 5 years for tax and legal purposes.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								8. Contact Us
							</h2>
							<p className="text-text-secondary leading-relaxed">
								For privacy-related inquiries, please contact our Data Protection
								Officer at{" "}
								<a
									href="mailto:privacy@adventurehub.id"
									className="text-primary hover:underline">
									privacy@adventurehub.id
								</a>
								.
							</p>
						</section>
					</div>
				</div>
			</main>

			<Footer />
			<WhatsAppFAB />
		</>
	);
}
