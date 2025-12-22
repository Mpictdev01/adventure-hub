export interface Article {
	id: number;
	title: string;
	excerpt: string;
	content: string; // Full content for the detail page
	category: string;
	date: string;
	img: string;
	isFeatured: boolean;
}

export const articles: Article[] = [
	{
		id: 1,
		title: "The Ultimate Guide to Hiking Mt. Rinjani",
		excerpt:
			"Discover the secrets of Lombok's majestic volcano. From packing tips to the best sunrise spots, here's everything you need to know.",
		content: `
			<p>Mount Rinjani, rising 3,726 meters above sea level, is not just a mountain; it's a pilgrimage for trekkers worldwide. Located on the island of Lombok, this active volcano offers one of the most spectacular trekking experiences in Southeast Asia.</p>
			
			<h3>Best Time to Trek</h3>
			<p>The best time to climb Mount Rinjani is during the dry season, from April to December. The trails are closed during the rainy season (January to March) for conservation and safety reasons.</p>

			<h3>What to Pack</h3>
			<ul>
				<li>Warm layers (temperatures can drop near freezing at the summit)</li>
				<li>Sturdy hiking boots</li>
				<li>Headlamp for the summit push</li>
				<li>Sun protection (hat, sunglasses, sunscreen)</li>
				<li>Plenty of water and high-energy snacks</li>
			</ul>

			<h3>The Route</h3>
			<p>Most trekkers choose the Sembalun route for the ascent, as it offers a higher starting point and easier terrain initially. The trek to the crater rim takes about 7-8 hours. The summit push usually starts at 2 AM the following morning to catch the sunrise.</p>
			
			<p>The view from the top is breathtaking, with the Segara Anak lake glistening in the caldera below and the Gili Islands visible in the distance.</p>
		`,
		category: "GUIDES",
		date: "Oct 12, 2024",
		img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCK-Ezx_fs_F6TayRto0S_xdtpYmRIGXy09tOsBwNtzT_N9FYrB4963KgLxrK0ukYlVf3fxg9YY6-mj6Wiy1U-lGcqCAAQnMKXPTeOwxpOWBll2xHX3zTIHdYTTgpNNdFljjx9OTT-yC7tRhbflwWwFycZcGNTP93dGvTQirEJjWSoy03O2JeY3XdK0tmmSDqGZEkH4WbwGOLtAuW4-REalvrFERr8D89pklzWOYrCBuvqz4vAoYHQLFjpWUdY_67VrMHZ10WEf_vU",
		isFeatured: true,
	},
	{
		id: 2,
		title: "5 Hidden Gems in East Java You Must Visit",
		excerpt: "Beyond Bromo and Ijen. Explore the untouched beauty of Java.",
		content: `
			<p>East Java is famous for Mount Bromo and Ijen Crater, but there is so much more to explore in this diverse province. Here are 5 hidden gems that deserve a spot on your itinerary.</p>

			<h3>1. Tumpak Sewu Waterfall</h3>
			<p>Often called "The Niagara of Indonesia," Tumpak Sewu is a massive curtain of waterfalls located in Lumajang. The trek down to the bottom is steep, but the view is absolutely worth it.</p>

			<h3>2. Madakaripura Waterfall</h3>
			<p>This towering waterfall is hidden within a deep canyon. Legend says it was the meditation spot of Gajah Mada, a famous Prime Minister of the Majapahit Empire.</p>

			<h3>3. Jodipan Colorful Village</h3>
			<p>Located in Malang, this former slum has been transformed into a vibrant tourist attraction, with houses painted in every color of the rainbow.</p>

			<h3>4. Baluran National Park</h3>
			<p>Known as "Little Africa in Java," Baluran features vast savannas where you can see wild bulls, deer, and peacocks roaming freely.</p>
			
			<h3>5. Red Island Beach (Pantai Pulau Merah)</h3>
			<p>A beautiful beach in Banyuwangi known for its reddish sand and a small island close to the shore. It's a great spot for surfing and watching the sunset.</p>
		`,
		category: "DISCOVERY",
		date: "Sep 28, 2024",
		img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk",
		isFeatured: false,
	},
	{
		id: 3,
		title: "Essential Gear for Tropical Trekking",
		excerpt: "Don't let the humidity catch you off guard. Pack smart.",
		content: `
			<p>Trekking in Indonesia's tropical climate presents unique challenges. High humidity, sudden rain showers, and intense sun require specific gear choices. Here is what you need to stay comfortable and safe.</p>

			<h3>Moisture-Wicking Clothing</h3>
			<p>Cotton is your enemy in the tropics. Choose synthetic fabrics or merino wool that wick sweat away from your body and dry quickly.</p>

			<h3>Rain Gear</h3>
			<p>Even in the dry season, rain is possible in the mountains. A lightweight, breathable rain jacket is essential. A poncho can also be a good backup for your backpack.</p>

			<h3>Hydration System</h3>
			<p>You will sweat—a lot. Carry at least 3 liters of water. A hydration bladder is convenient for drinking on the go without stopping.</p>
			
			<h3>Insect Repellent</h3>
			<p>Mosquitoes and leeches can be a nuisance in lower elevations. Bring a strong insect repellent with DEET or Picaridin.</p>
		`,
		category: "TIPS",
		date: "Sep 15, 2024",
		img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW-wvEymSwAeo-SNe0khrCjvuM0y4REzSNJ4Sh8SPjUvCw5djbcnWWL38rTlrwKPkQ2b_XXvBGbjS96Ysq9hyPmBPepnWKDFWU-oPfY252JzZ9cAgbspC0qs-T42o_YrzlvJ2922RKXHZROs8TQ09CTvLU1ouFXf-j2vJlxY5xwDsAi16fh-qn56BZS7ki9eHEvzMaTf9UcBxnyQb-nuSlli7jeK4m42wvqMNQq22JEYLYxs3eX3Q5bSsU6yXXs_241hHJeKCrG6k",
		isFeatured: false,
	},
	{
		id: 4,
		title: "Why You Should Join an Open Trip",
		excerpt: "Make new friends and share unforgettable memories.",
		content: `
			<p>Are you a solo traveler or a small group looking for an adventure? Joining an Open Trip might be the best decision you make. Here is why.</p>

			<h3>Cost-Effective</h3>
			<p>Sharing the cost of transportation, guides, and logistics with other travelers makes the trip significantly cheaper than a private tour.</p>

			<h3>Meet Like-Minded People</h3>
			<p>Open trips bring together nature lovers from different backgrounds. It's a fantastic way to make new friends who share your passion for adventure.</p>

			<h3>Hassle-Free</h3>
			<p>Everything is organized for you. Just show up at the meeting point with your gear, and we handle the rest—permits, meals, tents, and transport.</p>
			
			<h3>Safety in Numbers</h3>
			<p>Trekking in groups is generally safer. You have the support of fellow trekkers and professional guides to ensure everyone makes it back safely.</p>
		`,
		category: "COMMUNITY",
		date: "Aug 30, 2024",
		img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr8zpipOAqYxfrMrPCj7xTW0SrxONQyE-6Wv-ZYEb8AKJnO80CdvxAPAfswROSIgQxic-Wz6qqU-pgklucF8WA4jyqLLpBtlpMW5Qe1fo3zmadFYBwbzM4AijqvIChqqSCtx18F2yxMiBj_fHEs-vXuMMrSqkdFRNSRMfZuhZ0fUa6CizE-5DwZX1mRxQFJldwNsOzzqaW3QmDtVpQjH9c_kiiHeEuE4sN5iXI_DUXjru7zWJv61T_taQwJEtlu_4oNko0BqkbBxg",
		isFeatured: false,
	},
];

export function getArticleById(id: number): Article | undefined {
	return articles.find((article) => article.id === id);
}
