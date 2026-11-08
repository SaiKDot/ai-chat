"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

interface NavTab {
  href: string;
  icon: string;
  label: string;
}

const TABS: NavTab[] = [
  { href: "/", icon: "forum", label: "Chat" },
  { href: "/vision", icon: "view_in_ar", label: "Vision" },
  { href: "/knowledge", icon: "database", label: "RAG Docs" },
  { href: "/sessions", icon: "history_edu", label: "Sessions" },
];

const ACTIVE_CLASSES =
  "text-primary font-semibold relative after:content-[''] after:absolute after:top-1.5 after:w-8 after:h-0.5 after:bg-primary after:rounded-full";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.2)]">
      <div className="h-16 px-space-sm flex items-center justify-around">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors ${
                active
                  ? ACTIVE_CLASSES
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Icon name={tab.icon} className="text-[22px]" />
              <span className="font-label-mono-xs text-label-mono-xs mt-0.5 uppercase tracking-wide">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
