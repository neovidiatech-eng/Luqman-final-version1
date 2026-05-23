'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Maximize2, BedDouble, Bath, Tag, CreditCard } from 'lucide-react';
import type { Property } from '../data/properties';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyPlaceholder = () => (
  <div className="w-full h-full gradient-primary flex items-center justify-center relative overflow-hidden">
    {/* Decorative shapes */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white rounded-full" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white rotate-45" />
    </div>
    <svg viewBox="0 0 120 80" fill="none" className="w-24 h-16 opacity-40">
      <path d="M60 10L20 40v30h20V50h20v20h20V40L60 10z" fill="white"/>
      <path d="M85 15c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#C19F42" strokeWidth="2.5" fill="none"/>
      <circle cx="93" cy="18" r="4" fill="#C19F42"/>
      <rect x="5" y="65" width="110" height="5" rx="2.5" fill="white" fillOpacity="0.3"/>
    </svg>
  </div>
);

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const coverImage = property.images?.[0] || '';
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(3,76,43,0.08)] hover:shadow-[0_20px_60px_rgba(3,76,43,0.16)] transition-shadow duration-300 group"
    >
      {/* Image */}
      <Link href={`/properties/${property.slug}`} className="relative h-52 overflow-hidden block">
        {coverImage ? (
          <img src={coverImage} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <PropertyPlaceholder />
        )}
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            property.status === 'متاح' ? 'bg-emerald-500 text-white' :
            property.status === 'محجوز' ? 'bg-amber-500 text-white' :
            'bg-red-500 text-white'
          }`}>
            {property.status}
          </span>
          {property.isNew && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary text-white">
              جديد
            </span>
          )}
          {property.financeAvailable && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold text-white flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              تمويل متاح
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/properties/${property.slug}`}>
          <h3 className="font-bold text-base text-primary-dark mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          <span className="line-clamp-1">{property.district}، {property.city}</span>
        </div>

        {/* Stats */}
        {property.rooms > 0 ? (
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4 text-primary" />
              <span>{property.rooms} غرف</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-primary" />
              <span>{property.bathrooms} حمام</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="w-4 h-4 text-primary" />
              <span>{property.area} م²</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Maximize2 className="w-4 h-4 text-primary" />
              <span>{property.area} م²</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4 text-primary" />
              <span>{property.type}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">السعر</p>
            <p className="text-lg font-extrabold text-primary">
              {property.price.toLocaleString('ar-SA')} ريال
            </p>
          </div>
          <Link
            href={`/properties/${property.slug}`}
            className="btn-primary text-sm font-bold px-4 py-2 rounded-xl"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
