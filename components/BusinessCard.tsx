/* eslint-disable @next/next/no-img-element */
import {
  CheckCircle2,
  MapPin,
  Tag,
  Phone,
  Mail,
  Clock,
  Globe,
  Facebook,
  Instagram,
  MapIcon,
} from "lucide-react";
import Link from "next/link";

export default function BusinessCard({ business }: { business: any }) {
  return (
    <div className="w-full overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-gray-900 dark:to-gray-950 rounded">
      <div className="p-0">
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Logo Section with Gradient Background */}
          <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:w-1/3 dark:from-gray-800 dark:to-gray-900">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-200 to-indigo-200 opacity-50 blur-md dark:from-blue-900 dark:to-indigo-900"></div>
              <img
                src={business.logo_url || "/placeholder.svg"}
                alt={`${business.business_name} logo`}
                className="relative h-32 w-32 rounded-full border-4 border-white object-contain p-2 shadow-md dark:border-gray-800"
              />
            </div>
            {/* {business.is_featured && (
              <div className="absolute right-4 top-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white">
                <Star className="mr-1 h-3 w-3" /> Featured
              </div>
            )} */}
          </div>

          {/* Business Info */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {business.business_name}
              </h2>
              {business.is_verified && (
                <span className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Verified
                </span>
              )}
            </div>

            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {business.description}
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <div className="px-4 py-1 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300 inline-block rounded">
                {business.category}
              </div>

              {business.has_discount && (
                <div className="px-4 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded">
                  🎉 {business.discount_details}
                </div>
              )}
            </div>

            {/* Contact & Location */}
            <div className="mb-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Phone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a
                  href={`tel:${business.phone}`}
                  className="text-gray-700 dark:text-gray-300"
                >
                  {business.phone}
                </a>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <a
                  href={`mailto:${business.email}`}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  {business.email}
                </a>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {business.city}, {business.state}
                </span>
              </div>

              {business.business_hours && (
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-2 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {business.business_hours}
                  </span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="mb-4 flex flex-wrap gap-2">
              {business.website && (
                <Link
                  href={business.website}
                  target="_blank"
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                >
                  <Globe className="h-3.5 w-3.5" /> Website
                </Link>
              )}

              {business.facebook_link && (
                <Link
                  href={business.facebook_link}
                  target="_blank"
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                >
                  <Facebook className="h-3.5 w-3.5" /> Facebook
                </Link>
              )}

              {business.instagram_link && (
                <Link
                  href={business.instagram_link}
                  target="_blank"
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                >
                  <Instagram className="h-3.5 w-3.5" /> Instagram
                </Link>
              )}

              {business.google_maps_link && (
                <Link
                  href={business.google_maps_link}
                  target="_blank"
                  className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                >
                  <MapIcon className="h-3.5 w-3.5" /> Map
                </Link>
              )}
            </div>

            {/* Tags */}
            {business.tags?.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1.5">
                {business.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <Tag className="h-3 w-3" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
