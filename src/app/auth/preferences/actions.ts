"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type FormData = {
  userType: string;
  bio: string;
  noise_level: number;
  social: string;
  cleanliness: number;
  sleep_schedule: string;
  ranking: string[];
};

export async function formAction(formData: FormData) {
  try {
    console.log(formData);
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const id = user.id;

      const { userType, ...filteredData } = formData;

      const dataWithId = {
        id, // Add the user ID
        ...filteredData, // Spread the filtered FormData properties
      };

      if (userType === "tenant") {
        const { error } = await supabase
          .from("PREFERENCES_TENET")
          .insert(dataWithId);
      } else {
        const { error } = await supabase
          .from("PREFERENCES_SUBLET")
          .insert(dataWithId);
      }
    }
  } catch (e: any) {
    console.log(e.message);
  }

  redirect("/home");
}
