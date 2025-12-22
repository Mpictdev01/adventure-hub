"use client";

import { useState } from "react";

export default function WhatsAppFAB() {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<a
			href="https://wa.me/"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chat on WhatsApp"
			className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center group"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			<span className="material-symbols-outlined text-3xl">chat</span>
			<span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
				Chat with us
			</span>
		</a>
	);
}
