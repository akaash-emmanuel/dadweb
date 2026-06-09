"use client";

import { useEffect, useState, useRef } from "react";
import { Check, Play, X } from "lucide-react";
import Link from "next/link";

interface Video {
  id: string;
  youtubeUrl: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
}

const DEFAULT_VIDEOS: Video[] = [
  {
    id: "default-1",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
  },
  {
    id: "default-2",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
  }
];

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getThumbnail(video: Video) {
  if (video.thumbnailUrl && video.thumbnailUrl.trim() !== "") {
    return video.thumbnailUrl;
  }
  const videoId = getYouTubeId(video.youtubeUrl);
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60";
}

export function CoachingSection() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // YouTube videos list
  const videos = DEFAULT_VIDEOS;
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Counter logic
  const [counts, setCounts] = useState({ students: 0, priority: 0 });

  useEffect(() => {
    setMounted(true);

    // Intersection observer for section animations & counters
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate counters
          const duration = 2000;
          const startTime = performance.now();
          const animate = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts({
              students: Math.floor(eased * 15000),
              priority: Math.floor(eased * 100),
            });
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeVideo = videos.find(v => v.id === activeVideoId);
  const embedId = activeVideo ? getYouTubeId(activeVideo.youtubeUrl) : null;

  return (
    <section
      id="coaching"
      ref={sectionRef}
      className="theme-flipped relative py-24 lg:py-32 overflow-hidden bg-background text-foreground"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Empower
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Professional Coaching
            <br />
            <span className="text-muted-foreground">and Academic Excellence.</span>
          </h2>
        </div>

        {/* Classes Grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12 mb-36">
          {[
            { id: "ca", title: "Chartered Accountancy (CA)", items: ["Business Laws.", "Strategic Managment.", "Securities Laws and Economic Laws", "Corporate and Other Laws"] },
            { id: "cma", title: "Cost & Management Accounting (CMA)", items: ["Business Laws", "⁠Business Economics", "⁠Strategic Management", "Corporate and Economic Laws"] },
            { id: "cs", title: "Company Secretary (CS)", items: ["Business Laws", "Business Economics", "Jurisprudence, Interpretation & General Laws (JIGL)", "Company Law & Practice", "Setting Up of Business, Industrial & Labour Laws", "Capital Market & Securities Laws", "Economic, Commercial & Intellectual Property Laws"] }
          ].map((course, i) => (
            <Link
              key={course.title}
              href={`/register?course=${course.id}`}
              className={`relative p-8 lg:p-10 rounded-3xl border border-border/40 bg-card/60 backdrop-blur-sm shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-primary/40 flex flex-col justify-start group cursor-pointer ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Card top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/80 to-primary rounded-t-3xl" />
              
              <div>
                <h3 className="font-display text-2xl lg:text-3xl text-foreground mb-6 font-semibold tracking-tight leading-snug">
                  {course.title}
                </h3>
                
                <ul className="space-y-4">
                  {course.items.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-base text-foreground/80 leading-relaxed font-sans">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

        {/* Metrics and Video Section */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* Metrics Column (Col-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div className="space-y-8">
              <h3 className="font-display text-3xl text-foreground">Coaching Impact</h3>
              <p className="text-muted-foreground leading-relaxed">
                [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border/20">
              <div className="space-y-2">
                <span className="text-4xl lg:text-5xl font-display text-foreground tracking-tight">
                  {mounted ? counts.students.toLocaleString() : "0"}+
                </span>
                <span className="block text-sm text-muted-foreground">Students Empowered</span>
              </div>
              <div className="space-y-2">
                <span className="text-4xl lg:text-5xl font-display text-foreground tracking-tight">
                  {mounted ? counts.priority : "0"}%
                </span>
                <span className="block text-sm text-muted-foreground">Conceptual Priority</span>
              </div>
            </div>
          </div>

          {/* YouTube Video Column (Col-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display text-3xl text-foreground flex items-center justify-between">
                <span>Featured Lectures</span>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  Explore Channel →
                </a>
              </h3>

              <div className="grid sm:grid-cols-2 gap-6">
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideoId(vid.id)}
                    className="group cursor-pointer border border-border/20 bg-card overflow-hidden transition-all duration-300 hover-lift flex flex-col"
                  >
                    {/* Video Thumbnail area */}
                    <div className="relative aspect-video w-full bg-black/10 overflow-hidden flex items-center justify-center">
                      <img
                        src={getThumbnail(vid)}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-60 group-hover:opacity-20 transition-opacity" />
                      <div className="absolute w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-primary ml-0.5" />
                      </div>
                    </div>

                    {/* Video Text */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display text-lg text-foreground mb-2 line-clamp-1">{vid.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{vid.description}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                        <span>Watch Video</span>
                        <span>YouTube →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>



      {/* POPUP YOUTUBE PLAYER MODAL */}
      {activeVideoId && embedId && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-4 right-4 z-10 text-white hover:text-white/80 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
              title="Close player"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
              title={activeVideo?.title || "YouTube Player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

    </section>
  );
}
