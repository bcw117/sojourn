import { createClient } from "@/utils/supabase/server";

type PreferenceDiff = {
  user_id: string;
  user_type: string;
  quiet_diff: number;
  socialness_diff: number;
  // Add other preference differences here
};

function rankPreferences(preferences: PreferenceDiff[], ranking: (keyof PreferenceDiff)[]): PreferenceDiff[] {
  return preferences.sort((a, b) => {
    for (const key of ranking) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
    }
    return 0;
  });
}

// Function to fetch and rank preferences
async function fetchAndRankPreferences(userId: string, userType: string): Promise<PreferenceDiff[]> {
  const supabase = await createClient();

  let ranking: (keyof PreferenceDiff)[] = [];
  let oppositeUserType: string;

  if (userType === 'sublet') {
    // Fetch user ranking preferences for sublet
    const { data: rankingData, error: rankingError } = await supabase
      .from('PREFERENCE_SUBLET')
      .select('ranking')
      .eq('user_id', userId)
      .single();

    if (rankingError || !rankingData) {
      console.error('Error fetching ranking preferences:', rankingError);
      return [];
    }

    ranking = rankingData.ranking;
    oppositeUserType = 'renter';
  } else if (userType === 'renter') {
    // Fetch user ranking preferences for renter
    const { data: rankingData, error: rankingError } = await supabase
      .from('PREFERENCES_TENET')
      .select('ranking')
      .eq('user_id', userId)
      .single();

    if (rankingError || !rankingData) {
      console.error('Error fetching ranking preferences:', rankingError);
      return [];
    }

    ranking = rankingData.ranking;
    oppositeUserType = 'sublet';
  } else {
    console.error('Invalid user type');
    return [];
  }

  // Fetch preference differences
  const { data, error } = await supabase.rpc('get_preference_diffs');

  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }

  // Rank preferences based on the fetched ranking
  const rankedPreferences = rankPreferences(data as PreferenceDiff[], ranking);

  // Filter and return the list of user IDs for the opposite type
  return rankedPreferences.filter(pref => pref.user_type === oppositeUserType);
}

// Usage
const userId = 'user-id-placeholder'; // Replace with actual user ID
const userType = 'sublet'; // Replace with actual user type

fetchAndRankPreferences(userId, userType).then((sortedResults) => {
  console.log(sortedResults);
});