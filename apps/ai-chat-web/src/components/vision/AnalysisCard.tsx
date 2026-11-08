"use client";

import Icon from "../Icon";
import { LATENCY_CHECKPOINTS, VISION_ACTIONS } from "@/lib/mock-data";

export default function AnalysisCard() {
  return (
    <div className="bg-surface-container rounded-xl p-space-md shadow-xl flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs min-w-0">
          <div className="w-6 h-6 rounded bg-secondary-container flex items-center justify-center shrink-0">
            <Icon name="smart_toy" className="text-[15px] text-secondary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm text-on-surface truncate">
              Gemini 1.5 Pro
            </span>
            <span className="font-label-mono-xs text-label-mono-xs text-secondary-fixed">
              Multimodal Reasoning
            </span>
          </div>
        </div>
        <div className="px-2 py-0.5 rounded-full bg-surface-container-high flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant">
            99.4% conf • 1.2s
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-space-sm text-on-surface font-body-md text-body-md">
        <p className="text-on-surface-variant">
          Based on the structural graph in{" "}
          <span className="font-code-md text-code-md text-secondary">
            arch_v2_pgvector.png
          </span>
          , the critical execution path splits into three discrete latency
          checkpoints:
        </p>
        <div className="flex flex-col gap-space-xs p-space-sm bg-surface-container-lowest rounded-lg">
          {LATENCY_CHECKPOINTS.map((checkpoint, i) => (
            <div
              key={checkpoint.title}
              className={`flex items-start gap-space-xs ${i > 0 ? "mt-1" : ""}`}
            >
              <Icon
                name={checkpoint.icon}
                className={`text-[16px] mt-0.5 shrink-0 ${checkpoint.iconColor}`}
              />
              <div className="flex flex-col">
                <span className="font-body-md text-body-md font-semibold text-on-surface">
                  {checkpoint.title}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {checkpoint.description.map((part, j) =>
                    part.strong ? (
                      <strong key={j}>{part.text}</strong>
                    ) : (
                      <span key={j}>{part.text}</span>
                    )
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-space-sm bg-surface-container-high rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <Icon name="verified" className="text-[16px] text-primary" />
            <span className="font-code-md text-code-md text-on-surface font-medium">
              Gemini Vision 1.5 Pro • 99.4% confidence • 1.2s roundtrip
            </span>
          </div>
          <button
            title="Copy Analysis"
            className="text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform"
          >
            <Icon name="content_copy" className="text-[18px]" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-space-xs flex-wrap pt-space-xs">
        {VISION_ACTIONS.map((action) => (
          <button
            key={action.label}
            className="px-space-sm py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-mono-xs text-label-mono-xs flex items-center gap-1 active:scale-95 transition-all"
          >
            <Icon name={action.icon} className={`text-[14px] ${action.iconColor}`} />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
