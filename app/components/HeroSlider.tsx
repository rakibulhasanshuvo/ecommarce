"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface HeroSlide {
  id: number;
  image: string;
  alt: string;
  tagline: string;
  title: string;
  cta: string;
  href: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section
      id="hero-slider"
      className="px-4 lg:px-8 py-6"
      aria-label="Featured promotions"
    >
      <div className="relative overflow-hidden rounded-2xl h-72 sm:h-80 md:h-96 lg:h-[480px] flex items-end group max-w-7xl mx-auto">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url('${slide.image}')` }}
          role="img"
          aria-label={slide.alt}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/60 to-transparent" />

        {/* Content */}
        <div
          className="relative p-6 md:p-10 w-full max-w-lg animate-fade-in"
          key={current}
        >
          <p className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-2">
            {slide.tagline}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {slide.title}
          </h2>
          <Link
            href={slide.href}
            className="inline-flex items-center gap-2 glass px-6 py-2.5 rounded-xl text-sm font-semibold glow-primary border border-primary/30 transition-all hover:bg-white/10 hover:gap-3 active:scale-95"
          >
            {slide.cta}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
          onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          aria-label="Previous slide"
        >
          <span className="material-symbols-outlined text-lg">
            chevron_left
          </span>
        </button>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
          onClick={() => next()}
          aria-label="Next slide"
        >
          <span className="material-symbols-outlined text-lg">
            chevron_right
          </span>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 right-6 md:right-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
