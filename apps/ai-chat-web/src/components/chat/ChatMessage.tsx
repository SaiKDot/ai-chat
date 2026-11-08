"use client";

import Icon from "../Icon";
import CodeBlock from "./CodeBlock";
import type { ChatMessage as ChatMessageType } from "@/lib/mock-data";

function AssistantShowcaseBody() {
  return (
    <>
      <div className="font-body-md text-body-md text-on-surface leading-relaxed">
        Here is an optimized asynchronous SSE gateway using{" "}
        <span className="font-code-md text-code-md px-1.5 py-0.5 rounded bg-surface-container-high text-primary">
          fastapi
        </span>
        ,{" "}
        <span className="font-code-md text-code-md px-1.5 py-0.5 rounded bg-surface-container-high text-secondary">
          httpx
        </span>
        , and client-side flow governance to handle backpressure:
      </div>
      <CodeBlock />
      {/* Incremental Text with Cursor */}
      <div className="font-body-md text-body-md text-on-surface leading-relaxed flex flex-wrap items-baseline gap-1">
        <span>
          The disconnection handler automatically trips completion teardown when
          network congestion stalls socket ingestion
        </span>
        <span className="inline-block w-2 h-4 bg-primary align-middle animate-pulse ml-0.5"></span>
      </div>
      {/* Telemetry Message Footer */}
      <div className="mt-1 pt-space-xs flex flex-wrap items-center justify-between gap-2 text-on-surface-variant font-label-mono-xs text-label-mono-xs bg-surface-container/60 p-2 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-primary">
            <Icon name="memory" className="text-[13px]" />
            542 tokens
          </span>
          <span className="text-outline">•</span>
          <span>8.4s elapsed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface">
            Cached: 92%
          </span>
          <span className="px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-semibold uppercase">
            STREAMING
          </span>
        </div>
      </div>
    </>
  );
}

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  if (message.role === "user") {
    return (
      <article className="flex flex-col items-end w-full pl-6">
        <div className="flex items-center gap-1.5 mb-1 px-1">
          <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant">
            YOU
          </span>
          <span className="font-label-mono-xs text-label-mono-xs text-outline">
            {message.timestamp}
          </span>
        </div>
        <div className="bg-surface-container-high rounded-xl rounded-tr-none px-space-md py-space-sm text-on-surface shadow-sm">
          <p className="font-body-md text-body-md leading-relaxed">{message.text}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col items-start w-full pr-1">
      <div className="flex items-center justify-between w-full mb-1 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <Icon name="smart_toy" className="text-on-primary text-[13px]" />
          </div>
          <span className="font-label-mono-xs text-label-mono-xs text-on-surface font-semibold">
            NexusAI Orchestrator
          </span>
        </div>
        {message.streaming && (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-mono-xs text-label-mono-xs text-primary">
              Generating chunk buffer...
            </span>
          </div>
        )}
      </div>
      <div className="bg-surface-container-low rounded-xl rounded-tl-none p-space-md w-full shadow-md flex flex-col gap-space-md">
        {message.showcase ? (
          <AssistantShowcaseBody />
        ) : (
          <div className="font-body-md text-body-md text-on-surface leading-relaxed">
            {message.text}
            {message.streaming && (
              <span className="inline-block w-2 h-4 bg-primary align-middle animate-pulse ml-0.5"></span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
