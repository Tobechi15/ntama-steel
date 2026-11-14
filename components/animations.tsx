"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HERO_LAYERS = [
  { selector: "[data-parallax='scene']", depth: 5, pointer: 9 },
  { selector: "[data-parallax='crane']", depth: 8, pointer: 16 },
  { selector: "[data-parallax='lift']", depth: 11, pointer: 22 },
];

export function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 1024px)",
        mobile: "(max-width: 1023px)",
        reduce: "(prefers-reduced-motion: reduce)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { reduce, desktop, fine } = context.conditions as {
          reduce: boolean;
          desktop: boolean;
          fine: boolean;
        };

        if (reduce) {
          gsap.set("[data-reveal], [data-reveal-group] > *, [data-hero-el]", {
            clearProps: "all",
            opacity: 1,
          });
          return;
        }

        gsap.fromTo(
          "[data-hero-el]",
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.08,
          },
        );

        const depth = desktop ? 1 : 0.35;
        const hero = document.querySelector<HTMLElement>(".hero");

        // Scroll parallax: layers drift at different speeds as the hero leaves.
        if (hero) {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          HERO_LAYERS.forEach((layer) => {
            timeline.to(
              layer.selector,
              { yPercent: layer.depth * depth, ease: "none" },
              0,
            );
          });

          // Pointer parallax: the same layers lean with the cursor, deepest last.
          if (fine) {
            const setters = HERO_LAYERS.flatMap((layer) =>
              gsap.utils.toArray<HTMLElement>(layer.selector).map((element) => ({
                x: gsap.quickTo(element, "x", { duration: 0.9, ease: "power3.out" }),
                y: gsap.quickTo(element, "y", { duration: 0.9, ease: "power3.out" }),
                strength: layer.pointer * (desktop ? 1 : 0.4),
              })),
            );

            const onPointerMove = (event: PointerEvent) => {
              const rect = hero.getBoundingClientRect();
              const nx = (event.clientX - rect.left) / rect.width - 0.5;
              const ny = (event.clientY - rect.top) / rect.height - 0.5;

              setters.forEach((setter) => {
                setter.x(-nx * setter.strength);
                setter.y(-ny * setter.strength * 0.6);
              });
            };

            const onPointerLeave = () => {
              setters.forEach((setter) => {
                setter.x(0);
                setter.y(0);
              });
            };

            hero.addEventListener("pointermove", onPointerMove);
            hero.addEventListener("pointerleave", onPointerLeave);

            context.add(() => {
              hero.removeEventListener("pointermove", onPointerMove);
              hero.removeEventListener("pointerleave", onPointerLeave);
            });
          }
        }

        // Section reveals: a quiet fade only, nothing that pulls focus.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.to(Array.from(group.children), {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          });
        });

        ScrollTrigger.refresh();
      },
    );

    return () => mm.revert();
  }, []);

  return null;
}
