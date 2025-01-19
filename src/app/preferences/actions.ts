"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type FormData = {
  noise_level: number;
  social: number;
  cleanliness: number;
  sleep_schedule: number;
  ranking: string[];
};

export async function formAction(formData: FormData) {
  console.log(formData);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const id = user.id;

    const dataWithId = {
      id, // Add the user ID
      ...formData, // Spread the original formData properties
    };

    const { error } = await supabase
      .from("PREFERENCES_SUBLET")
      .insert(dataWithId);
    console.log(error);
  }

  redirect("/");
}
