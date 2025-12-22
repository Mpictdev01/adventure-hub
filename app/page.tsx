import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppFAB from "./components/WhatsAppFAB";
import HomeContent from "./components/HomeContent";
import { getTrips, getArticles, getGallery, Trip } from "./lib/db";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function Home() {
	// Fetch data from Supabase (server-side)
	const allTrips = await getTrips();
	const allArticles = await getArticles();
	const galleryItems = await getGallery();

	// Filter trips by badge
	const openTrips = allTrips.filter((trip: Trip) => trip.badge === 'Open Trip').slice(0, 4);
	const privateTrips = allTrips.filter((trip: Trip) => trip.badge === 'Private Trip').slice(0, 4);

	return (
		<>
			<Navbar activePage="home" />
			<HomeContent 
				openTrips={openTrips}
				privateTrips={privateTrips}
				allArticles={allArticles}
				galleryItems={galleryItems}
			/>
			<Footer />
			<WhatsAppFAB />
		</>
	);
}
