"use client";

import { useState } from "react";
import Icon from "../Icon";
import { MEDIA_STATS } from "@/lib/mock-data";

export default function MediaInspection() {
  const [bboxActive, setBboxActive] = useState(true);
  const [ocrVisible, setOcrVisible] = useState(true);

  return (
    <div className="bg-surface-container rounded-xl overflow-hidden shadow-lg flex flex-col">
      <div className="p-space-md flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <Icon name="image_search" className="text-[18px] text-secondary" />
            <span className="font-headline-sm text-headline-sm text-on-surface">
              Media Inspection
            </span>
          </div>
          <div className="px-space-xs py-0.5 rounded bg-surface-container-highest">
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase">
              Detail: High
            </span>
          </div>
        </div>
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-surface-container-lowest flex items-center justify-center group shadow-inner">
          {/* Architecture diagram placeholder (original design used a remote image) */}
          <div className="absolute inset-0 bg-linear-to-br from-secondary-container/25 via-surface-container-lowest to-primary-container/15 flex items-center justify-center">
            <Icon name="account_tree" className="text-[56px] text-outline-variant" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-surface-container-lowest/90 via-surface-container-lowest/30 to-transparent"></div>
          <div className="absolute top-space-sm right-space-sm flex items-center gap-1.5">
            <button
              onClick={() => setBboxActive((v) => !v)}
              className={`px-2 py-1 rounded backdrop-blur-md text-label-mono-xs font-label-mono-xs flex items-center gap-1 hover:bg-surface-bright active:scale-95 transition-all ${
                bboxActive
                  ? "bg-secondary text-on-secondary"
                  : "bg-surface-container-high/90 text-on-surface"
              }`}
            >
              <Icon
                name="crop_free"
                className={`text-[13px] ${bboxActive ? "" : "text-secondary"}`}
              />
              <span>BBox: {bboxActive ? "On" : "Off"}</span>
            </button>
            <button
              onClick={() => setOcrVisible((v) => !v)}
              className={`px-2 py-1 rounded backdrop-blur-md text-label-mono-xs font-label-mono-xs flex items-center gap-1 hover:bg-surface-bright active:scale-95 transition-all ${
                ocrVisible
                  ? "bg-primary text-on-primary"
                  : "bg-surface-container-high/90 text-on-surface"
              }`}
            >
              <Icon
                name="text_fields"
                className={`text-[13px] ${ocrVisible ? "" : "text-primary"}`}
              />
              <span>OCR Preview</span>
            </button>
          </div>
          <div
            className={`absolute inset-x-space-sm top-8 bottom-12 pointer-events-none transition-opacity duration-300 ${
              bboxActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-2 left-6 w-32 h-14 bg-secondary/15 rounded flex items-start justify-end p-1">
              <span className="font-label-mono-xs text-label-mono-xs text-secondary-fixed bg-surface-container-lowest/80 px-1 rounded">
                FastAPI: 0.99
              </span>
            </div>
            <div className="absolute bottom-2 right-8 w-36 h-16 bg-primary/15 rounded flex items-start justify-end p-1">
              <span className="font-label-mono-xs text-label-mono-xs text-primary-fixed bg-surface-container-lowest/80 px-1 rounded">
                pgvector: 0.98
              </span>
            </div>
          </div>
          <div className="absolute bottom-space-sm left-space-sm right-space-sm flex items-center justify-between text-on-surface">
            <div className="flex items-center gap-space-xs min-w-0">
              <Icon name="description" className="text-[16px] text-outline" />
              <span className="font-code-md text-code-md text-on-surface truncate">
                arch_v2_pgvector.png
              </span>
            </div>
            <span className="font-label-mono-xs text-label-mono-xs text-secondary-fixed bg-secondary-container px-2 py-0.5 rounded-full font-semibold">
              258 vision units
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-space-xs pt-1">
          {MEDIA_STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-space-xs bg-surface-container-low rounded flex flex-col items-center justify-center text-center"
            >
              <span className="font-label-mono-xs text-label-mono-xs text-outline uppercase">
                {stat.label}
              </span>
              <span className="font-code-md text-code-md text-on-surface">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
        {ocrVisible && (
          <div className="p-space-sm bg-surface-container-lowest rounded-lg flex flex-col gap-1 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase flex items-center gap-1">
                <Icon name="data_object" className="text-[13px] text-primary" />
                Extracted OCR Manifest (2 nodes, 1 pipe)
              </span>
              <span className="font-label-mono-xs text-label-mono-xs text-primary">
                100% parsed
              </span>
            </div>
            <p className="font-code-md text-code-md text-on-surface-variant truncate">
              &quot;Client → [FastAPI Router] → (Embeddings Service) → [pgvector HNSW
              top_k=5] → SSE&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
