import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { initDb, query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await initDb();

    const result = await query<{
      id: string;
      visitorId: string;
      createdAt: string;
      lastMessageAt: string;
      lastMessage: string | null;
      lastSender: string | null;
      lastMessageCreatedAt: string | null;
    }>(`
      select
        c.id,
        c.visitor_id as "visitorId",
        c.created_at as "createdAt",
        c.last_message_at as "lastMessageAt",
        m.body as "lastMessage",
        m.sender as "lastSender",
        m.created_at as "lastMessageCreatedAt"
      from conversations c
      left join lateral (
        select body, sender, created_at
        from messages
        where conversation_id = c.id
        order by created_at desc
        limit 1
      ) m on true
      order by c.last_message_at desc
      limit 200;
    `);

    return NextResponse.json({ conversations: result.rows });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await initDb();

    const body = await request.json().catch(() => null);
    const visitorId =
      typeof body?.visitorId === "string" ? body.visitorId.trim() : "";

    if (!visitorId || visitorId.length > 128) {
      return NextResponse.json(
        { error: "visitorId is required" },
        { status: 400 },
      );
    }

    const existing = await query<{ id: string }>(
      "select id from conversations where visitor_id = $1",
      [visitorId],
    );

    if (existing.rowCount) {
      return NextResponse.json({ conversationId: existing.rows[0].id });
    }

    const id = randomUUID();
    await query(
      "insert into conversations (id, visitor_id) values ($1, $2)",
      [id, visitorId],
    );

    return NextResponse.json({ conversationId: id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
