import Image from 'next/image';
import { MapPin, Bed, Bath, Square, Car, ArrowRight } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bhk: string | null;
  area: string;
  bathrooms: number;
  parking: number | null;
  type: string;
  status: string;
  image: string;
  badges: string[];
  description: string;
}

export function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group bg-white border border-border-color overflow-hidden transition-all duration-300 flex flex-col h-full hover:border-gold-accent/40">
      <div className="relative aspect-[4/3] overflow-hidden w-full bg-light-navy">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        
        {/* Price label - top left, integrated with image */}
        <div className="absolute top-0 left-0 bg-primary-navy px-4 py-2">
          <span className="text-gold-accent text-sm sm:text-base font-bold tracking-wide">
            {property.price}
          </span>
        </div>

        {/* Type tag - top right */}
        <div className="absolute top-0 right-0 bg-gold-accent px-3 py-2">
          <span className="text-primary-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
            {property.type}
          </span>
        </div>
      </div>
      
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-bold text-base sm:text-lg text-primary-navy leading-tight mb-1">
            {property.title}
          </h3>
          <div className="flex items-center text-secondary-text text-xs sm:text-sm">
            <MapPin className="w-3.5 h-3.5 mr-1 text-gold-accent flex-shrink-0" />
            <span>{property.location}, East of Kailash</span>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-secondary-text mb-4 line-clamp-2 leading-relaxed">
          {property.description}
        </p>
        
        {/* Spec table with vertical dividers */}
        <div className="flex items-stretch border-y border-border-color mt-auto">
          {property.bhk && (
            <div className="flex-1 basis-0 min-w-0 py-3 px-1 text-center border-r border-border-color last:border-r-0">
              <div className="flex items-center justify-center gap-1 text-secondary-text mb-1">
                <Bed className="w-3 h-3 shrink-0" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider">BHK</span>
              </div>
              <span className="text-sm font-bold text-primary-navy whitespace-nowrap">{property.bhk.replace(' BHK', '')}</span>
            </div>
          )}
          <div className="flex-1 basis-0 min-w-0 py-3 px-1 text-center border-r border-border-color last:border-r-0">
            <div className="flex items-center justify-center gap-1 text-secondary-text mb-1">
              <Square className="w-3 h-3 shrink-0" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider whitespace-nowrap">Sqft</span>
            </div>
            <span className="text-sm font-bold text-primary-navy whitespace-nowrap">{property.area.replace(' sq.ft.', '')}</span>
          </div>
          <div className="flex-1 basis-0 min-w-0 py-3 px-1 text-center border-r border-border-color last:border-r-0">
            <div className="flex items-center justify-center gap-1 text-secondary-text mb-1">
              <Bath className="w-3 h-3 shrink-0" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider">Baths</span>
            </div>
            <span className="text-sm font-bold text-primary-navy whitespace-nowrap">{property.bathrooms}</span>
          </div>
          {property.parking !== null && (
            <div className="flex-1 basis-0 min-w-0 py-3 px-1 text-center">
              <div className="flex items-center justify-center gap-1 text-secondary-text mb-1">
                <Car className="w-3 h-3 shrink-0" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider">Park</span>
              </div>
              <span className="text-sm font-bold text-primary-navy whitespace-nowrap">{property.parking}</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <button className="w-full flex items-center justify-center gap-2 bg-primary-navy hover:bg-gold-accent text-white hover:text-primary-navy py-3 text-sm font-semibold transition-all duration-300 uppercase tracking-wider">
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
