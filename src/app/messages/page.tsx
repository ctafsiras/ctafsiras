import { redirect } from "next/navigation";
import MessagesClient from "./messages-client";

type MessagesPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function MessagesPage({ searchParams }: MessagesPageProps) {
  const tokenParam = searchParams?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  const secret = process.env.SECRET_TOKEN;

  if (!secret || secret.length === 0 || token !== secret) {
    redirect("/message");
  }

  return <MessagesClient />;
}
