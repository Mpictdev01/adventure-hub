"use client";

import TripCard from "./TripCard";
import { useLanguage } from "../context/LanguageContext";
import { Trip } from "../lib/db";

interface TripsContentProps {
  trips: Trip[];
}

export default function TripsContent({ trips }: TripsContentProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Header Hero */}
      <div className="w-full bg-background-dark">
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6">
          <div
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[220px] md:min-h-[280px] relative group"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(17, 23, 20, 0.8) 0%, rgba(17, 23, 20, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBK0LJSlAADy6_CRxNyQIR4WqLZaP8tR2F2QOqUxYTdE0F5aJmM34yyXggM9vRtwjd5KlbHeoavDIl-gFFw0fVD5723fs9sPqlrRbJo3lODlnoFzn4EKzv90GuHh4fUuRXSB-_Ihv_CBGMq8o6IZgbXb6R26ppQvD4oyIGtp61Jx_Nzyip3JidWDMqefaLzAhDWNo1fyY3q7TZ9fXAC80fZG0F4DoLTFwOST6uaLGaRpbArnB99edclO7YeorRNO_1Lo1ekU6xAwmk")`,
            }}>
            <div className="flex flex-col p-6 md:p-10 z-10">
              <h1 className="text-white tracking-light text-3xl md:text-5xl font-bold leading-tight mb-2">
                {t("trips.title")}
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl">
                {t("trips.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar (Filters) */}
        <aside className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center bg-surface-dark p-4 rounded-lg border border-border-dark">
            <span className="font-bold">{t("trips.filters")}</span>
            <span className="material-symbols-outlined">filter_list</span>
          </div>

          {/* Desktop Filter Content */}
          <div className="hidden lg:flex flex-col gap-6">
            {/* Search within filters */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-white">
                {t("trips.searchDestination")}
              </label>
              <div className="flex w-full items-stretch rounded-lg">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-1 focus:ring-primary border border-border-dark bg-surface-dark h-11 placeholder:text-text-secondary px-3 text-sm font-normal leading-normal"
                  placeholder={t("trips.searchPlaceholder")}
                />
              </div>
            </div>

            {/* Action Panel */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="text-white text-base font-bold leading-tight">
                  {t("trips.filters")}
                </p>
              </div>
              <button className="text-primary text-sm font-medium hover:underline">
                {t("trips.clearAll")}
              </button>
            </div>

            {/* Accordions */}
            <div className="flex flex-col gap-3">
              {/* Trip Type */}
              <details
                className="group rounded-lg bg-surface-dark border border-border-dark"
                open>
                <summary className="flex cursor-pointer items-center justify-between gap-6 px-4 py-3 select-none">
                  <p className="text-white text-sm font-bold">{t("trips.tripType")}</p>
                  <span className="material-symbols-outlined text-white group-open:rotate-180 transition-transform text-[20px]">
                    expand_more
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group/item">
                    <input
                      className="form-checkbox rounded border-border-dark bg-border-dark text-primary focus:ring-0 focus:ring-offset-0 size-4"
                      type="checkbox"
                    />
                    <span className="text-text-secondary text-sm group-hover/item:text-white transition-colors">
                      {t("trips.openTrip")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group/item">
                    <input
                      className="form-checkbox rounded border-border-dark bg-border-dark text-primary focus:ring-0 focus:ring-offset-0 size-4"
                      type="checkbox"
                    />
                    <span className="text-text-secondary text-sm group-hover/item:text-white transition-colors">
                      {t("trips.privateTrip")}
                    </span>
                  </label>
                </div>
              </details>

              {/* Difficulty Level */}
              <details
                className="group rounded-lg bg-surface-dark border border-border-dark"
                open>
                <summary className="flex cursor-pointer items-center justify-between gap-6 px-4 py-3 select-none">
                  <p className="text-white text-sm font-bold">
                    {t("trips.difficulty")}
                  </p>
                  <span className="material-symbols-outlined text-white group-open:rotate-180 transition-transform text-[20px]">
                    expand_more
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group/item">
                    <input
                      className="form-checkbox rounded border-border-dark bg-border-dark text-primary focus:ring-0 focus:ring-offset-0 size-4"
                      type="checkbox"
                    />
                    <span className="text-text-secondary text-sm group-hover/item:text-white transition-colors">
                      {t("trips.easy")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group/item">
                    <input
                      className="form-checkbox rounded border-border-dark bg-border-dark text-primary focus:ring-0 focus:ring-offset-0 size-4"
                      type="checkbox"
                    />
                    <span className="text-text-secondary text-sm group-hover/item:text-white transition-colors">
                      {t("trips.medium")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group/item">
                    <input
                      className="form-checkbox rounded border-border-dark bg-border-dark text-primary focus:ring-0 focus:ring-offset-0 size-4"
                      type="checkbox"
                    />
                    <span className="text-text-secondary text-sm group-hover/item:text-white transition-colors">
                      {t("trips.hard")}
                    </span>
                  </label>
                </div>
              </details>
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-3 p-4 rounded-lg border border-border-dark bg-surface-dark">
              <p className="text-white text-sm font-bold">{t("trips.priceRange")}</p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-text-secondary text-xs">
                    IDR
                  </span>
                  <input
                    className="w-full bg-border-dark border-none rounded text-white text-sm pl-10 py-2 focus:ring-1 focus:ring-primary"
                    placeholder="Min"
                    type="text"
                  />
                </div>
                <span className="text-text-secondary">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-text-secondary text-xs">
                    IDR
                  </span>
                  <input
                    className="w-full bg-border-dark border-none rounded text-white text-sm pl-10 py-2 focus:ring-1 focus:ring-primary"
                    placeholder="Max"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content (Grid) */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Sorting / Results Count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-white text-base font-medium">
              <span className="font-bold">{trips.length}</span> {t("trips.tripsFound")}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary text-sm">{t("trips.sortBy")}</span>
              <select className="bg-surface-dark border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary p-2">
                <option>{t("trips.recommended")}</option>
                <option>{t("trips.priceLowHigh")}</option>
                <option>{t("trips.priceHighLow")}</option>
                <option>{t("trips.duration")}</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <TripCard key={trip.id} {...trip} />
              ))
            ) : (
              <p className="text-text-secondary col-span-3 text-center py-8">{t("trips.noTrips")}</p>
            )}
          </div>

          {/* Pagination */}
          {trips.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <button className="size-10 flex items-center justify-center rounded-lg border border-border-dark text-text-secondary hover:text-white hover:bg-border-dark">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-background-dark font-bold">
                  1
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg border border-border-dark text-text-secondary hover:text-white hover:bg-border-dark">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
