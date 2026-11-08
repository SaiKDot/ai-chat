"use client";

import { usePathname } from "next/navigation";
import Icon from "./Icon";

const SUBTITLES: Record<string, string> = {
  "/": "Chat",
  "/vision": "Vision",
  "/knowledge": "Rag Docs",
  "/sessions": "Sessions",
};

export default function AppHeader() {
  const pathname = usePathname();
  const subtitle = SUBTITLES[pathname] ?? "Chat";

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-margin flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm min-w-0 flex-1">
          {/* Logo placeholder (original design used a remote image) */}
          <div className="h-8 w-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Icon name="hub" className="text-[18px] text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface truncate">
                NexusAI Engine
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 animate-pulse"></span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant truncate uppercase">
                {subtitle}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-space-xs shrink-0">
          <div className="hidden xs:flex flex-col items-end gap-0.5">
            <div className="px-1.5 py-0.5 rounded bg-surface-container-high flex items-center gap-1">
              <Icon name="fingerprint" className="text-[12px] text-outline" />
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase tracking-wider">
                guest-9f8a
              </span>
            </div>
            <div className="px-1.5 py-0.5 rounded bg-surface-container-low flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-primary"></span>
              <span className="font-label-mono-xs text-label-mono-xs text-primary">
                18ms • SSE active
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 ml-1">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
