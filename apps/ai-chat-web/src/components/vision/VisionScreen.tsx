import Icon from "../Icon";
import MediaInspection from "./MediaInspection";
import AnalysisCard from "./AnalysisCard";
import UploadZone from "./UploadZone";

function RouterBanner() {
  return (
    <div className="px-margin pt-space-md pb-space-sm">
      <div className="bg-surface-container-high rounded-xl p-space-sm flex items-center justify-between shadow-md">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
            <Icon name="alt_route" className="text-[18px] text-secondary" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase tracking-wider">
                Dynamic Router
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
            </div>
            <span className="font-code-md text-code-md text-on-surface truncate">
              Media detected → Auto-dispatch Gemini 1.5 Pro
            </span>
          </div>
        </div>
        <div className="px-space-sm py-1 rounded-full bg-surface-container-lowest flex items-center gap-1.5 shrink-0 shadow-[0_0_12px_rgba(208,188,255,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
          <span className="font-label-mono-xs text-label-mono-xs text-secondary uppercase font-semibold">
            Vision Online
          </span>
        </div>
      </div>
    </div>
  );
}

function PromptPayloadCard() {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center">
            <Icon name="person" className="text-[14px] text-on-surface-variant" />
          </div>
          <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase">
            Prompt Payload
          </span>
        </div>
        <span className="font-label-mono-xs text-label-mono-xs text-outline">
          User turn #1
        </span>
      </div>
      <div className="p-space-sm bg-surface-container-high rounded-lg">
        <p className="font-body-md text-body-md text-on-surface">
          Explain the latency bottleneck in this FastAPI + pgvector retrieval flow and
          how SSE minimizes it.
        </p>
      </div>
    </div>
  );
}

export default function VisionScreen() {
  return (
    <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div className="flex flex-col w-full">
        <RouterBanner />
        <div className="px-margin flex flex-col gap-space-md pb-space-lg">
          <MediaInspection />
          <PromptPayloadCard />
          <AnalysisCard />
          <UploadZone />
        </div>
      </div>
    </main>
  );
}
