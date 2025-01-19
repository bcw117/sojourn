import { createClient } from "@/utils/supabase/server";

// const handleVote = (direction: number) => {
//   console.log(`Voted ${direction > 0 ? 'right' : 'left'}`)
//   if (currentIndex < DUMMY_LISTINGS.length - 1) {
//     setCurrentIndex(prev => prev + 1)
//   } else {
//     console.log("No more listings")
//     // You could reset to the beginning, or show a message to the user
//     // setCurrentIndex(0)
//   }
// }

export async function handleSignOut() {
  try {
    const response = await fetch("/api/signout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to sign out");
    }

    window.location.href = "/"; // Redirect after signing out
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};

export async function handleSwipe(
  swiperId: string,
  swipedId: string,
  action: "like" | "dislike",
  setCurrentIndex: (index: number) => void
) {
  setCurrentIndex(prev => prev + 1);  // Move to the next listing
  const supabase = await createClient();

  // Insert swipe action
  const { error } = await supabase
    .from("swipes")
    .insert({ swiper_id: swiperId, swiped_id: swipedId, action });

  if (error) {
    console.error("Error inserting swipe:", error);
    return;
  }

  // Check if there's a mutual like
  if (action === "like") {
    const { data: mutualSwipe } = await supabase
      .from("swipes")
      .select("*")
      .eq("swiper_id", swipedId)
      .eq("swiped_id", swiperId)
      .eq("action", "like")
      .single();

    if (mutualSwipe) {
      // Insert into matches table
      const { error: matchError } = await supabase.from("matches").insert({
        user1_id: swiperId,
        user2_id: swipedId,
      });

      if (matchError) {
        console.error("Error inserting match:", matchError);
      } else {
        console.log("Match found!");
      }
    }
  }
}

export async function getPotentialMatches(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .not("id", "eq", userId) // Exclude the current user
    .not(
      "id",
      "in",
      supabase
        .from("swipes")
        .select("swiped_id")
        .eq("swiper_id", userId)
        .map((swipe) => swipe.swiped_id)
    );

  if (error) {
    console.error("Error fetching potential matches:", error);
    return [];
  }

  return data;
}

export async function getMatches(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("matches")
    .select("user1_id, user2_id")
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

  if (error) {
    console.error("Error fetching matches:", error);
    return [];
  }

  return data.map((match) =>
    match.user1_id === userId ? match.user2_id : match.user1_id
  );
}
