import { Suspense } from "react";
import BusinessDirectoryPage from "@/components/business";
import TablePlaceholder from "@/components/table-placeholder";
import Table from "@/components/table";

export const preferredRegion = "home";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-gray-300 px-4 dark:from-gray-800 dark:to-gray-700">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-50/40 to-indigo-50/40 blur-3xl dark:from-blue-950/10 dark:to-indigo-950/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="mt-12 mb-12 text-center">
          <h1 className="relative mb-3 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 bg-clip-text pb-1 text-5xl font-bold tracking-tight text-transparent md:text-7xl dark:from-white dark:via-gray-300 dark:to-gray-500">
            Kingdom Masterminds
            <span className="absolute -bottom-1 left-0 right-0 mx-auto h-1 w-24 rounded bg-gradient-to-r from-blue-500 to-indigo-500"></span>
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Discover and connect with trusted businesses in your community
          </p>
        </div>

        {/* Directory content with loading state */}
        <div className="relative w-full rounded-xl p-2 sm:p-4">
          <Suspense fallback={<TablePlaceholder />}>
            <BusinessDirectoryPage />
          </Suspense>
        </div>

        {/* Footer */}
        <div className="mb-12 mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Kingdom Business Directory. All rights
            reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
