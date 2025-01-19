"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { UserData } from "@/types/account";

export async function insert(data: UserData) {
  const supabase = await createClient();

  // Get the current user's ID
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error getting user:", userError);
    throw new Error("Error getting user");
    redirect("/error");
  }

  if (data.userType === "sublet") {
    console.log("reached account sublet insert");
    const { error } = await supabase.from("ACCOUNT_SUBLET").insert({
      id: user.id,
      province: data.province,
      city: data.city,
      gender: data.gender,
      rent_price: data.rentPrice,
      shared_washroom: data.numBathrooms,
      shared_room: data.numRooms,
      address: data.address,
    });
    console.log(error);
  } else if (data.userType === "tenant") {
    console.log("reached account tenant insert");
    const { error } = await supabase.from("ACCOUNT_TENET").insert({
      id: user.id,
      province: data.province,
      city: data.city,
      gender: data.gender,
      rent_price_min: data.minRentPrice,
      rent_price_max: data.maxRentPrice,
      rooms: data.numRoomPref,
      bathrooms: data.numBathroomPref,
    });
    console.log(error);
  }

  revalidatePath("/", "layout");
  redirect(`/auth/preferences?type=${data.userType}`);
}
