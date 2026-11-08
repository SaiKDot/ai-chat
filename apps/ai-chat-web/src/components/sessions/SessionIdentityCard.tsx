"use client";

import { useState } from "react";
import Icon from "../Icon";

interface Metric {
  label: string;
  icon: string;
  iconColor: string;
  value: string;
  valueColor: string;
  footnote: string;
}

const METRICS: Metric[] = [
  {
    label: "Tokens",
    icon: "data_usage",
    iconColor: "text-primary",
    value: "124.8k",
    valueColor: "text-on-surface",
    footnote: "OAI: 92k · Gem: 32k",
  },
  {
    label: "TTFT Latency",
    icon: "speed",
    iconColor: "text-secondary",
    value: "240ms",
    valueColor: "text-primary",
    footnote: "p95: 380ms",
  },
  {
    label: "Threads",
    icon: "inventory_2",
    iconColor: "text-tertiary",
    value: "18",
    valueColor: "text-on-surface",
    footnote: "PostgreSQL",
  },
];

export default function SessionIdentityCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText("guest_session_9f8a42b1-7c9e").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-col gap-space-md mt-space-md p-space-md rounded-xl bg-surface-container shadow-md">
      {/* Guest UUID & DB Sync Status */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs min-w-0">
            <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <Icon name="badge" className="text-[14px] text-on-primary-container" />
            </div>
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface truncate">
              guest_session_9f8a42b1-7c9e
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
          >
            <Icon
              name={copied ? "check" : "content_copy"}
              className="text-[13px] text-primary"
            />
            <span className="font-label-mono-xs text-label-mono-xs text-primary">
              {copied ? "COPIED" : "COPY"}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-1.5 px-space-xs py-1 rounded bg-surface-container-low text-on-surface-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"></span>
          <span className="font-label-mono-xs text-label-mono-xs text-primary truncate">
            DB Sync: synced to conversations &amp; messages
          </span>
        </div>
      </div>
      {/* Telemetry Summary Metric Tiles */}
      <div className="grid grid-cols-3 gap-space-xs pt-space-xs">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col p-space-sm rounded-lg bg-surface-container-low shadow-sm justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase">
                {metric.label}
              </span>
              <Icon name={metric.icon} className={`text-[12px] ${metric.iconColor}`} />
            </div>
            <div className="flex flex-col mt-1">
              <span
                className={`font-headline-sm text-headline-sm leading-tight font-semibold ${metric.valueColor}`}
              >
                {metric.value}
              </span>
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant truncate mt-0.5">
                {metric.footnote}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
