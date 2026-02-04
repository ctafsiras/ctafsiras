import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { initDb, query } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await initDb();

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId")?.trim();

    if (!conversationId) {
      return NextResponse.json(
        { error: "conversationId is required" },
        { status: 400 },
      );
    }

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
        order by created_at asc
        limit 500;
      `,
      [conversationId],
    );

    return NextResponse.json({ messages: result.rows });
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
    const conversationId =
      typeof body?.conversationId === "string" ? body.conversationId.trim() : "";
    const sender = body?.sender === "owner" ? "owner" : "visitor";
    const messageBody = typeof body?.body === "string" ? body.body.trim() : "";

    if (!conversationId || !messageBody) {
      return NextResponse.json(
        { error: "conversationId and body are required" },
        { status: 400 },
      );
    }

    if (messageBody.length > 2000) {
      return NextResponse.json(
        { error: "message is too long" },
        { status: 400 },
      );
    }

    const conversationExists = await query<{ id: string }>(
      "select id from conversations where id = $1",
      [conversationId],
    );

    if (!conversationExists.rowCount) {
      return NextResponse.json(
        { error: "conversation not found" },
        { status: 404 },
      );
    }

    const id = randomUUID();
    await query(
      `
        insert into messages (id, conversation_id, sender, body)
        values ($1, $2, $3, $4);
      `,
      [id, conversationId, sender, messageBody],
    );
    await query(
      "update conversations set last_message_at = now() where id = $1",
      [conversationId],
    );

    return NextResponse.json({
      message: {
        id,
        conversationId,
        sender,
        body: messageBody,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 },
    );
  }
}
