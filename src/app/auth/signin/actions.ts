"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // Extract form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate form inputs
  if (!email || !password) {
    return redirect("/error");
  }

  // Sign in user
  const { error: signInError } = await (
    await supabase
  ).auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    return redirect("/error");
  }

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await (await supabase).auth.getUser();

  if (userError || !user) {
    return redirect("/error");
  }

  // Check user accounts and redirect accordingly
  if (await checkAccount(user.id, "ACCOUNT_TENET")) {
    if (await checkAccount(user.id, "PREFERENCES_TENET")) {
      return redirect("/home");
    }
    return redirect("/auth/preferences");
  }

  if (await checkAccount(user.id, "ACCOUNT_SUBLET")) {
    if (await checkAccount(user.id, "PREFERENCES_SUBLET")) {
      return redirect("/home");
    }
    return redirect("/auth/preferences");
  }

  // Redirect if no account type matches
  return redirect("/auth/account-type");
}

async function checkAccount(
  userId: string,
  tableName: string
): Promise<boolean> {
  const supabase = createClient();

  const { data, error } = await (await supabase)
    .from(tableName)
    .select("id")
    .eq("id", userId)
    .limit(1);

  if (error) {
    console.error(`Error checking ${tableName} for user ID:`, error.message);
    return false;
  }

  return data.length > 0;
}
