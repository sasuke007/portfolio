"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionLabel } from "./SectionLabel";
import { projects, type Project } from "@/content";
import { cn } from "@/lib/cn";

function spanClasses(span: Project["span"]) {
  switch (span) {
    case "feature":
      return "md:col-span-8 md:row-span-1";
    case "tall":
      return "md:col-span-4 md:row-span-1";
    case "third":
    default:
      return "md:col-span-4";
  }
}

function ProjectCard({ project }: { project: Project }) {
  const isFeature = project.span === "feature";
  const isTall = project.span === "tall";

  return (
    <a
      href={project.href}
      className={cn(
        "project-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white",
        spanClasses(project.span),
        isFeature ? "p-10 min-h-130" : "p-7 min-h-80",
        isTall && "min-h-130",
      )}
    >
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-60 transition-opacity duration-500 ease-soft" />

      <div className="relative z-10 flex items-start justify-between gap-6">
        <div>
          <h3
            className={cn(
              "m-0 font-display font-normal leading-[1.05] tracking-[-0.01em]",
              isFeature
                ? "text-[clamp(2.4rem,4vw,3.5rem)]"
                : isTall
                  ? "text-[clamp(2rem,3.2vw,2.6rem)]"
                  : "text-[clamp(1.5rem,2.2vw,1.9rem)]",
            )}
          >
            {project.name}
          </h3>
          {project.oneWord && (
            <p className="mt-1.5 font-display italic text-[clamp(1rem,1.4vw,1.25rem)] text-muted">
              {project.oneWord}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-start justify-end gap-1.5">
          {project.status ? (
            <span className="label-pill rounded-full border border-border px-2.5 py-1 text-text">
              {project.status}
            </span>
          ) : (
            project.stack.map((s) => (
              <span key={s} className="label-pill ml-2 text-muted">
                {s}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-12">
        {!project.oneWord && (
          <p className="body-editorial-tight mb-4.5 max-w-md">
            {project.description}
          </p>
        )}
        <div className="inline-flex items-center gap-1.5 font-body font-medium text-[12px] uppercase tracking-[0.08em]">
          <span className="link-underline">View Case Study</span>
          <ArrowUpRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>

      {isFeature && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-8 right-8 flex h-24 w-24 items-center justify-center rounded-full border border-border font-display italic text-[28px] text-[rgba(26,26,26,0.35)]"
        >
          01
        </div>
      )}
    </a>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      gsap.from(".project-head > *", {
        y: 16,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: ".project-head",
          start: "top 85%",
        },
      });

      gsap.from(".project-card", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative mx-auto max-w-(--max-width) px-6 py-32 md:py-44"
    >
      <div className="project-head">
        <SectionLabel index="02" name="SELECTED WORKS" />

        <h2 className="mt-8 font-display font-normal text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.015em]">
          Creating with <em className="italic">Code</em>.
        </h2>

        <p className="body-editorial mt-4.5 max-w-xl">
          A curated handful of the work I&rsquo;m proudest of — products,
          platforms, and provocations.
        </p>
      </div>

      <div className="project-grid mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
