"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Sender = "visitor" | "owner";

type Message = {
  id: string;
  sender: Sender;
  body: string;
  createdAt: string;
  pending?: boolean;
};

type ChatPanelProps = {
  conversationId: string;
  currentSender: Sender;
  title: string;
  subtitle?: string;
};

const MAX_MESSAGE_LENGTH = 2000;

export function ChatPanel({
  conversationId,
  currentSender,
  title,
  subtitle,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [hasNew, setHasNew] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  };

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    setIsNearBottom(nearBottom);
    if (nearBottom) {
      setHasNew(false);
    }
  };

  useEffect(() => {
    let active = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const loadMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/messages?conversationId=${conversationId}`,
          { cache: "no-store" },
        );
        const data = await readJson(res);
        if (!res.ok) {
          throw new Error(data?.error || "Failed to load messages");
        }
        if (active) {
          setMessages((prev) => {
            const pending = prev.filter((msg) => msg.pending);
            const next = (data.messages ?? []) as Message[];
            const nextIds = new Set(next.map((msg) => msg.id));
            const merged = [
              ...next,
              ...pending.filter((msg) => !nextIds.has(msg.id)),
            ];
            merged.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            );
            return merged;
          });
          requestAnimationFrame(scrollToBottom);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load messages",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMessages();
    intervalId = setInterval(loadMessages, 3000);
    return () => {
      active = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [conversationId]);

  useEffect(() => {
    if (isNearBottom) {
      requestAnimationFrame(scrollToBottom);
    } else {
      setHasNew(true);
    }
  }, [messages.length, isNearBottom]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      setError("Message is too long.");
      return;
    }

    setError(null);
    setSending(true);
    setInput("");

    const tempId = `temp-${Date.now()}`;
    const optimistic: Message = {
      id: tempId,
      sender: currentSender,
      body: trimmed,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setMessages((prev) => [...prev, optimistic]);
    requestAnimationFrame(scrollToBottom);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          sender: currentSender,
          body: trimmed,
        }),
      });
      const data = await readJson(res);
      if (!res.ok) {
        throw new Error(data?.error || "Failed to send");
      }
      setMessages((prev) => {
        const replaced = prev.map((msg) =>
          msg.id === tempId ? data.message : msg,
        );
        const seen = new Set<string>();
        return replaced.filter((msg) => {
          if (seen.has(msg.id)) return false;
          seen.add(msg.id);
          return true;
        });
      });
    } catch (err) {
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      setError(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden border-b bg-card md:h-full md:rounded-xl md:border">
      <div className="border-b px-4 py-3">
        <div className="text-sm font-semibold">{title}</div>
        {subtitle ? (
          <div className="text-xs text-muted-foreground">{subtitle}</div>
        ) : null}
      </div>
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {/* {loading ? (
          <div className="text-sm text-muted-foreground">Loading messages...</div>
        ) : null} */}
        {!loading && messages.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No messages yet. Start the conversation.
          </div>
        ) : null}
        {messages.map((message) => {
          const isSelf = message.sender === currentSender;
          return (
            <div
              key={message.id}
              className={cn(
                "flex w-full flex-col gap-1",
                isSelf ? "items-end" : "items-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
                  isSelf
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                  message.pending && "opacity-60",
                )}
              >
                {message.body}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {formatTime(message.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
      {hasNew ? (
        <div className="border-t px-4 py-2">
          <Button
            variant="secondary"
            size="sm"
            className="w-full"
            onClick={() => {
              setHasNew(false);
              scrollToBottom();
            }}
          >
            New messages
          </Button>
        </div>
      ) : null}
      <div className="border-t p-3">
        {error ? (
          <div className="mb-2 text-xs text-destructive">{error}</div>
        ) : null}
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            maxLength={MAX_MESSAGE_LENGTH}
            className="flex-1 resize-none"
          />
          <Button
            onMouseDown={(e) => e.preventDefault()}
            onClick={sendMessage}
            disabled={sending || !input.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatTime(value: string) {
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
