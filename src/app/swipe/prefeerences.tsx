'use client';

import { useEffect, useState } from 'react';

interface PreferenceDiff {
  user_id: string;
  [key: string]: any;
}
import { useRouter } from 'next/router';
import { fetchAndRankPreferences } from '../swipe/matchpreferences';

export default function Preferences() {
  const router = useRouter();
  const { userId, userType } = router.query;

  const [sortedResults, setSortedResults] = useState<PreferenceDiff[]>([]);

  useEffect(() => {
    if (userId && userType) {
      fetchAndRankPreferences(userId as string, userType as string).then(setSortedResults);
    }
  }, [userId, userType]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Matched Preferences</h1>
      <ul>
        {sortedResults.map((result, index) => (
          <li key={index}>
            {result.user_id} - {JSON.stringify(result)}
          </li>
        ))}
      </ul>
    </div>
  );
}