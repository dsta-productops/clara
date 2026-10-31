import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// In-page anchors on the home page.
const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-clara", label: "Why CLARA" },
  { href: "#skills", label: "Skills" },
  { href: "#try", label: "Quick start" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2 font-semibold tracking-tight text-fg text-base hover:text-accent transition-colors"
          aria-label="CLARA home"
        >
          <ClaraMark />
          CLARA
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md"
            >
              {l.label}
            </a>
          ))}
          {/* Platform-team deployment lives on its own page, opened in a new tab. */}
          <Link
            href="/deploy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md"
          >
            For platform teams
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
          </Link>
        </nav>
      </div>
    </header>
  );
}

// Quote bubble on PRIZM's 24px grid: a user's words, cited.
function ClaraMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-accent"
    >
      <path
        d="M7.5 3.5h9a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-3.5l-4.5 4v-4h-1a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 10.5h2.75v2.75H8.25zM8.25 10.5c0-1.9.7-3 2.3-3.3M13 10.5h2.75v2.75H13zM13 10.5c0-1.9.7-3 2.3-3.3"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
