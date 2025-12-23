"use client";

import Link from "next/link";
import TripCard from "./TripCard";
import { useLanguage } from "../context/LanguageContext";
import { Trip, Article, GalleryItem } from "../lib/db";

interface HomeContentProps {
  openTrips: Trip[];
  privateTrips: Trip[];
  allArticles: Article[];
  galleryItems: GalleryItem[];
  heroBgUrl?: string;
}

export default function HomeContent({ openTrips, privateTrips, allArticles, galleryItems, heroBgUrl }: HomeContentProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero Section with Search Widget */}
      <div className="relative w-full min-h-[600px] md:min-h-[700px] flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Dramatic mountain peaks piercing through clouds at sunset"
            className="w-full h-full object-cover"
            src={heroBgUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCLKHHweBA6LhzgFj4VzgDepwFcU5pErPdxtySiTgeKVzT6shZUq3GxqQudczMrN3sQJ16SXp4A_dvgDnbPdEyWXJOYca4s0uvcFvkQWfYQVCEIcWlnpan8CAhZnWgiFKwfFQUZTvNuqBBxsdjcbTxVfkM_w-fE08yQZ5ztZapsVF8L-wIIcrPZlkk3I2cGPf2mFgKkGhuJoH8lVFSNAX9Jt9qLXzdGQ_JBQxMIJ82mdtHFmb_m4LMV0rp8RiLS0GvVCDIwGOOrDb4"}
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-10 flex flex-col items-center gap-10 pt-20">
          {/* Hero Text */}
          <div className="text-center max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-lg">
              {t("home.hero.title")}
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-normal max-w-2xl mx-auto drop-shadow-md">
              {t("home.hero.subtitle")}
            </p>
          </div>

          {/* Search Widget */}
          <div className="w-full max-w-5xl bg-surface/80 backdrop-blur-xl border border-border p-4 md:p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
            {/* Trip Type Toggle */}
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex h-10 items-center justify-center rounded-lg bg-surface-darker border border-border p-1">
                <Link
                  href="/trips?type=Open+Trip"
                  className="flex cursor-pointer h-full items-center justify-center rounded px-4 bg-border text-text-main transition-all">
                  <span className="text-sm font-medium">{t("home.search.openTrip")}</span>
                </Link>
                <Link
                  href="/trips?type=Private+Trip"
                  className="flex cursor-pointer h-full items-center justify-center rounded px-4 text-text-secondary transition-all hover:bg-border/50">
                  <span className="text-sm font-medium">{t("home.search.privateTrip")}</span>
                </Link>
              </div>
            </div>

            {/* Inputs Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Destination Input */}
              <div className="md:col-span-5 relative group z-50">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  <span className="material-symbols-outlined">landscape</span>
                </div>
                <input
                  className="w-full h-14 bg-surface-darker border border-border rounded-xl pl-12 pr-4 text-text-main placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder={t("home.search.destinationPlaceholder")}
                  type="text"
                />
              </div>

              {/* Date Input */}
              <div className="md:col-span-4 relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                  <span className="material-symbols-outlined">calendar_month</span>
                </div>
                <input
                  className="w-full h-14 bg-surface-darker border border-border rounded-xl pl-12 pr-4 text-text-main placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  placeholder={t("home.search.datePlaceholder")}
                  type="text"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-3">
                <Link
                  href="/trips"
                  className="w-full h-14 bg-primary hover:bg-green-600 text-background font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined">search</span>
                  <span>{t("home.search.button")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="bg-background w-full">
        {/* Features / Why Choose Us */}
        <section className="py-16 md:py-24 border-b border-border bg-surface-darker">
          <div className="container mx-auto px-4 md:px-10 max-w-[1280px]">
            <div className="text-center mb-12">
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-2">
                {t("home.whyChooseUs.title")}
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-text-main">
                {t("home.whyChooseUs.heading")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">verified_user</span>
                </div>
                <h4 className="text-xl font-bold text-text-main mb-2">
                  {t("home.whyChooseUs.certified.title")}
                </h4>
                <p className="text-text-secondary">
                  {t("home.whyChooseUs.certified.desc")}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">medical_services</span>
                </div>
                <h4 className="text-xl font-bold text-text-main mb-2">
                  {t("home.whyChooseUs.safety.title")}
                </h4>
                <p className="text-text-secondary">
                  {t("home.whyChooseUs.safety.desc")}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">payments</span>
                </div>
                <h4 className="text-xl font-bold text-text-main mb-2">
                  {t("home.whyChooseUs.payment.title")}
                </h4>
                <p className="text-text-secondary">
                  {t("home.whyChooseUs.payment.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Open Trips & Private Trips */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-10 max-w-[1280px]">
            {/* Header Open Trips */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-2">
                  {t("home.upcoming.title")}
                </h2>
                <p className="text-text-secondary">
                  {t("home.upcoming.subtitle")}
                </p>
              </div>
              <a
                className="text-primary font-bold hover:underline flex items-center gap-1"
                href="/trips?type=Open+Trip">
                {t("home.upcoming.viewAll")}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Open Trips Grid/Scroll */}
            <div className="mb-16">
              <div className="flex overflow-x-auto snap-x no-scrollbar md:grid md:grid-cols-4 gap-6 pb-6 md:pb-0">
                {openTrips.length > 0 ? (
                  openTrips.map((trip) => (
                    <div key={trip.id} className="snap-start shrink-0 w-[280px] md:w-auto">
                      <TripCard {...trip} />
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary col-span-4 text-center py-8">No open trips available yet.</p>
                )}
              </div>
            </div>

            {/* Header Private Trips */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-t border-border pt-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-2">
                  {t("home.upcoming.titlePrivate")}
                </h2>
                <p className="text-text-secondary">
                  Exclusive trips for you and your group.
                </p>
              </div>
              <a
                className="text-primary font-bold hover:underline flex items-center gap-1"
                href="/trips?type=Private+Trip">
                {t("home.upcoming.viewAll")}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>

            {/* Private Trips Grid/Scroll */}
            <div className="">
              <div className="flex overflow-x-auto snap-x no-scrollbar md:grid md:grid-cols-4 gap-6 pb-6 md:pb-0">
                {privateTrips.length > 0 ? (
                  privateTrips.map((trip) => (
                    <div key={trip.id} className="snap-start shrink-0 w-[280px] md:w-auto">
                      <TripCard {...trip} />
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary col-span-4 text-center py-8">No private trips available yet.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 md:py-24 border-t border-border bg-surface-darker">
          <div className="container mx-auto px-4 md:px-10 max-w-[1280px]">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-2">
                  {t("home.gallery.title")}
                </h2>
                <p className="text-text-secondary">
                  {t("home.gallery.subtitle")}
                </p>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
              {galleryItems.length > 0 ? (
                galleryItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative group rounded-2xl overflow-hidden cursor-pointer ${
                      index === 0 ? "md:row-span-2 md:col-span-1" :
                      index === 2 ? "col-span-2 md:col-span-2" :
                      "col-span-1 md:col-span-1"
                    }`}>
                    <img
                      src={item.url}
                      alt={item.caption || item.location || 'Gallery image'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
                      <h4 className="text-lg font-bold text-white mb-1">{item.location}</h4>
                      <p className="text-white/80 text-sm">{item.activities}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-text-secondary col-span-4 text-center py-8">No gallery items available yet.</p>
              )}
            </div>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="py-24 border-t border-border bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="container mx-auto px-4 md:px-10 max-w-[1280px] relative z-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-sm font-bold tracking-[0.2em] text-primary mb-2 uppercase">
                  {t("home.articles.subtitle")}
                </h2>
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl md:text-5xl font-black text-text-main tracking-tight">
                    {t("home.articles.title")}
                  </h3>
                  <div className="h-px bg-border flex-1 ml-4 hidden md:block w-32"></div>
                </div>
              </div>
              <a
                href="/articles"
                className="hidden md:flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-medium text-sm group">
                {t("home.articles.viewAll")}
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Featured Article */}
              <div className="lg:col-span-7 flex flex-col h-full">
                {allArticles
                  .filter((a) => a.isFeatured)
                  .slice(0, 1)
                  .map((article) => (
                    <Link
                      href={`/articles/${article.id}`}
                      key={article.id}
                      className="group relative h-full min-h-[400px] rounded-3xl overflow-hidden border border-border bg-surface-darker/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_-10px_rgba(25,179,102,0.3)] block">
                      <div className="absolute inset-0">
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-primary text-background text-xs font-bold rounded-full tracking-wider">
                            {article.category}
                          </span>
                          <span className="text-text-secondary text-xs font-medium flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-text-secondary"></span>
                            {article.date}
                          </span>
                        </div>

                        <h4 className="text-2xl md:text-4xl font-bold text-white leading-tight group-hover:text-primary transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-gray-300 text-sm md:text-base line-clamp-2 max-w-xl">
                          {article.excerpt}
                        </p>

                        <div className="pt-4">
                          <span className="inline-flex items-center gap-2 text-white font-bold text-sm border-b border-primary pb-1 group-hover:gap-4 transition-all">
                            {t("home.articles.readMore")}
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>

              {/* Side List */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {allArticles
                  .filter((a) => !a.isFeatured)
                  .slice(0, 3)
                  .map((article) => (
                    <Link
                      href={`/articles/${article.id}`}
                      key={article.id}
                      className="group flex gap-4 p-4 rounded-2xl bg-surface/30 backdrop-blur-sm border border-border hover:bg-surface-darker hover:border-primary/30 transition-all cursor-pointer">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={article.img}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <span className="text-xs font-bold text-primary tracking-wider">
                          {article.category}
                        </span>
                        <h5 className="font-bold text-text-main leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h5>
                        <span className="text-xs text-text-secondary">{article.date}</span>
                      </div>
                    </Link>
                  ))}
                
                <a
                  href="/articles"
                  className="mt-4 md:hidden flex justify-center items-center gap-2 w-full py-4 rounded-xl border border-border text-text-main font-bold hover:bg-surface-darker transition-colors">
                  {t("home.articles.viewAll")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
