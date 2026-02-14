"use client";

import { useEffect, useState } from "react";

type Chapter = {
  id: string;
  label: string;
};

export default function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapters]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav
      aria-label="Chapter navigation"
      className="sticky top-[120px] hidden lg:block"
    >
      <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-light">
        Chapters
      </p>
      <div className="flex flex-col gap-1">
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => scrollTo(ch.id)}
            className={`chapter-nav-item py-2 text-left text-[13px] font-medium transition-colors duration-400 ${
              activeId === ch.id ? "active text-ink" : "text-muted-light hover:text-muted"
            }`}
          >
            {ch.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
