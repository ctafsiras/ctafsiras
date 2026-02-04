"use client";

import { useEffect, useMemo, useState } from "react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { cn } from "@/lib/utils";

type Conversation = {
  id: string;
  visitorId: string;
  createdAt: string;
  lastMessageAt: string;
  lastMessage: string | null;
  lastSender: string | null;
};

export default function MessagesClient() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await fetch("/api/conversations", { cache: "no-store" });
        const data = await readJson(res);
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load conversations");
        }
        if (!mounted) return;
        const list = (data.conversations ?? []) as Conversation[];
        setConversations(list);
        setActiveId((prev) => {
          if (prev && list.some((item) => item.id === prev)) {
            return prev;
          }
          return list[0]?.id ?? null;
        });
        setError(null);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();
    const interval = setInterval(load, 4000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeId) ?? null,
    [conversations, activeId],
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Reply to people who messaged you.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex h-[70vh] flex-col overflow-hidden rounded-xl border bg-card">
          <div className="border-b px-4 py-3 text-sm font-semibold">
            Conversations
          </div>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                Loading...
              </div>
            ) : null}
            {error ? (
              <div className="px-4 py-3 text-sm text-destructive">{error}</div>
            ) : null}
            {!loading && conversations.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                No conversations yet.
              </div>
            ) : null}
            {conversations.map((conversation) => {
              const isActive = conversation.id === activeId;
              const preview =
                conversation.lastMessage?.slice(0, 60) ?? "No messages yet";
              return (
                <button
                  key={conversation.id}
                  onClick={() => setActiveId(conversation.id)}
                  className={cn(
                    "w-full border-b px-4 py-3 text-left transition",
                    isActive
                      ? "bg-muted"
                      : "hover:bg-muted/60 focus-visible:bg-muted/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium">
                      Visitor {conversation.visitorId.slice(0, 8)}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {formatTime(conversation.lastMessageAt)}
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {preview}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {activeConversation ? (
          <div className="h-[70vh]">
            <ChatPanel
              conversationId={activeConversation.id}
              currentSender="owner"
              title={`Visitor ${activeConversation.visitorId.slice(0, 8)}`}
              subtitle="Private admin view"
            />
          </div>
        ) : (
          <div className="flex h-[70vh] items-center justify-center rounded-xl border bg-card text-sm text-muted-foreground">
            Select a conversation to start replying.
          </div>
        )}
      </div>
    </div>
  );
}

function formatTime(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
