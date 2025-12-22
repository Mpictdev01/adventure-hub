import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	weight: ["400", "500", "700", "900"],
});

const notoSans = Noto_Sans({
	variable: "--font-noto-sans",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Adventure Hub - Explore Indonesia's Highest Peaks",
	description:
		"Safe, guided open and private trips tailored for you. Experience the wilderness like never before with Adventure Hub Indonesia.",
};

import Preloader from "./components/Preloader";

// ... existing imports ...

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body
				suppressHydrationWarning
				className={`${inter.variable} ${notoSans.variable} bg-background font-[family-name:var(--font-inter)] text-text-main overflow-x-hidden antialiased`}>
				<Preloader />
				<ThemeProvider>
					<LanguageProvider>{children}</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
