"use client";

import Icon from "../Icon";
import type { SessionThread } from "@/lib/mock-data";

export default function ThreadCard({ thread }: { thread: SessionThread }) {
  return (
    <div className="flex flex-col p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-all shadow-md gap-space-xs cursor-pointer">
      <div className="flex items-start justify-between gap-space-sm">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <Icon
            name={thread.icon}
            className={`text-[16px] shrink-0 ${thread.iconColor}`}
          />
          <span className="font-body-md text-body-md text-on-surface font-medium truncate">
            {thread.title}
          </span>
        </div>
        {thread.active ? (
          <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary-container font-label-mono-xs text-label-mono-xs font-bold uppercase shrink-0">
            Active
          </span>
        ) : (
          <Icon
            name="chevron_right"
            className="text-[16px] text-on-surface-variant shrink-0"
          />
        )}
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
        {thread.preview}
      </p>
      {thread.attachment && (
        <div className="flex items-center gap-space-xs py-0.5">
          {/* Attachment thumbnail placeholder (original design used a remote image) */}
          <div className="w-12 h-8 rounded bg-surface-container-lowest shrink-0 shadow-inner flex items-center justify-center bg-linear-to-br from-secondary-container/40 to-surface-container-lowest">
            <Icon name="image" className="text-[14px] text-secondary/70" />
          </div>
          <span className="font-label-mono-xs text-label-mono-xs text-secondary truncate">
            {thread.attachment.label}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between pt-space-xs">
        <div className="flex items-center gap-1 flex-wrap">
          {thread.tags.map((tag) => (
            <span
              key={tag.label}
              className={`px-1.5 py-0.5 rounded bg-surface-container-low font-label-mono-xs text-label-mono-xs ${
                tag.color ? `${tag.color} font-medium` : "text-on-surface-variant"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant shrink-0">
          {thread.timeAgo}
        </span>
      </div>
    </div>
  );
}
