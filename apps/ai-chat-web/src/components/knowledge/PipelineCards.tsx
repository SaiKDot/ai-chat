"use client";

import { useState } from "react";
import Icon from "../Icon";
import { VECTOR_STATS } from "@/lib/mock-data";

export function VectorStatsGrid() {
  return (
    <section className="grid grid-cols-2 gap-space-xs mt-space-sm">
      {VECTOR_STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-1 shadow-sm"
        >
          <div className="flex items-center gap-1">
            <Icon name={stat.icon} className={`text-[14px] ${stat.iconColor}`} />
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase">
              {stat.label}
            </span>
          </div>
          {stat.pulse ? (
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className={stat.valueClass}>{stat.value}</span>
            </div>
          ) : stat.suffix ? (
            <div className="flex items-baseline gap-1">
              <span className={stat.valueClass}>{stat.value}</span>
              <span className="font-label-mono-xs text-label-mono-xs text-primary/70">
                {stat.suffix}
              </span>
            </div>
          ) : (
            <span className={stat.valueClass}>{stat.value}</span>
          )}
          <span
            className={`font-label-mono-xs text-label-mono-xs ${
              stat.footnoteClass ?? "text-outline"
            }`}
          >
            {stat.footnote}
          </span>
        </div>
      ))}
    </section>
  );
}

export function IndexedArtifactCard() {
  const [reindexing, setReindexing] = useState(false);

  const handleReindex = () => {
    setReindexing(true);
    setTimeout(() => setReindexing(false), 1200);
  };

  return (
    <section className="bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <Icon name="verified" className="text-primary text-[20px]" />
          <span className="font-label-mono-xs text-label-mono-xs text-primary uppercase tracking-wider">
            Indexed Artifact
          </span>
        </div>
        <button
          onClick={handleReindex}
          className="flex items-center gap-1 px-2 py-1 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors active:scale-95"
        >
          <Icon
            name="sync"
            className={`text-[14px] text-primary ${reindexing ? "animate-spin" : ""}`}
          />
          <span className="font-label-mono-xs text-label-mono-xs uppercase">
            Re-index
          </span>
        </button>
      </div>
      <div className="flex items-start gap-space-sm bg-surface-container-lowest p-space-sm rounded-lg">
        <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center shrink-0 text-tertiary">
          <Icon name="description" className="text-[20px]" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="font-body-md text-body-md text-on-surface font-medium truncate">
              fastapi_architecture_spec.pdf
            </span>
            <span className="font-label-mono-xs text-label-mono-xs px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container shrink-0 ml-1">
              Synced
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant">
              2.4 MB
            </span>
            <span className="h-1 w-1 rounded-full bg-outline"></span>
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant">
              38 Pages
            </span>
            <span className="h-1 w-1 rounded-full bg-outline"></span>
            <span className="font-label-mono-xs text-label-mono-xs text-primary">
              248 Chunks
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 bg-surface-container-high px-2 py-1.5 rounded-lg">
        <Icon name="alt_route" className="text-[14px] text-secondary" />
        <span className="font-label-mono-xs text-label-mono-xs text-secondary-fixed-dim truncate">
          RecursiveCharacterTextSplitter(chunk: 512, overlap: 50)
        </span>
      </div>
    </section>
  );
}

export function PipelineParamsCard() {
  const [chunkSize, setChunkSize] = useState(512);
  const [topK, setTopK] = useState(3);

  return (
    <section className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon name="tune" className="text-[16px] text-tertiary" />
          <span className="font-label-mono-xs text-label-mono-xs uppercase text-on-surface-variant">
            Pipeline Parameters
          </span>
        </div>
        <span className="font-label-mono-xs text-label-mono-xs text-tertiary bg-surface-container px-2 py-0.5 rounded">
          Runtime Live
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Chunk Window Size
          </span>
          <span className="font-label-mono-xs text-label-mono-xs text-primary bg-surface-container px-1.5 py-0.5 rounded">
            {chunkSize} chars
          </span>
        </div>
        <input
          type="range"
          min={256}
          max={1024}
          step={64}
          value={chunkSize}
          onChange={(e) => setChunkSize(Number(e.target.value))}
          className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between font-label-mono-xs text-label-mono-xs text-outline px-0.5">
          <span>256</span>
          <span>512</span>
          <span>768</span>
          <span>1024</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-1">
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Retrieval Top-K
        </span>
        <div className="flex items-center gap-1 bg-surface-container-highest p-0.5 rounded-lg">
          {[3, 5, 10].map((k) => (
            <button
              key={k}
              onClick={() => setTopK(k)}
              className={`px-2.5 py-1 rounded font-label-mono-xs text-label-mono-xs transition-all ${
                topK === k
                  ? "bg-primary text-on-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
