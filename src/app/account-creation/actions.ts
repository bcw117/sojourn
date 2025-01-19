"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type UserData = {
  userType: string;
  location: string;
  gender: boolean;
  rentPrice?: number;
  rooms?: number;
  sharedRoomPreference?: number;
  washroomPreference?: number;
  address?: string;
};

export async function insert(data: UserData) {
  const supabase = await createClient();

  // Get the current user's ID
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error('Error getting user:', userError);
    throw new Error('Error getting user');; 
    redirect("/error");
  }
  

  if (data.userType === "sublet"){
    console.log("reached account sublet insert")
    const { error } = await supabase
    .from('ACCOUNT_SUBLET')
    .insert({
      id: user.id,
      location: data.location,
      gender: data.gender,
      rent_price: data.rentPrice,
      shared_washroom: data.washroomPreference,
      shared_bedroom: data.sharedRoomPreference,
      address: data.address
    });
    console.log(error)
  } else if (data.userType === "renter"){
    console.log("reached account tenent insert")
    const { error } = await supabase
    .from('ACCOUNT_TENET')
    .insert({
      id: user.id,
      location: data.location,
      gender: data.gender,
      rent_price: data.rentPrice,
      rooms: data.rooms,
      shared_room: data.sharedRoomPreference,
      shared_washroom: data.washroomPreference
    });
    console.log(error);
  }

  console.log(user.id); 
  

 

  revalidatePath("/", "layout");
  return { success: true };
}