import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const supabase = createClient();

    const { error } = await (await supabase).auth.signOut();
    return NextResponse.json(
      { message: "Signed out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
