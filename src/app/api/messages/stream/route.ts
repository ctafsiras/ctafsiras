import { initDb, query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await initDb();

  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId")?.trim();

  if (!conversationId) {
    return new Response("conversationId is required", { status: 400 });
  }

  const encoder = new TextEncoder();
  const lastEventId = request.headers.get("last-event-id");
  let lastSentAt = new Date(0);
  if (lastEventId) {
    const parsed = Number(lastEventId);
    if (!Number.isNaN(parsed)) {
      lastSentAt = new Date(parsed);
    }
  }

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;

      const send = (chunk: string) => {
        controller.enqueue(encoder.encode(chunk));
      };

      const tick = async () => {
        if (closed) {
          return;
        }

        try {
          const result = await query<{
            id: string;
            conversationId: string;
            sender: "visitor" | "owner";
            body: string;
            createdAt: string;
          }>(
            `
              select
                id,
                conversation_id as "conversationId",
                sender,
                body,
                created_at as "createdAt"
              from messages
              where conversation_id = $1
                and created_at >= $2
              order by created_at asc
              limit 100;
            `,
            [conversationId, lastSentAt.toISOString()],
          );

          for (const message of result.rows) {
            const createdAt = new Date(message.createdAt);
            lastSentAt = createdAt;
            send(
              `event: message\nid: ${createdAt.getTime()}\ndata: ${JSON.stringify(
                message,
              )}\n\n`,
            );
          }

          send(":keep-alive\n\n");
        } catch {
          send(`event: error\ndata: {"message":"stream error"}\n\n`);
        } finally {
          if (!closed) {
            setTimeout(tick, 1500);
          }
        }
      };

      send("event: ready\ndata: {}\n\n");
      tick();

      request.signal.addEventListener("abort", () => {
        closed = true;
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
