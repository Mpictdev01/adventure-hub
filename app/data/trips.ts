export interface Trip {
	id: string;
	title: string;
	location: string;
	difficulty: "Easy" | "Medium" | "Hard";
	duration: string;
	price: string;
	imageUrl: string;
}

export const trips: Trip[] = [
	{
		id: "bromo-sunrise",
		title: "Mt. Bromo Sunrise",
		location: "East Java",
		difficulty: "Easy",
		duration: "3 Days",
		price: "IDR 1.2M",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk",
	},
	{
		id: "rinjani-summit",
		title: "Mt. Rinjani Summit",
		location: "Lombok",
		difficulty: "Hard",
		duration: "4 Days",
		price: "IDR 2.8M",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCK-Ezx_fs_F6TayRto0S_xdtpYmRIGXy09tOsBwNtzT_N9FYrB4963KgLxrK0ukYlVf3fxg9YY6-mj6Wiy1U-lGcqCAAQnMKXPTeOwxpOWBll2xHX3zTIHdYTTgpNNdFljjx9OTT-yC7tRhbflwWwFycZcGNTP93dGvTQirEJjWSoy03O2JeY3XdK0tmmSDqGZEkH4WbwGOLtAuW4-REalvrFERr8D89pklzWOYrCBuvqz4vAoYHQLFjpWUdY_67VrMHZ10WEf_vU",
	},
	{
		id: "kerinci-trek",
		title: "Mt. Kerinci Trek",
		location: "Sumatra",
		difficulty: "Medium",
		duration: "3 Days",
		price: "IDR 2.1M",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuCW-wvEymSwAeo-SNe0khrCjvuM0y4REzSNJ4Sh8SPjUvCw5djbcnWWL38rTlrwKPkQ2b_XXvBGbjS96Ysq9hyPmBPepnWKDFWU-oPfY252JzZ9cAgbspC0qs-T42o_YrzlvJ2922RKXHZROs8TQ09CTvLU1ouFXf-j2vJlxY5xwDsAi16fh-qn56BZS7ki9eHEvzMaTf9UcBxnyQb-nuSlli7jeK4m42wvqMNQq22JEYLYxs3eX3Q5bSsU6yXXs_241hHJeKCrG6k",
	},
	{
		id: "prau",
		title: "Mt. Prau",
		location: "Central Java",
		difficulty: "Easy",
		duration: "2 Days",
		price: "IDR 850K",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuAr8zpipOAqYxfrMrPCj7xTW0SrxONQyE-6Wv-ZYEb8AKJnO80CdvxAPAfswROSIgQxic-Wz6qqU-pgklucF8WA4jyqLLpBtlpMW5Qe1fo3zmadFYBwbzM4AijqvIChqqSCtx18F2yxMiBj_fHEs-vXuMMrSqkdFRNSRMfZuhZ0fUa6CizE-5DwZX1mRxQFJldwNsOzzqaW3QmDtVpQjH9c_kiiHeEuE4sN5iXI_DUXjru7zWJv61T_taQwJEtlu_4oNko0BqkbBxg",
	},
	{
		id: "semeru",
		title: "Mt. Semeru",
		location: "East Java",
		difficulty: "Hard",
		duration: "3 Days",
		price: "IDR 1.8M",
		imageUrl:
			"https://lh3.googleusercontent.com/aida-public/AB6AXuB8wCI9xFc-q5QZOmOOtHxtGtX9BTqtLdqNMcH78FyGrQJpvwKuxmvu7Z_QCSdiN-zdbR_x8O4KVxK0ETpYjbvgPFl0MplVCBYQtuHL5byRP1QRDThVSpow-s-SyC5ssJHdPAojgc79ggpgjsxEBM-FCCUDLZvMlK5vlUkEEDnosgU9dGZX2srkStcK1cuIus0vluohROmEP9xbDPxzUIMCuZ1v25RB4ZbF8cwTEKZKZ2zz1DM2OfirQ8hC6WQ6rdO0lAgOyklJvZk",
	},
];
