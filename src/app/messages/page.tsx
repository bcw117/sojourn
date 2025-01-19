import { createClient } from "@/utils/supabase/server";
import React from "react";
import MessagesRealtime from "./realtime-messages";

export const revalidate = 0;

const Page = async () => {
  const supabase = createClient();
  const { data } = await (await supabase).from("MESSAGES").select();
  return <MessagesRealtime serverMessages={data ?? []} />;
};

export default Page;
