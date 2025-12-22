import { BookingProvider } from "../components/BookingContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppFAB from "../../components/WhatsAppFAB";

export default function BookingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<BookingProvider>
			<Navbar />
			<div className="min-h-screen bg-background-dark">{children}</div>
			<Footer />
			<WhatsAppFAB />
		</BookingProvider>
	);
}
