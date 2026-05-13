"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, registerGsap } from "@/lib/gsap";
import { SectionLabel } from "./SectionLabel";
import { projects, type Project } from "@/content";

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
      className={`project-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border ${spanClasses(project.span)}`}
      style={{
        background: "#ffffff",
        borderColor: "var(--color-border)",
        padding: isFeature ? "2.5rem" : "1.75rem",
        minHeight: isFeature ? 520 : isTall ? 520 : 320,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-dot-grid) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0",
          opacity: 0.6,
          transition: "opacity 500ms var(--ease-soft)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-6">
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: isFeature
                ? "clamp(2.4rem, 4vw, 3.5rem)"
                : isTall
                  ? "clamp(2rem, 3.2vw, 2.6rem)"
                  : "clamp(1.5rem, 2.2vw, 1.9rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            {project.name}
          </h3>
          {project.oneWord && (
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                marginTop: 6,
                color: "var(--color-muted)",
              }}
            >
              {project.oneWord}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-start justify-end gap-1.5">
          {project.status ? (
            <span
              className="label-pill rounded-full border px-2.5 py-1"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              {project.status}
            </span>
          ) : (
            project.stack.map((s) => (
              <span
                key={s}
                className="label-pill"
                style={{ color: "var(--color-muted)", marginLeft: 8 }}
              >
                {s}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-12">
        {!project.oneWord && (
          <p
            className="body-editorial-tight max-w-md"
            style={{ marginBottom: 18 }}
          >
            {project.description}
          </p>
        )}
        <div
          className="inline-flex items-center gap-1.5"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
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
          className="pointer-events-none absolute bottom-8 right-8"
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 28,
            color: "rgba(26,26,26,0.35)",
          }}
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
      className="relative mx-auto px-6 py-32 md:py-44"
      style={{ maxWidth: "var(--max-width)" }}
    >
      <div className="project-head">
        <SectionLabel index="02" name="SELECTED WORKS" />

        <h2
          className="mt-8"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            margin: "32px 0 0 0",
          }}
        >
          Creating with <em style={{ fontStyle: "italic" }}>Code</em>.
        </h2>

        <p className="body-editorial mt-6 max-w-xl" style={{ marginTop: 18 }}>
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
