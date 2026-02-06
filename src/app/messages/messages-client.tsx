"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { cn } from "@/lib/utils";

type Conversation = {
  id: string;
  visitorId: string;
  displayName: string | null;
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

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

  function getDisplayLabel(conv: Conversation) {
    return conv.displayName || `Visitor ${conv.visitorId.slice(0, 8)}`;
  }

  function startEditing(conv: Conversation, e: React.MouseEvent) {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditValue(conv.displayName || "");
    setTimeout(() => editInputRef.current?.focus(), 0);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditValue("");
  }

  async function saveDisplayName(conversationId: string) {
    const trimmed = editValue.trim();
    setEditingId(null);

    // Optimistically update local state
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, displayName: trimmed || null }
          : c,
      ),
    );

    try {
      const res = await fetch("/api/conversations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          displayName: trimmed,
        }),
      });
      if (!res.ok) {
        console.error("Failed to save display name");
      }
    } catch {
      console.error("Failed to save display name");
    }
  }

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
              const isEditing = editingId === conversation.id;
              const preview =
                conversation.lastMessage?.slice(0, 60) ?? "No messages yet";
              return (
                <button
                  key={conversation.id}
                  onClick={() => setActiveId(conversation.id)}
                  className={cn(
                    "group w-full border-b px-4 py-3 text-left transition",
                    isActive
                      ? "bg-muted"
                      : "hover:bg-muted/60 focus-visible:bg-muted/60",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-center gap-1.5">
                      {isEditing ? (
                        <input
                          ref={editInputRef}
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              saveDisplayName(conversation.id);
                            } else if (e.key === "Escape") {
                              cancelEditing();
                            }
                          }}
                          onBlur={() => saveDisplayName(conversation.id)}
                          onClick={(e) => e.stopPropagation()}
                          maxLength={100}
                          placeholder={`Visitor ${conversation.visitorId.slice(0, 8)}`}
                          className="h-6 w-full min-w-0 rounded border bg-background px-1.5 text-sm font-medium outline-none focus:ring-1 focus:ring-ring"
                        />
                      ) : (
                        <>
                          <span className="truncate text-sm font-medium">
                            {getDisplayLabel(conversation)}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => startEditing(conversation, e)}
                            className="shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                            title="Edit name"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                              <path d="m15 5 4 4" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    <div className="shrink-0 text-[11px] text-muted-foreground">
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
              title={getDisplayLabel(activeConversation)}
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
