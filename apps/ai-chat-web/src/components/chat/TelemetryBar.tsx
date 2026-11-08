"use client";

import { useState } from "react";
import Icon from "../Icon";

export default function TelemetryBar() {
  const [ragActive, setRagActive] = useState(true);

  return (
    <section className="sticky top-16 z-30 bg-surface-container-lowest/90 backdrop-blur-md px-margin py-space-sm flex flex-col gap-space-xs shadow-md">
      <div className="flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs min-w-0">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface uppercase tracking-wider truncate">
              GPT-4o (Active)
            </span>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container">
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant">
              T:
            </span>
            <span className="font-label-mono-xs text-label-mono-xs text-primary font-semibold">
              0.7
            </span>
          </div>
        </div>
        {/* Vector RAG Toggle Pill */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high shrink-0">
          <Icon name="database" className="text-[14px] text-tertiary" />
          <span className="font-label-mono-xs text-label-mono-xs text-on-surface">
            RAG
          </span>
          <button
            aria-label="Toggle RAG Pipeline"
            onClick={() => setRagActive((v) => !v)}
            className={`w-7 h-3.5 rounded-full relative transition-colors duration-200 focus:outline-none flex items-center px-0.5 ${
              ragActive ? "bg-primary" : "bg-surface-container-highest"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 bg-surface-container-lowest rounded-full transform transition-transform duration-200 ${
                ragActive ? "translate-x-3.5" : "translate-x-0.5"
              }`}
            ></span>
          </button>
        </div>
      </div>
      {/* Telemetry Stream Throughput */}
      <div className="flex items-center justify-between text-on-surface-variant px-0.5">
        <div className="flex items-center gap-1 font-label-mono-xs text-label-mono-xs">
          <Icon name="bolt" className="text-[13px] text-primary" />
          <span className="text-primary font-medium">SSE Stream:</span>
          <span className="text-on-surface">64 tok/sec</span>
          <span className="text-outline-variant">•</span>
          <span>210ms TTFT</span>
        </div>
        <div className="flex items-center gap-1 font-label-mono-xs text-label-mono-xs text-outline">
          <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
          <span>CHUNK #38</span>
        </div>
      </div>
    </section>
  );
}
