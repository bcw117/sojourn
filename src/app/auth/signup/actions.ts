"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  // checking user entered appropriate data
  if (formData.get("password") !== formData.get("confirm_password")) {
    redirect("/auth/signup?error=password_mismatch");
  }

  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/auth/account-type");
}

// const searchParams = new URLSearchParams(window.location.search);
// const error = searchParams.get('error');
// if (error === 'password_mismatch') {
// }
