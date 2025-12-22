import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFAB from "../components/WhatsAppFAB";

export default function TermsPage() {
	return (
		<>
			<Navbar />

			<main className="py-16 px-4 md:px-10">
				<div className="max-w-[800px] mx-auto">
					<span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 uppercase">
						Legal
					</span>
					<h1 className="text-4xl font-bold text-white mb-4">
						Terms & Conditions
					</h1>
					<p className="text-text-secondary mb-8">
						Last updated: December 2024
					</p>

					<div className="prose prose-invert max-w-none space-y-8">
						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								1. Acceptance of Terms
							</h2>
							<p className="text-text-secondary leading-relaxed">
								By accessing and using AdventureHub's services, you accept and
								agree to be bound by these Terms and Conditions. If you do not
								agree to these terms, please do not use our services.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								2. Booking & Payment
							</h2>
							<ul className="list-disc list-inside text-text-secondary space-y-2">
								<li>All bookings require a 50% deposit to confirm your spot.</li>
								<li>
									Full payment is due 7 days before the trip departure date.
								</li>
								<li>
									Prices are in Indonesian Rupiah (IDR) unless otherwise stated.
								</li>
								<li>
									We accept bank transfer, e-wallet, and credit card payments.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								3. Cancellation Policy
							</h2>
							<ul className="list-disc list-inside text-text-secondary space-y-2">
								<li>
									Cancellation 14+ days before departure: Full refund minus 10%
									admin fee.
								</li>
								<li>Cancellation 7-13 days before: 50% refund.</li>
								<li>Cancellation less than 7 days before: No refund.</li>
								<li>
									Trip cancellation by AdventureHub due to weather or safety:
									Full refund or reschedule.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								4. Participant Requirements
							</h2>
							<ul className="list-disc list-inside text-text-secondary space-y-2">
								<li>Minimum age is 18 years (or 15 with guardian).</li>
								<li>
									Participants must be in good physical health for the selected
									trip difficulty.
								</li>
								<li>Valid ID (KTP/Passport) is required for all participants.</li>
								<li>
									Disclosure of medical conditions is mandatory during booking.
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								5. Liability & Insurance
							</h2>
							<p className="text-text-secondary leading-relaxed">
								AdventureHub carries liability insurance for all trips. However,
								we recommend participants obtain personal travel insurance. We
								are not responsible for loss of personal belongings, injuries
								resulting from participant negligence, or circumstances beyond
								our control.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								6. Code of Conduct
							</h2>
							<ul className="list-disc list-inside text-text-secondary space-y-2">
								<li>
									Follow guide instructions at all times for your safety.
								</li>
								<li>Respect local communities and environments.</li>
								<li>Practice Leave No Trace principles.</li>
								<li>No littering, no illegal substances, no harassment.</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-white mb-4">
								7. Contact Us
							</h2>
							<p className="text-text-secondary leading-relaxed">
								If you have any questions about these Terms & Conditions, please
								contact us at{" "}
								<a
									href="mailto:legal@adventurehub.id"
									className="text-primary hover:underline">
									legal@adventurehub.id
								</a>{" "}
								or via WhatsApp at +62 812-3456-7890.
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
