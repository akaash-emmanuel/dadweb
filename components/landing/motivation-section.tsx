"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Sparkles, Brain, Compass, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const challenges = [
  {
    id: "clarity",
    icon: Compass,
    selectorText: "Unclear Career Goals",
    title: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    subtitle: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    youtubeUrl: "https://youtube.com",
    quote: "\"[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]\"",
    tag: "Mindset Workshop"
  },
  {
    id: "anxiety",
    icon: Brain,
    selectorText: "Exam & Stress Anxiety",
    title: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    subtitle: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    youtubeUrl: "https://youtube.com",
    quote: "\"[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]\"",
    tag: "Mental Strength"
  },
  {
    id: "focus",
    icon: Users,
    selectorText: "Lack of Focus / Distractions",
    title: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    subtitle: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    youtubeUrl: "https://youtube.com",
    quote: "\"[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]\"",
    tag: "Focus Workshops"
  }
];

export function MotivationSection() {
  const [activeChallengeId, setActiveChallengeId] = useState(challenges[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeChallenge = challenges.find((c) => c.id === activeChallengeId)!;

  return (
    <section
      id="motivation"
      ref={sectionRef}
      className="theme-flipped relative py-24 lg:py-32 overflow-hidden bg-background text-foreground"
    >
      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 60px,
            currentColor 60px,
            currentColor 61px
          )`
        }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="mb-16 lg:mb-24 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Motivate
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Mindset Transformation
            <br />
            <span className="text-muted-foreground">and Motivation .</span>
          </h2>
        </div>

        {/* Diagnostic Selector Panel */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Selectors Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
              Select an educational challenge:
            </span>

            {challenges.map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveChallengeId(c.id)}
                  className={`w-full text-left p-6 border rounded-xl flex items-center gap-4 transition-all duration-300 ${activeChallengeId === c.id
                    ? "bg-card text-foreground border-foreground shadow-lg scale-[1.02]"
                    : "border-border/20 text-muted-foreground hover:border-border/50 hover:bg-foreground/[0.02]"
                    }`}
                >
                  <div className={`p-2.5 rounded-lg border transition-colors ${activeChallengeId === c.id ? "border-foreground bg-background" : "border-border/30 bg-foreground/5"
                    }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-display text-lg font-medium">{c.selectorText}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Display Column */}
          <div className="lg:col-span-8">
            <div
              key={activeChallengeId}
              className="border border-border/25 bg-card p-8 lg:p-12 rounded-2xl shadow-xl flex flex-col justify-between min-h-[400px] animate-fade-in"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center text-[10px] font-mono uppercase tracking-widest px-3 py-1 bg-white/[0.04] border border-border/15 rounded-full text-muted-foreground mb-4">
                    {activeChallenge.tag}
                  </span>
                  <h3 className="font-display text-3xl text-foreground leading-tight mb-2">
                    {activeChallenge.title}
                  </h3>
                  <span className="block text-sm font-mono text-muted-foreground">
                    {activeChallenge.subtitle}
                  </span>
                </div>
                <div className="w-10 h-10 border border-border/20 flex items-center justify-center rounded-full text-foreground/40 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                {activeChallenge.description}
              </p>

              {/* Quote Block */}
              <div className="p-5 border-l-2 border-foreground/30 bg-background/30 rounded-r-lg mb-8">
                <span className="italic text-sm font-mono text-muted-foreground">
                  {activeChallenge.quote}
                </span>
              </div>

              {/* CTA Action Bar */}
              <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-xs font-mono text-muted-foreground text-center sm:text-left">
                  Explore workshops and exercises on our YouTube Channel.
                </p>
                <a
                  href={activeChallenge.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-foreground hover:bg-foreground/90 text-background rounded-full px-8 h-14 font-medium flex items-center justify-center gap-2 group transition-all"
                  >
                    <Play className="w-4 h-4 fill-background ml-0.5" />
                    Watch on YouTube
                  </Button>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
