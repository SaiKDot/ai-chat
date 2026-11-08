"use client";

import { useMemo, useState } from "react";
import Icon from "../Icon";
import SessionIdentityCard from "./SessionIdentityCard";
import ThreadCard from "./ThreadCard";
import {
  SESSION_FILTERS,
  SESSION_GROUPS,
  type SessionFilter,
} from "@/lib/mock-data";

export default function SessionsScreen() {
  const [filter, setFilter] = useState<SessionFilter["id"]>("all");
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const q = query.toLowerCase().trim();
    return SESSION_GROUPS.map((group) => ({
      ...group,
      threads: group.threads.filter((thread) => {
        const matchesFilter = filter === "all" || thread.category === filter;
        const matchesQuery =
          q.length === 0 ||
          `${thread.title} ${thread.preview} ${thread.tags
            .map((t) => t.label)
            .join(" ")}`
            .toLowerCase()
            .includes(q);
        return matchesFilter && matchesQuery;
      }),
    })).filter((group) => group.threads.length > 0);
  }, [filter, query]);

  return (
    <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div className="flex flex-col w-full px-margin pb-24 gap-space-lg">
        <SessionIdentityCard />

        {/* Filter & Search Bar Section */}
        <div className="flex flex-col gap-space-sm">
          <div className="relative flex items-center w-full">
            <Icon
              name="search"
              className="absolute left-3 text-on-surface-variant text-[18px]"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search threads, model tags, queries..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-surface-container text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none shadow-sm focus:bg-surface-container-high transition-colors"
            />
            {query.length > 0 && (
              <button
                onClick={() => setQuery("")}
                className="material-symbols-outlined absolute right-2.5 text-on-surface-variant text-[16px] hover:text-on-surface"
              >
                close
              </button>
            )}
          </div>
          {/* Filter Pills (Scrollable) */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-0.5">
            {SESSION_FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`flex items-center gap-1 px-space-sm py-1 rounded font-label-mono-xs text-label-mono-xs uppercase shrink-0 transition-transform active:scale-95 shadow-sm ${
                    active
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {f.dotColor && (
                    <span className={`w-1.5 h-1.5 rounded-full ${f.dotColor}`}></span>
                  )}
                  <span>{f.label}</span>
                  {f.count !== undefined && (
                    <span className="font-bold">{f.count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grouped Conversation List */}
        <div className="flex flex-col gap-space-lg">
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between px-space-xs">
                <span
                  className={`font-label-mono-xs text-label-mono-xs uppercase font-bold tracking-wider ${group.labelColor}`}
                >
                  {group.label}
                </span>
                <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant">
                  {group.threads.length} session{group.threads.length === 1 ? "" : "s"}
                </span>
              </div>
              {group.threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} />
              ))}
            </div>
          ))}
        </div>

        {/* Auth Migration Banner & Session Export Actions */}
        <div className="flex flex-col gap-space-sm pt-space-xs">
          <div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-high shadow-md">
            <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0 shadow-inner">
              <Icon name="phonelink_lock" className="text-[20px] text-secondary" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-body-md text-body-md text-on-surface font-semibold truncate">
                Link Account / Auth Migration
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Preserve your 18 sessions across devices before guest cookies expire.
              </span>
            </div>
            <button className="px-space-sm py-1.5 rounded-lg bg-secondary text-on-secondary font-label-mono-xs text-label-mono-xs font-bold uppercase shrink-0 transition-transform active:scale-95 shadow-sm">
              Link
            </button>
          </div>
          <button className="flex items-center justify-center gap-space-xs py-2.5 px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-all active:scale-[0.98] shadow-sm">
            <Icon name="download" className="text-[16px] text-primary" />
            <span className="font-label-mono-xs text-label-mono-xs uppercase tracking-wide">
              Export Session Data (JSON)
            </span>
          </button>
        </div>

        {/* Floating Start New Thread Action Button */}
        <div className="sticky bottom-4 z-40 self-end mt-2">
          <button className="flex items-center gap-2 px-space-lg py-3 rounded-full bg-primary text-on-primary font-headline-sm text-headline-sm font-semibold shadow-xl hover:bg-primary-fixed transition-all active:scale-95 group">
            <Icon
              name="add"
              className="text-[22px] group-hover:rotate-90 transition-transform"
            />
            <span>New Thread</span>
          </button>
        </div>
      </div>
    </main>
  );
}
