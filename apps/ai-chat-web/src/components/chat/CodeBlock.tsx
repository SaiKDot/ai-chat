"use client";

import { useState } from "react";
import Icon from "../Icon";
import { PYTHON_CODE_LINES } from "@/lib/mock-data";

export default function CodeBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const raw = PYTHON_CODE_LINES.map((line) =>
      line.tokens.map((t) => t.text).join("")
    ).join("\n");
    navigator.clipboard?.writeText(raw).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="rounded-lg bg-surface-container-lowest overflow-hidden flex flex-col shadow-sm">
      {/* Code Block Header */}
      <div className="bg-surface-container-high px-space-md py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-error/70"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary/70"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70"></span>
          <span className="font-label-mono-xs text-label-mono-xs text-on-surface-variant uppercase tracking-wider ml-1">
            python
          </span>
        </div>
        <button
          onClick={handleCopy}
          title="Copy code"
          className={`flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container hover:bg-surface-bright active:scale-95 transition-all hover:text-on-surface ${
            copied ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          <Icon name={copied ? "check" : "content_copy"} className="text-[13px]" />
          <span className="font-label-mono-xs text-label-mono-xs">
            {copied ? "COPIED" : "COPY"}
          </span>
        </button>
      </div>
      {/* Code Display with Line Numbers */}
      <div className="p-space-sm overflow-x-auto text-on-surface font-code-md text-code-md leading-relaxed flex gap-3">
        <div className="select-none text-outline-variant flex flex-col text-right font-label-mono-xs text-label-mono-xs pt-0.5 opacity-60">
          {PYTHON_CODE_LINES.map((_, i) => (
            <span key={i} className="leading-relaxed text-code-md">
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
        <pre className="flex-1 whitespace-pre font-code-md text-code-md">
          <code>
            {PYTHON_CODE_LINES.map((line, i) => (
              <span key={i} className="block">
                {line.tokens.map((token, j) => (
                  <span key={j} className={token.color}>
                    {token.text}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
