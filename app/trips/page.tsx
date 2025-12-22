import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFAB from "../components/WhatsAppFAB";
import TripsContent from "../components/TripsContent";
import { getTrips } from "../lib/db";

export const dynamic = 'force-dynamic';

export default async function TripsPage() {
	const trips = await getTrips();

	return (
		<>
			<Navbar activePage="trips" />
			<TripsContent trips={trips} />
			<Footer />
			<WhatsAppFAB />
		</>
	);
}
