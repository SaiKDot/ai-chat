"use client";

import Icon from "../Icon";
import type { RetrievedChunk } from "@/lib/mock-data";

export default function ChunkCard({ chunk }: { chunk: RetrievedChunk }) {
  return (
    <article className="bg-surface-container-low rounded-lg p-space-sm flex flex-col gap-2 transition-transform active:scale-[0.99]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="font-label-mono-xs text-label-mono-xs px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface">
            {chunk.ref}
          </span>
          <span className="font-label-mono-xs text-label-mono-xs text-outline">
            {chunk.source}
          </span>
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded ${
            chunk.highMatch ? "bg-primary/10" : "bg-surface-container-high"
          }`}
        >
          {chunk.highMatch && (
            <Icon name="bolt" className="text-[12px] text-primary" />
          )}
          <span
            className={`font-label-mono-xs text-label-mono-xs font-semibold ${chunk.scoreColor}`}
          >
            {chunk.score}
          </span>
        </div>
      </div>
      {chunk.code ? (
        <div className="bg-surface-container-lowest rounded p-2 overflow-x-auto">
          <code className="font-code-md text-code-md text-primary-fixed-dim whitespace-pre-wrap">
            {chunk.content}
          </code>
        </div>
      ) : (
        <p className="font-body-md text-body-md text-on-surface-variant bg-surface-container-lowest p-2 rounded leading-relaxed">
          {chunk.content}
        </p>
      )}
      <div className="flex items-center justify-between text-outline">
        <span className="font-label-mono-xs text-label-mono-xs">{chunk.meta}</span>
        <button className="flex items-center gap-0.5 font-label-mono-xs text-label-mono-xs text-on-surface-variant hover:text-on-surface">
          <Icon name="open_in_new" className="text-[14px]" />
          <span>Inspect Vector</span>
        </button>
      </div>
    </article>
  );
}
