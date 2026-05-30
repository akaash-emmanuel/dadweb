"use client";

import { useEffect, useState, useRef } from "react";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="theme-flipped relative py-24 lg:py-36 overflow-hidden bg-background text-foreground"
    >
      {/* Decorative radial gradients for rich aesthetics */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-foreground/[0.01] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[500px] h-[500px] bg-foreground/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Eyebrow / Section Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            The Founder
          </span>
          <h2
            className={`text-5xl lg:text-7xl font-display tracking-tight leading-[0.95] transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Babu Rayipudi
            <br />
          </h2>
        </div>

        {/* Block 1: My Focus (Image Left, Text Right) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">

          {/* Portrait Image (Left Col-5) */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative aspect-[3/4] w-full max-w-md border border-dashed border-foreground/30 bg-foreground/[0.02] flex flex-col items-center justify-center p-8 rounded-2xl group overflow-hidden shadow-sm transition-colors hover:bg-foreground/[0.03]">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Portrait</span>
              <p className="text-sm text-center text-muted-foreground/60 max-w-xs leading-relaxed">
                [Profile Image (3:4 ratio) - Babu Rayipudi]
              </p>
              <div className="absolute inset-0 border border-foreground/5 pointer-events-none rounded-2xl transition-all group-hover:scale-[0.98]" />
            </div>
          </div>

          {/* Narrative Biography (Right Col-7) */}
          <div
            className={`lg:col-span-7 space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h3 className="font-display text-4xl text-foreground">My Focus</h3>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              [Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>

            <div className="p-6 border-l-2 border-foreground bg-foreground/[0.02] rounded-r-xl">
              <span className="font-display text-xl lg:text-2xl italic text-foreground block leading-relaxed">
                "[Insert Babu Rayipudi's personal message/vision quote to students here: e.g. 'I do not teach to finish a syllabus; I guide to expand a mind.']"
              </span>
            </div>
          </div>

        </div>

        {/* Block 2: Philosophy & Approach (Paragraph Left, Image Right) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 border-t border-border/20 pt-24">

          {/* Paragraph (Left Col-7) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h3 className="font-display text-4xl text-foreground">Philosophy & Approach</h3>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>
          </div>

          {/* Image (Right Col-5) */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative aspect-[4/3] w-full max-w-md border border-dashed border-foreground/30 bg-foreground/[0.02] flex flex-col items-center justify-center p-8 rounded-2xl group overflow-hidden shadow-sm transition-colors hover:bg-foreground/[0.03]">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Coaching & Study Space</span>
              <p className="text-sm text-center text-muted-foreground/60 max-w-xs leading-relaxed">
                [Insert Classroom or Coaching Session Image (4:3 ratio)]
              </p>
              <div className="absolute inset-0 border border-foreground/5 pointer-events-none rounded-2xl" />
            </div>
          </div>

        </div>

        {/* Block 3: Counseling & Advocacy (Image Left, Paragraph Right) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 border-t border-border/20 pt-24">

          {/* Image (Left Col-5) */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative aspect-[4/3] w-full max-w-md border border-dashed border-foreground/30 bg-foreground/[0.02] flex flex-col items-center justify-center p-8 rounded-2xl group overflow-hidden shadow-sm transition-colors hover:bg-foreground/[0.03]">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Advocacy & Seminars</span>
              <p className="text-sm text-center text-muted-foreground/60 max-w-xs leading-relaxed">
                [Insert Seminar or Student Interaction Image (4:3 ratio)]
              </p>
              <div className="absolute inset-0 border border-foreground/5 pointer-events-none rounded-2xl" />
            </div>
          </div>

          {/* Paragraph (Right Col-7) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h3 className="font-display text-4xl text-foreground">Advocacy & Counseling</h3>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>
          </div>

        </div>

        {/* Block 4: My Journey (Points) */}
        <div className="border-t border-border/20 pt-24 pb-24">
          <h3 className="font-display text-4xl lg:text-5xl mb-16 text-foreground text-center">My Journey</h3>

          <div className="relative border-l border-foreground/10 max-w-3xl mx-auto pl-8 space-y-16 py-4">
            {[
              {
                time: "[Insert Phase 1 Timeframe: e.g. 2008 - 2012]",
                title: "[Insert Phase 1 Heading: e.g. Academic Foundations]",
                desc: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]"
              },
              {
                time: "[Insert Phase 2 Timeframe: e.g. 2012 - 2016]",
                title: "[Insert Phase 2 Heading: e.g. Legal Practice & Early Mentoring]",
                desc: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]"
              },
              {
                time: "[Insert Phase 3 Timeframe: e.g. 2016 - 2019]",
                title: "[Insert Phase 3 Heading: e.g. Transition to Professional Mentorship]",
                desc: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]"
              },
              {
                time: "[Insert Phase 4 Timeframe: e.g. 2019 - 2022]",
                title: "[Insert Phase 4 Heading: e.g. Specializing in Student Mindset Coaching]",
                desc: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]"
              },
              {
                time: "[Insert Phase 5 Timeframe: e.g. 2022 - Present]",
                title: "[Insert Phase 5 Heading: e.g. Launching 'The step' Initiative]",
                desc: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]"
              }
            ].map((milestone, idx) => (
              <div
                key={idx}
                className={`relative group transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[38px] top-1.5 w-4 h-4 rounded-full border border-foreground/30 bg-background transition-transform group-hover:scale-125 group-hover:bg-foreground" />

                <span className="block font-mono text-sm text-muted-foreground/60 mb-2">
                  {milestone.time}
                </span>
                <h4 className="font-display text-2xl text-foreground mb-4">
                  {milestone.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Block 5: Vision & Impact (Paragraph Left, Image Right) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center border-t border-border/20 pt-24">

          {/* Paragraph (Left Col-7) */}
          <div
            className={`lg:col-span-7 space-y-6 transition-all duration-1000 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <h3 className="font-display text-4xl text-foreground">Vision & Future Direction</h3>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
            </p>
          </div>

          {/* Image (Right Col-5) */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative aspect-[4/3] w-full max-w-md border border-dashed border-foreground/30 bg-foreground/[0.02] flex flex-col items-center justify-center p-8 rounded-2xl group overflow-hidden shadow-sm transition-colors hover:bg-foreground/[0.03]">
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">Future Vision</span>
              <p className="text-sm text-center text-muted-foreground/60 max-w-xs leading-relaxed">
                [Insert Seminar Success or Strategic Growth Image (4:3 ratio)]
              </p>
              <div className="absolute inset-0 border border-foreground/5 pointer-events-none rounded-2xl" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
