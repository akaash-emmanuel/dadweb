"use client";

import { useEffect, useState } from "react";

const promoBanners = [
  { id: 1, src: "/banners/ad-banner-1.jpg", alt: "Special CA/CS/CMA Coaching Batches", label: "Special CA/CS/CMA Batches" },
  { id: 2, src: "/banners/ad-banner-2.jpg", alt: "Student Mindset Workshops", label: "Student Mindset Workshops" },
  { id: 3, src: "/banners/ad-banner-3.jpg", alt: "Legal Career & Dispute Mentorship", label: "Legal Career & Dispute Mentorship" },
  { id: 4, src: "/banners/ad-banner-4.jpg", alt: "Concept-First Economics & Law", label: "Concept-First Economics & Law" },
];

export function PromoMarquee() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`w-full bg-[#ECEEDF] py-12 overflow-hidden border-y border-[#170C79]/10 relative z-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex w-max marquee whitespace-nowrap items-center gap-12">
        {/* Render multiple loops for a seamless infinite scroll effect */}
        {[...Array(3)].map((_, loopIdx) => (
          <div key={loopIdx} className="flex items-center gap-12 shrink-0 pr-12">
            {promoBanners.map((banner) => (
              <div 
                key={banner.id}
                className="relative w-[70vw] h-[45vw] max-h-[580px] min-h-[320px] shrink-0 border border-dashed border-[#170C79]/30 bg-[#170C79]/[0.02] rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 text-center hover:bg-[#170C79]/[0.04] transition-colors"
              >
                {/* Image element that overrides placeholder on successful load */}
                <img 
                  src={banner.src} 
                  alt={banner.alt} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 z-10"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                />
                
                {/* Fallback Placeholder Content */}
                <span className="text-xs font-mono uppercase tracking-widest text-[#170C79]/60 mb-2">Ad Banner {banner.id}</span>
                <h4 className="font-display text-lg md:text-2xl text-[#170C79] font-semibold px-6 whitespace-normal leading-snug max-w-lg">{banner.label}</h4>
                <p className="text-xs text-[#170C79]/40 mt-3 font-mono">[Save 70vw image to public{banner.src}]</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
