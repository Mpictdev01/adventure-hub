"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { trips } from "../data/trips";

interface NavbarProps {
	activePage?: "home" | "trips" | "about" | "contact" | "gallery" | "articles";
}

export default function Navbar({ activePage: initialActivePage = "home" }: NavbarProps) {
	const { theme, toggleTheme } = useTheme();
	const { language, toggleLanguage, t } = useLanguage();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [activePage, setActivePage] = useState(initialActivePage);

	// Autocomplete State
	const [searchQuery, setSearchQuery] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);

	// Scroll Spy Logic
	useEffect(() => {
		if (initialActivePage !== "home") return;

		const handleScroll = () => {
			const sections = ["gallery", "articles"];
			let currentSection = "home";

			for (const id of sections) {
				const element = document.getElementById(id);
				if (element) {
					const rect = element.getBoundingClientRect();
					// If the section is near the top of the viewport
					if (rect.top <= 150) {
						currentSection = id as any;
					}
				}
			}

			// If we are at the very top, it's home
			if (window.scrollY < 300) {
				currentSection = "home";
			}

			setActivePage(currentSection as any);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [initialActivePage]);

	const searchResults = useMemo(() => {
		if (!searchQuery) return [];
		return trips.filter((trip) =>
			trip.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [searchQuery]);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		if (e.target.value.length > 0) {
			setShowDropdown(true);
		} else {
			setShowDropdown(false);
		}
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			<nav className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-colors duration-300">
				<div className="px-4 md:px-10 py-3 max-w-[1280px] mx-auto flex items-center justify-between gap-4 lg:gap-8">
					{/* Left: Logo */}
					<Link href="/" className="flex items-center gap-2 text-text-main shrink-0">
						<img 
							src="/logo.png" 
							alt="AdventureHub Logo" 
							className={`size-8 ${theme === 'dark' ? 'brightness-0 invert' : ''}`}
						/>
						<h2 className="text-text-main text-sm sm:text-base lg:text-lg font-medium leading-tight tracking-tight whitespace-nowrap">
							Adventure<span className="font-bold">HUB</span>
						</h2>
					</Link>

					{/* Search Bar - Hidden on small screens */}
					<div className="relative hidden lg:flex flex-col w-48 xl:w-64 shrink-0 z-50">
							<div className="flex w-full flex-1 items-stretch rounded-lg h-10 bg-surface border border-border">
								<div className="text-text-secondary flex border-none bg-surface items-center justify-center pl-4 rounded-l-lg border-r-0">
									<span className="material-symbols-outlined text-[24px]">
										search
									</span>
								</div>
								<input
									className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-main focus:outline-0 focus:ring-0 border-none bg-surface focus:border-none h-full placeholder:text-text-secondary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
									placeholder={t("navbar.searchPlaceholder")}
									type="text"
									value={searchQuery} // Bind value
									onChange={handleSearchChange} // Handle input
									onFocus={() => {
										if (searchQuery.length > 0) setShowDropdown(true);
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											window.location.href = `/trips?q=${searchQuery}`;
										}
									}}
								/>
							</div>

							{/* Autocomplete Dropdown */}
							{showDropdown && (
								<>
									<div
										className="fixed inset-0 z-40"
										onClick={() => setShowDropdown(false)}></div>
									<div className="absolute top-12 left-0 w-full bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-50 flex flex-col max-h-[400px] overflow-y-auto">
										{searchResults.length > 0 ? (
											searchResults.map((trip) => (
												<Link
													key={trip.id}
													href={`/trips/${trip.id}`}
													onClick={() => setShowDropdown(false)}
													className="flex items-center gap-3 p-3 hover:bg-background-dark/5 dark:hover:bg-white/5 transition-colors border-b border-border last:border-none group">
													<div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
														<img
															src={trip.imageUrl}
															alt={trip.title}
															className="w-full h-full object-cover group-hover:scale-110 transition-transform"
														/>
													</div>
													<div className="flex flex-col min-w-0">
														<span className="text-sm font-bold text-text-main truncate">
															{trip.title}
														</span>
														<span className="text-xs text-text-secondary truncate">
															{trip.location}
														</span>
													</div>
												</Link>
											))
										) : (
											<div className="p-4 text-center text-text-secondary text-sm">
												{language === "EN"
													? "No trips found."
													: "Trip tidak ditemukan."}
											</div>
										)}
									</div>
								</>
							)}
					</div>

					{/* Center: Menu Items - Desktop */}
					<div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
						<Link
							href="/"
							className={`text-sm font-medium leading-normal transition-colors ${
								activePage === "home"
									? "text-primary"
									: "text-text-main hover:text-primary"
							}`}>
							{t("navbar.home")}
						</Link>
						<Link
							href="/trips"
							className={`text-sm font-medium leading-normal transition-colors ${
								activePage === "trips"
									? "text-primary"
									: "text-text-main hover:text-primary"
							}`}>
							{t("navbar.trips")}
						</Link>
						
						{/* Gallery & Articles Anchor Links */}
						<Link
							href="/#gallery"
							className={`text-sm font-medium leading-normal transition-colors ${
								activePage === "gallery"
									? "text-primary"
									: "text-text-main hover:text-primary"
							}`}>
							{t("navbar.gallery")}
						</Link>
						<Link
							href="/#articles"
							className={`text-sm font-medium leading-normal transition-colors ${
								activePage === "articles"
									? "text-primary"
									: "text-text-main hover:text-primary"
							}`}>
							{t("navbar.articles")}
						</Link>

						<Link
							href="/about"
							className={`text-sm font-medium leading-normal transition-colors ${
								activePage === "about"
									? "text-primary"
									: "text-text-main hover:text-primary"
							}`}>
							{t("navbar.about")}
						</Link>
						<Link
							href="/contact"
							className={`text-sm font-medium leading-normal transition-colors ${
								activePage === "contact"
									? "text-primary"
									: "text-text-main hover:text-primary"
							}`}>
							{t("navbar.contact")}
						</Link>
					</div>

					{/* Right: Language Toggle, Dark Mode, Cart */}
					<div className="flex items-center justify-end gap-4 flex-1">
						<div className="hidden lg:flex items-center gap-4">
							{/* Language Toggle */}
							<button
								onClick={toggleLanguage}
								className="text-text-main hover:text-primary text-sm font-medium transition-colors">
								{language === "EN" ? "EN | ID" : "ID | EN"}
							</button>

							{/* Dark Mode Toggle */}
							<button
								onClick={toggleTheme}
								className="text-text-main hover:text-primary transition-colors"
								aria-label="Toggle dark mode">
								<span className="material-symbols-outlined text-[20px]">
									{theme === "light" ? "dark_mode" : "light_mode"}
								</span>
							</button>

							{/* Shopping Cart */}
							<button
								className="text-text-main hover:text-primary transition-colors"
								aria-label="Shopping cart">
								<span className="material-symbols-outlined text-[20px]">
									shopping_cart
								</span>
							</button>
						</div>

						{/* Mobile Menu Icon */}
						<button
							className="lg:hidden text-text-main p-2"
							onClick={toggleMobileMenu}
							aria-label="Toggle mobile menu">
							<span className="material-symbols-outlined text-[28px]">
								{isMobileMenuOpen ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>
			</nav>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black/60 z-40 lg:hidden"
					onClick={closeMobileMenu}
				/>
			)}

			{/* Mobile Menu Drawer */}
			<div
				className={`fixed top-0 right-0 h-full w-[280px] bg-surface border-l border-border z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
					isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				{/* Mobile Menu Header */}
				<div className="flex items-center justify-between p-4 border-b border-border">
					<h3 className="text-text-main font-bold text-lg">{t("navbar.menu")}</h3>
					<button
						onClick={closeMobileMenu}
						className="text-text-secondary hover:text-text-main transition-colors p-1">
						<span className="material-symbols-outlined">close</span>
					</button>
				</div>

				{/* Mobile Menu Links */}
				<div className="flex flex-col p-4 overflow-y-auto h-[calc(100vh-64px)]">
					<Link
						href="/"
						onClick={closeMobileMenu}
						className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
							activePage === "home"
								? "text-primary bg-primary/10"
								: "text-text-main hover:bg-border"
						}`}>
						<span className="flex items-center gap-3">
							<span className="material-symbols-outlined text-[20px]">
								home
							</span>
							{t("navbar.home")}
						</span>
					</Link>
					<Link
						href="/trips"
						onClick={closeMobileMenu}
						className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
							activePage === "trips"
								? "text-primary bg-primary/10"
								: "text-text-main hover:bg-border"
						}`}>
						<span className="flex items-center gap-3">
							<span className="material-symbols-outlined text-[20px]">
								landscape
							</span>
							{t("navbar.trips")}
						</span>
					</Link>

					{/* Mobile: Gallery & Articles */}
					<Link
						href="/#gallery"
						onClick={closeMobileMenu}
						className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
							activePage === "gallery"
								? "text-primary bg-primary/10"
								: "text-text-main hover:bg-border"
						}`}>
						<span className="flex items-center gap-3">
							<span className="material-symbols-outlined text-[20px]">
								gallery_thumbnail
							</span>
							{t("navbar.gallery")}
						</span>
					</Link>
					<Link
						href="/#articles"
						onClick={closeMobileMenu}
						className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
							activePage === "articles"
								? "text-primary bg-primary/10"
								: "text-text-main hover:bg-border"
						}`}>
						<span className="flex items-center gap-3">
							<span className="material-symbols-outlined text-[20px]">
								article
							</span>
							{t("navbar.articles")}
						</span>
					</Link>

					<Link
						href="/about"
						onClick={closeMobileMenu}
						className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
							activePage === "about"
								? "text-primary bg-primary/10"
								: "text-text-main hover:bg-border"
						}`}>
						<span className="flex items-center gap-3">
							<span className="material-symbols-outlined text-[20px]">
								info
							</span>
							{t("navbar.about")}
						</span>
					</Link>
					<Link
						href="/contact"
						onClick={closeMobileMenu}
						className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
							activePage === "contact"
								? "text-primary bg-primary/10"
								: "text-text-main hover:bg-border"
						}`}>
						<span className="flex items-center gap-3">
							<span className="material-symbols-outlined text-[20px]">
								mail
							</span>
							{t("navbar.contact")}
						</span>
					</Link>

					{/* Divider */}
					<div className="h-px bg-border my-4" />

					{/* Track Booking */}
					<Link
						href="/booking/track"
						onClick={closeMobileMenu}
						className="py-3 px-4 rounded-lg text-base font-medium text-text-main hover:bg-border transition-colors">
						<span className="flex items-center gap-3">
							<span className="material-symbols-outlined text-[20px]">
								search
							</span>
							{t("navbar.track")}
						</span>
					</Link>

					{/* Divider */}
					<div className="h-px bg-border my-4" />

					{/* Language & Theme */}
					<div className="flex items-center justify-between px-4 py-2">
						<span className="text-text-secondary text-sm">{t("navbar.language")}</span>
						<button
							onClick={toggleLanguage}
							className="text-text-main hover:text-primary text-sm font-medium transition-colors bg-surface px-3 py-1.5 rounded-lg border border-border">
							{language === "EN" ? "English" : "Indonesia"}
						</button>
					</div>
					<div className="flex items-center justify-between px-4 py-2">
						<span className="text-text-secondary text-sm">{t("navbar.theme")}</span>
						<button
							onClick={toggleTheme}
							className="text-text-main hover:text-primary transition-colors bg-surface px-3 py-1.5 rounded-lg border border-border flex items-center gap-2">
							<span className="material-symbols-outlined text-[18px]">
								{theme === "light" ? "dark_mode" : "light_mode"}
							</span>
							<span className="text-sm">{theme === "light" ? "Dark" : "Light"}</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
