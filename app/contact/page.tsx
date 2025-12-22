"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFAB from "../components/WhatsAppFAB";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsSubmitting(false);
		setSubmitted(true);
	};

	const contactInfo = [
		{
			icon: "location_on",
			title: "Office Address",
			content: "Jl. Adventure No. 123, Malang, East Java 65141",
		},
		{
			icon: "phone",
			title: "Phone",
			content: "+62 812-3456-7890",
		},
		{
			icon: "mail",
			title: "Email",
			content: "hello@adventurehub.id",
		},
		{
			icon: "schedule",
			title: "Operating Hours",
			content: "Mon - Sat: 08:00 - 20:00 WIB",
		},
	];

	return (
		<>
			<Navbar activePage="contact" />

			{/* Hero Section */}
			<section className="py-16 px-4 md:px-10">
				<div className="max-w-[1280px] mx-auto text-center">
					<span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20 uppercase">
						Contact Us
					</span>
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
						Get in Touch
					</h1>
					<p className="text-text-secondary text-lg max-w-2xl mx-auto">
						Have questions about our trips? Want to customize your adventure?
						We&apos;d love to hear from you!
					</p>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-8 px-4 md:px-10 pb-16">
				<div className="max-w-[1280px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
						{/* Contact Form */}
						<div className="lg:col-span-7">
							<div className="bg-surface-dark rounded-2xl border border-border-dark p-6 md:p-8">
								<h2 className="text-2xl font-bold text-white mb-6">
									Send Us a Message
								</h2>

								{submitted ? (
									<div className="text-center py-12">
										<div className="size-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
											<span className="material-symbols-outlined text-primary text-[32px]">
												check_circle
											</span>
										</div>
										<h3 className="text-xl font-bold text-white mb-2">
											Message Sent!
										</h3>
										<p className="text-text-secondary mb-6">
											Thank you for reaching out. We&apos;ll get back to you
											within 24 hours.
										</p>
										<button
											onClick={() => {
												setSubmitted(false);
												setFormData({
													name: "",
													email: "",
													phone: "",
													subject: "",
													message: "",
												});
											}}
											className="text-primary hover:underline font-medium">
											Send another message
										</button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-5">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
											<div>
												<label className="block text-sm font-medium text-white mb-2">
													Full Name *
												</label>
												<input
													type="text"
													name="name"
													value={formData.name}
													onChange={handleChange}
													required
													className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
													placeholder="John Doe"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-white mb-2">
													Email Address *
												</label>
												<input
													type="email"
													name="email"
													value={formData.email}
													onChange={handleChange}
													required
													className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
													placeholder="john@example.com"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
											<div>
												<label className="block text-sm font-medium text-white mb-2">
													Phone Number
												</label>
												<input
													type="tel"
													name="phone"
													value={formData.phone}
													onChange={handleChange}
													className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors"
													placeholder="+62 812-xxxx-xxxx"
												/>
											</div>
											<div>
												<label className="block text-sm font-medium text-white mb-2">
													Subject *
												</label>
												<select
													name="subject"
													value={formData.subject}
													onChange={handleChange}
													required
													className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white focus:outline-none focus:border-primary transition-colors">
													<option value="">Select a subject</option>
													<option value="trip-inquiry">Trip Inquiry</option>
													<option value="custom-trip">
														Custom Trip Request
													</option>
													<option value="booking-help">Booking Help</option>
													<option value="partnership">Partnership</option>
													<option value="other">Other</option>
												</select>
											</div>
										</div>

										<div>
											<label className="block text-sm font-medium text-white mb-2">
												Message *
											</label>
											<textarea
												name="message"
												value={formData.message}
												onChange={handleChange}
												required
												rows={5}
												className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-text-secondary focus:outline-none focus:border-primary transition-colors resize-none"
												placeholder="Tell us about your inquiry..."
											/>
										</div>

										<button
											type="submit"
											disabled={isSubmitting}
											className="w-full py-3.5 bg-primary hover:bg-green-600 disabled:bg-primary/50 text-background-dark font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
											{isSubmitting ? (
												<>
													<span className="material-symbols-outlined animate-spin">
														progress_activity
													</span>
													Sending...
												</>
											) : (
												<>
													Send Message
													<span className="material-symbols-outlined">send</span>
												</>
											)}
										</button>
									</form>
								)}
							</div>
						</div>

						{/* Contact Info Sidebar */}
						<div className="lg:col-span-5">
							<div className="bg-surface-dark rounded-2xl border border-border-dark p-6 md:p-8 mb-6">
								<h3 className="text-xl font-bold text-white mb-6">
									Contact Information
								</h3>
								<div className="space-y-6">
									{contactInfo.map((info, index) => (
										<div key={index} className="flex items-start gap-4">
											<div className="size-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
												<span className="material-symbols-outlined text-primary text-[20px]">
													{info.icon}
												</span>
											</div>
											<div>
												<p className="text-text-secondary text-sm mb-1">
													{info.title}
												</p>
												<p className="text-white font-medium">{info.content}</p>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Quick WhatsApp */}
							<div className="bg-gradient-to-r from-green-600/20 to-green-500/10 rounded-2xl border border-green-500/30 p-6">
								<div className="flex items-center gap-4 mb-4">
									<div className="size-12 rounded-full bg-green-500 flex items-center justify-center">
										<svg
											className="w-6 h-6 text-white"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
										</svg>
									</div>
									<div>
										<h4 className="text-white font-bold">
											Prefer WhatsApp?
										</h4>
										<p className="text-text-secondary text-sm">
											Chat with us directly
										</p>
									</div>
								</div>
								<a
									href="https://wa.me/6281234567890"
									target="_blank"
									rel="noopener noreferrer"
									className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
									Chat on WhatsApp
									<span className="material-symbols-outlined">
										arrow_forward
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
			<WhatsAppFAB />
		</>
	);
}
