import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface NumberCardProps {
  number: string;
  title: string;
  description: string;
  image?: string;
  href: string;
  className?: string;
}

export function NumberCard({ number, title, description, image, href, className = "" }: NumberCardProps) {
  return (
    <Link href={href} className={`relative block w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden group metal-shadow metal-shadow-hover ${className}`}>
      {/* Photo layer */}
      <div className="absolute inset-0 bg-ink-950">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90"
          />
        )}
      </div>

      {/* Content overlay */}
      <div className="relative h-full flex flex-col z-10">
        {/* Copper Metal Header Strip */}
        <div className="bg-copper-brushed pb-8 pt-6 px-6 shadow-sm">
           <div className="flex items-center gap-4">
             <span className="text-5xl font-black text-[#1e0004] font-sans tracking-tighter drop-shadow-sm">{number}</span>
             <h3 className="text-xl font-bold text-[#1e0004] font-vazir drop-shadow-sm line-clamp-2">{title}</h3>
           </div>
        </div>

        {/* Gradient fade to photo */}
        <div className="h-24 bg-gradient-to-b from-[#cca699]/80 via-[#cca699]/20 to-transparent" />

        <div className="flex-grow" />

        {/* Bottom Content */}
        <div className="p-6 bg-gradient-to-t from-[#0a0002] via-[#0a0002]/90 to-transparent pt-12">
           <p className="text-steel-200 text-sm leading-relaxed line-clamp-3 mb-4">
             {description}
           </p>
           <div className="flex items-center text-signal-500 font-bold text-sm gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
             <span>مشاهده جزئیات</span>
             <ArrowLeft className="w-4 h-4" />
           </div>
        </div>
      </div>
      
      {/* Sheen sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#cca699]/40 to-transparent -translate-x-[150%] skew-x-[-25deg] group-hover:animate-metal-sweep" />
      </div>
    </Link>
  );
}
