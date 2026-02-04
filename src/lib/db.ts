import { Pool, QueryResultRow } from "pg";

let pool: Pool | null = null;
let initPromise: Promise<void> | null = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }
    pool = new Pool({
      connectionString,
      max: 5,
    });
  }
  return pool;
}

export async function initDb() {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    const db = getPool();
    await db.query(`
      create table if not exists conversations (
        id uuid primary key,
        visitor_id text unique not null,
        created_at timestamptz default now(),
        last_message_at timestamptz default now()
      );
    `);
    await db.query(`
      create table if not exists messages (
        id uuid primary key,
        conversation_id uuid not null references conversations(id) on delete cascade,
        sender text not null,
        body text not null,
        created_at timestamptz default now()
      );
    `);
    await db.query(`
      create index if not exists messages_conversation_created_at_idx
        on messages (conversation_id, created_at);
    `);
    await db.query(`
      create index if not exists conversations_last_message_idx
        on conversations (last_message_at desc);
    `);
  })();

  return initPromise;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  const db = getPool();
  await initDb();
  return db.query<T>(text, params);
}
