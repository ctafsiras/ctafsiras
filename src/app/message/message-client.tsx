"use client";

import { useEffect, useState } from "react";
import { ChatPanel } from "@/components/chat/chat-panel";

const STORAGE_KEY = "portfolio-visitor-id";

export default function MessageClient() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const visitorId = ensureVisitorId();
        const res = await fetch("/api/conversations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
        });
        const data = await readJson(res);
        if (!res.ok) {
          throw new Error(data?.error || "Failed to start conversation");
        }
        setConversationId(data.conversationId);
        setStatus("ready");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setStatus("error");
      }
    };

    init();
  }, []);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-sm text-muted-foreground">Opening chat...</div>
      </div>
    );
  }

  if (status === "error" || !conversationId) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-sm text-destructive">
          {error ?? "Unable to open chat."}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <ChatPanel
          conversationId={conversationId}
          currentSender="visitor"
          title="Chat with Tafsir"
          subtitle="I usually reply within a day."
        />
      </div>
    </div>
  );
}

function ensureVisitorId() {
  if (typeof window === "undefined") {
    return "server";
  }
  let id = localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = generateVisitorId();
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

function generateVisitorId() {
  if (typeof globalThis !== "undefined") {
    const cryptoObj = globalThis.crypto;
    if (cryptoObj?.randomUUID) {
      return cryptoObj.randomUUID();
    }
    if (cryptoObj?.getRandomValues) {
      const bytes = new Uint8Array(16);
      cryptoObj.getRandomValues(bytes);
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
      const hex = Array.from(bytes, (byte) =>
        byte.toString(16).padStart(2, "0"),
      ).join("");
      return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
        12,
        16,
      )}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }
  }
  return `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

async function readJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
