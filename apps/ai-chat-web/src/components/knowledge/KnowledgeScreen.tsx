"use client";

import { useState } from "react";
import Icon from "../Icon";
import ChunkCard from "./ChunkCard";
import {
  IndexedArtifactCard,
  PipelineParamsCard,
  VectorStatsGrid,
} from "./PipelineCards";
import { RETRIEVED_CHUNKS } from "@/lib/mock-data";

function QueryInspector() {
  const [query, setQuery] = useState(
    "How does SSE token backpressure work in Python?"
  );

  return (
    <section className="bg-surface-container rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon name="search_spark" className="text-[16px] text-primary" />
          <span className="font-label-mono-xs text-label-mono-xs uppercase text-on-surface">
            Semantic Query Inspector
          </span>
        </div>
        <span className="font-label-mono-xs text-label-mono-xs text-primary flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Cosine Similarity
        </span>
      </div>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-surface-container-lowest text-on-surface rounded-lg pl-3 pr-10 py-2.5 font-body-md text-body-md focus:outline-none shadow-inner placeholder:text-outline"
        />
        <button className="absolute right-2 text-primary p-1 rounded hover:bg-surface-container flex items-center justify-center">
          <Icon name="send" className="text-[20px]" />
        </button>
      </div>
      {/* Ranked Chunks List */}
      <div className="flex flex-col gap-space-sm mt-1">
        {RETRIEVED_CHUNKS.map((chunk) => (
          <ChunkCard key={chunk.id} chunk={chunk} />
        ))}
      </div>
    </section>
  );
}

function ContextInjectionPanel() {
  return (
    <section className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon
            name="integration_instructions"
            className="text-[16px] text-tertiary"
          />
          <span className="font-label-mono-xs text-label-mono-xs uppercase text-on-surface">
            Prompt Context Injection
          </span>
        </div>
        <div className="flex items-center gap-1 bg-tertiary/10 px-2 py-0.5 rounded text-tertiary font-label-mono-xs text-label-mono-xs">
          <Icon name="token" className="text-[12px]" />
          <span>1,420 Tokens</span>
        </div>
      </div>
      {/* Progress Meter */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between font-label-mono-xs text-label-mono-xs text-outline">
          <span>Prompt Payload (3 chunks)</span>
          <span>17.3% of 8,192 token window</span>
        </div>
        <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden flex">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: "17.3%" }}
          ></div>
          <div
            className="h-full bg-secondary transition-all duration-300"
            style={{ width: "25%" }}
          ></div>
        </div>
        <div className="flex items-center gap-3 mt-0.5 font-label-mono-xs text-label-mono-xs text-outline">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> RAG Context
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> System +
            Prompt
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-surface-container-highest"></span>{" "}
            Free Headroom
          </span>
        </div>
      </div>
      {/* Drawer Raw System Injection Preview */}
      <details className="group bg-surface-container-lowest rounded-lg p-2.5 transition-colors open:bg-surface-container-lowest">
        <summary className="flex items-center justify-between cursor-pointer list-none select-none">
          <div className="flex items-center gap-1.5">
            <Icon
              name="chevron_right"
              className="text-[16px] text-outline group-open:rotate-90 transition-transform"
            />
            <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase">
              Runtime Prompt Payload
            </span>
          </div>
          <span className="font-label-mono-xs text-label-mono-xs text-primary">
            Expand Prompt
          </span>
        </summary>
        <div className="mt-2.5 pt-2 font-code-md text-code-md text-on-surface-variant flex flex-col gap-1 bg-surface-container-low p-2 rounded">
          <span className="text-tertiary font-medium">&lt;context&gt;</span>
          <span className="text-on-surface pl-2">
            {"// [CHUNK 402 | doc_42 | p.7]"}
          </span>
          <span className="text-outline pl-2">
            StreamingResponse(event_generator()...
          </span>
          <span className="text-on-surface pl-2 mt-1">
            {"// [CHUNK 188 | doc_42 | p.12]"}
          </span>
          <span className="text-outline pl-2">
            FastAPI asynchronous generators naturally...
          </span>
          <span className="text-on-surface pl-2 mt-1">
            {"// [CHUNK 912 | doc_42 | p.24]"}
          </span>
          <span className="text-outline pl-2">
            The pgvector HNSW cosine distance...
          </span>
          <span className="text-tertiary font-medium">&lt;/context&gt;</span>
          <span className="text-primary mt-1">
            &lt;instruction&gt; Answer using only context above. &lt;/instruction&gt;
          </span>
        </div>
      </details>
    </section>
  );
}

export default function KnowledgeScreen() {
  return (
    <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div className="flex flex-col w-full px-margin pb-6 gap-space-md">
        <VectorStatsGrid />
        <IndexedArtifactCard />
        <PipelineParamsCard />
        <QueryInspector />
        <ContextInjectionPanel />
        {/* Quick Telemetry Micro-Action */}
        <div className="flex items-center justify-between px-1 text-outline">
          <div className="flex items-center gap-1.5">
            <Icon name="history" className="text-[14px]" />
            <span className="font-label-mono-xs text-label-mono-xs">
              Retriever latency: 28.4ms (pgvector index scan)
            </span>
          </div>
          <span className="font-label-mono-xs text-label-mono-xs text-primary">
            Live Session
          </span>
        </div>
      </div>
    </main>
  );
}
