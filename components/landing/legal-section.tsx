"use client";

import { useEffect, useState, useRef } from "react";
import { Scale, ShieldCheck, Landmark, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LegalSection() {
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

  const services = [
    {
      icon: ShieldCheck,
      title: "Legal Issue 1",
      description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    },
    {
      icon: Scale,
      title: "Legal Issue 2",
      description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    },
    {
      icon: Landmark,
      title: "Legal Issue 3",
      description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    },
    {
      icon: MessageSquare,
      title: "Legal Issue 4",
      description: "[ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]",
    },
  ];

  return (
    <section
      id="legal"
      ref={sectionRef}
      className="theme-flipped relative py-24 lg:py-32 overflow-hidden bg-background text-foreground"
    >
      {/* Decorative background visual */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[300px] bg-foreground/[0.01] pointer-events-none rounded-full blur-[120px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="mb-16 lg:mb-24 max-w-3xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Advocate & Counsel
          </span>
          <h2 className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Legal Advisory Services
            <br />
            <span className="text-muted-foreground">for Students and Professionals.</span>
          </h2>
        </div>

        {/* Narrative & Services */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

          {/* Narrative Info (Col-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-foreground">Defending Educational Integrity</h3>
              <p className="text-muted-foreground leading-relaxed">
                [ Placeholder Placeholder Placeholder Placeholder Placeholder Placeholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholder PlaceholderPlaceholderPlaceholderPlaceholder.]
              </p>
            </div>

            <div className="pt-8 border-t border-border/10 mt-8 lg:mt-0">
              <span className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                Need Legal Consultation?
              </span>
              <a href="mailto:rayipudibabu@gmail.com">
                <Button
                  size="lg"
                  className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-full h-14 font-medium flex items-center justify-center gap-2 group transition-all"
                >
                  Book Private Consult
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>

          {/* Services Grid (Col-8) */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {services.map((srv, idx) => (
              <div
                key={srv.title}
                className={`p-8 border border-border/15 bg-card hover-lift transition-all duration-500 rounded-xl flex flex-col justify-between ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div>
                  <div className="w-12 h-12 border border-border/20 flex items-center justify-center text-foreground mb-6 rounded-lg bg-foreground/5">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-2xl text-foreground mb-3">{srv.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{srv.description}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-border/10 flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span>Advocate Advisory</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
