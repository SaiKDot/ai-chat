"use client";

import { useRef, useState } from "react";
import Icon from "../Icon";

interface ChatInputProps {
  streaming: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
}

export default function ChatInput({ streaming, onSend, onStop }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (streaming) {
      onStop();
      return;
    }
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <aside className="fixed bottom-16 left-0 right-0 z-40 px-margin pb-space-sm bg-linear-to-t from-surface via-surface/95 to-transparent pt-3 pointer-events-none">
      <div className="pointer-events-auto bg-surface-container-high/95 backdrop-blur-xl rounded-2xl p-space-sm shadow-xl flex flex-col gap-space-xs">
        {/* Top Action Strip & Mode Switches */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Attach context file or schema"
              className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary active:scale-95 transition-all"
            >
              <Icon name="add" className="text-[18px]" />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container hover:bg-surface-bright active:scale-95 transition-all">
              <Icon name="terminal" className="text-[13px] text-secondary" />
              <span className="font-label-mono-xs text-label-mono-xs text-on-surface uppercase">
                Dev Mode: Strict
              </span>
              <Icon name="expand_more" className="text-[12px] text-outline" />
            </button>
          </div>
          <div className="flex items-center gap-1 font-label-mono-xs text-label-mono-xs text-outline">
            <Icon name="tune" className="text-[13px]" />
            <span>CTX: 4.2k / 128k</span>
          </div>
        </div>
        {/* Core Input Row */}
        <div className="flex items-end gap-space-sm bg-surface-container rounded-xl p-1.5">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Ask follow-up or debug code..."
            rows={1}
            className="flex-1 bg-transparent border-0 resize-none font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none px-2 py-1.5 max-h-24 leading-snug"
          />
          <button
            aria-label="Speech to text input"
            className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface active:scale-90 transition-all flex items-center justify-center"
          >
            <Icon name="mic" className="text-[20px]" />
          </button>
          {/* Send / Stop Inference Button */}
          <button
            aria-label={streaming ? "Stop Streaming" : "Send"}
            onClick={handleSubmit}
            className={`relative w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 active:scale-95 transition-transform ${
              streaming ? "shadow-[0_0_14px_rgba(78,222,163,0.4)]" : ""
            }`}
          >
            <Icon
              name={streaming ? "stop" : "arrow_upward"}
              className="text-[18px]"
            />
            {streaming && (
              <span className="absolute -inset-1 rounded-xl bg-primary/20 animate-ping pointer-events-none"></span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
