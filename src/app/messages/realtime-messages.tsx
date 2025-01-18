"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type Message = {
  id: string;
  created_at: string;
  text: string;
  is_edited: boolean;
  sent_by: string;
};

export default function MessagesRealtime({
  serverMessages,
}: {
  serverMessages: Message[];
}) {
  const supabase = createClient();
  const [posts, setPosts] = useState(serverMessages);

  useEffect(() => {
    const channel = supabase
      .channel("realtime messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "MESSAGES",
        },
        (payload) => {
          setPosts([...posts, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, posts, setPosts]);
  return <div>{JSON.stringify(posts, null, 2)}</div>;
}
