"use client";

import { useState } from "react";
import { Search, Star } from "lucide-react";
import BusinessCard from "./BusinessCard";
import FeaturedBusinessCarousel from "./FeaturedBusinessCarousel";

export default function BusinessDirectory({
  businesses,
}: {
  businesses: any[];
}) {
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const searchLower = search.toLowerCase();

  const filtered = businesses.filter((b) => {
    return (
      b.business_name.toLowerCase().includes(searchLower) ||
      b.category.toLowerCase().includes(searchLower) ||
      (b.tags || []).some((tag: string) =>
        tag.toLowerCase().includes(searchLower)
      )
    );
  });

  const featured = businesses.filter((b) => b.is_featured);
  const nonFeatured = filtered.filter((b) => !b.is_featured);
  const totalPages = Math.ceil(nonFeatured.length / ITEMS_PER_PAGE);
  const paginated = nonFeatured.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-12 overflow-x-auto whitespace-nowrap px-2 scroll-smooth w-full max-w-full">
      {/* Featured Businesses Section */}
      {featured.length > 0 && (
        <section className="w-full max-w-full">
          <div className="mb-6 flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white">
              <Star className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white relative">
              Featured Businesses
              <span className="absolute bottom-0 left-0 h-1 w-20 rounded bg-gradient-to-r from-blue-500 to-indigo-500"></span>
            </h2>
          </div>
          <div className="rounded-xl p-4">
            <FeaturedBusinessCarousel businesses={featured} />
          </div>
        </section>
      )}

      {/* Search Section */}
      <div className="relative w-full">
        <h2 className="relative mb-4 pb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Search Businesses
          <span className="absolute bottom-0 left-0 h-1 w-20 rounded bg-gradient-to-r from-blue-500 to-indigo-500"></span>
        </h2>

        {/* Input Wrapper */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, category, or tag..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* All Businesses Section */}
      <section>
        <h2 className="relative mb-6 pb-2 text-2xl font-bold text-gray-900 dark:text-white">
          All Businesses
          <span className="absolute bottom-0 left-0 h-1 w-20 rounded bg-gradient-to-r from-blue-500 to-indigo-500"></span>
        </h2>

        {paginated.length > 0 ? (
          <div className="space-y-6">
            {paginated.map((biz) => (
              <BusinessCard key={biz.id} business={biz} />
            ))}

            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white"
                >
                  Previous
                </button>
                <span className="text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-white"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
            <div className="mb-4 rounded-full bg-gray-100 p-3 dark:bg-gray-700">
              <Search className="h-6 w-6 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              No businesses found
            </h3>
            <p className="max-w-md text-gray-500 dark:text-gray-400">
              We couldn&apos;t find any businesses matching your search. Try
              adjusting your search terms or browse all businesses.
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
