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
          setMessages(data.messages ?? []);
          requestAnimationFrame(scrollToBottom);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load messages");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadMessages();
    return () => {
      active = false;
    };
  }, [conversationId]);

  useEffect(() => {
    const source = new EventSource(
      `/api/messages/stream?conversationId=${conversationId}`,
    );

    const onMessage = (event: MessageEvent) => {
      if (!event.data) return;
      try {
        const next = JSON.parse(event.data) as Message;
        setMessages((prev) => {
          if (prev.some((msg) => msg.id === next.id)) {
            return prev;
          }
          return [...prev, next];
        });
      } catch {
        // ignore malformed events
      }
    };

    source.addEventListener("message", onMessage);
    source.addEventListener("error", () => {
      // EventSource will auto-reconnect
    });

    return () => {
      source.removeEventListener("message", onMessage);
      source.close();
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
      setMessages((prev) =>
        prev.map((msg) => (msg.id === tempId ? data.message : msg)),
      );
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
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card">
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
        {loading ? (
          <div className="text-sm text-muted-foreground">Loading messages...</div>
        ) : null}
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
      <div className="border-t p-4">
        <div className="flex flex-col gap-2">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={2}
            maxLength={MAX_MESSAGE_LENGTH}
            className="resize-none"
          />
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs text-muted-foreground">
              {error ? error : `${input.length}/${MAX_MESSAGE_LENGTH}`}
            </div>
            <Button onClick={sendMessage} disabled={sending || !input.trim()}>
              Send
            </Button>
          </div>
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
