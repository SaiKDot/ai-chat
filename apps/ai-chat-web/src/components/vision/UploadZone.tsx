import Icon from "../Icon";

const UPLOAD_SOURCES = [
  { icon: "photo_camera", label: "Camera" },
  { icon: "folder_open", label: "Files" },
  { icon: "link", label: "URI Parse" },
];

export default function UploadZone() {
  return (
    <div className="bg-surface-container-low rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
        <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase tracking-wider">
          Queue Media for Pipeline
        </span>
        <span className="font-label-mono-xs text-label-mono-xs text-outline">
          Max 25MB • PNG, JPG, PDF
        </span>
      </div>
      <div className="p-space-lg rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center text-center gap-space-xs hover:bg-surface-container transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
          <Icon name="cloud_upload" className="text-[24px] text-secondary" />
        </div>
        <div className="flex flex-col">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            Tap to add diagram or capture
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Auto-detects multimodal route (Gemini 1.5 Pro / GPT-4o)
          </span>
        </div>
        <div className="flex items-center gap-space-xs mt-space-xs">
          {UPLOAD_SOURCES.map((source) => (
            <button
              key={source.label}
              className="px-space-sm py-1 rounded bg-surface-container-high text-on-surface font-label-mono-xs text-label-mono-xs flex items-center gap-1 active:scale-95 transition-all"
            >
              <Icon name={source.icon} className="text-[13px] text-outline" />
              <span>{source.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
