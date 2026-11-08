"use client";

import { useEffect, useRef, useState } from "react";
import TelemetryBar from "./TelemetryBar";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import {
  INITIAL_MESSAGES,
  type ChatMessage as ChatMessageType,
} from "@/lib/mock-data";

const SIMULATED_REPLY =
  "Acknowledged. The event generator yields control back to the asyncio loop between chunks, so the SSE pipe applies natural backpressure: when the client socket buffer saturates, awaiting the next yield suspends token emission until the transport drains, keeping memory flat under burst load.";

function nowTimestamp() {
  return new Date().toLocaleTimeString("en-GB", { hour12: false });
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessageType[]>(INITIAL_MESSAGES);
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopStreaming = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStreaming(false);
    setMessages((prev) =>
      prev.map((m) => (m.streaming ? { ...m, streaming: false } : m))
    );
  };

  const handleSend = (text: string) => {
    const userMessage: ChatMessageType = {
      id: `u-${Date.now()}`,
      role: "user",
      text,
      timestamp: nowTimestamp(),
    };
    const assistantId = `a-${Date.now()}`;
    const assistantMessage: ChatMessageType = {
      id: assistantId,
      role: "assistant",
      text: "",
      timestamp: nowTimestamp(),
      streaming: true,
    };
    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setStreaming(true);

    // Simulate SSE token streaming by appending words on an interval
    const tokens = SIMULATED_REPLY.split(" ");
    let index = 0;
    intervalRef.current = setInterval(() => {
      index += 1;
      const partial = tokens.slice(0, index).join(" ");
      const done = index >= tokens.length;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, text: partial, streaming: !done } : m
        )
      );
      if (done) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setStreaming(false);
      }
    }, 60);
  };

  return (
    <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
      <div className="flex flex-col w-full">
        <TelemetryBar />
        {/* Message Stream Canvas */}
        <div className="px-margin pt-space-md pb-36 flex flex-col gap-space-lg w-full">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={bottomRef} />
        </div>
        <ChatInput streaming={streaming} onSend={handleSend} onStop={stopStreaming} />
      </div>
    </main>
  );
}
