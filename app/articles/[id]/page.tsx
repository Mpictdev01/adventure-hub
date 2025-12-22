"use client";
import React, { use } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppFAB from "../../components/WhatsAppFAB";
import { getArticleById } from "../../data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function ArticlePreview({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = use(params);
	const articleId = parseInt(resolvedParams.id);
	const article = getArticleById(articleId);
	const { t } = useLanguage();

	if (!article) {
		notFound();
	}

	return (
		<>
			<Navbar activePage="articles" />
			<div className="bg-background min-h-screen pt-20">
				{/* Article Header */}
				<header className="relative w-full h-[60vh] max-h-[600px] min-h-[400px]">
					<div className="absolute inset-0">
						<img
							src={article.img}
							alt={article.title}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
					</div>
					<div className="absolute bottom-0 left-0 w-full p-4 md:p-10 container mx-auto max-w-[1000px]">
						<div className="flex flex-wrap items-center gap-3 mb-4">
							<span className="px-3 py-1 bg-primary text-background text-sm font-bold rounded-full tracking-wider uppercase">
								{article.category}
							</span>
							<span className="text-text-secondary text-sm font-medium flex items-center gap-1">
								<span className="w-1.5 h-1.5 rounded-full bg-text-secondary"></span>
								{article.date}
							</span>
						</div>
						<h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">
							{article.title}
						</h1>
					</div>
				</header>

				{/* Article Content */}
				<main className="container mx-auto px-4 md:px-10 max-w-[800px] py-12">
					<div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-text-main prose-p:text-text-secondary prose-strong:text-text-main prose-a:text-primary hover:prose-a:text-green-400">
						{/* Render HTML content safely since it's from our own file */}
						<div dangerouslySetInnerHTML={{ __html: article.content }} />
					</div>

					{/* Navigation back */}
					<div className="mt-16 pt-8 border-t border-border">
						<Link
							href="/#articles"
							className="inline-flex items-center gap-2 text-text-main hover:text-primary font-bold transition-colors">
							<span className="material-symbols-outlined">arrow_back</span>
							{t("navbar.articles")}
						</Link>
					</div>
				</main>
			</div>
			<Footer />
			<WhatsAppFAB />
		</>
	);
}
