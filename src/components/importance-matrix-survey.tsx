"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { PreferenceProps } from "@/types/preferences";

interface Rating {
  importance: "very-important" | "somewhat-important" | "not-important" | ""; // Explicitly define importance types
}

interface Ratings {
  [key: string]: Rating;
}

export default function ImportanceMatrixSurvey(props: PreferenceProps) {
  const [ratings, setRatings] = useState<Ratings>({
    noisePreference: { importance: "" },
    personalityPreference: { importance: "" },
    cleanliness: { importance: "" },
    sleepSchedule: { importance: "" },
  });

  const importanceOrder: Record<Rating["importance"], number> = {
    "very-important": 1,
    "somewhat-important": 2,
    "not-important": 3,
    "": 4, // Default for unselected
  };

  const handleRatingChange = (
    category: string,
    value: Rating["importance"]
  ) => {
    setRatings((prev) => ({
      ...prev,
      [category]: { importance: value },
    }));

    // Call `props.onChange` with the ordered preferences
    const orderedPreferences = getOrderedPreferences({
      ...ratings,
      [category]: { importance: value },
    });
    props.onChange(orderedPreferences);
  };

  const getOrderedPreferences = (updatedRatings: Ratings) => {
    return Object.entries(updatedRatings)
      .filter(([, value]) => value.importance !== "") // Include only selected preferences
      .sort(
        ([, a], [, b]) =>
          importanceOrder[a.importance] - importanceOrder[b.importance]
      )
      .map(([key]) => key.replace(/Preference|Schedule/, "").toLowerCase()); // Transform keys to readable names
  };

  return (
    <div className="p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            How important are these factors to you?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2 min-w-[200px]">Factor</th>
                  <th className="text-center p-2 min-w-[120px]">
                    Very Important
                  </th>
                  <th className="text-center p-2 min-w-[120px]">
                    Somewhat Important
                  </th>
                  <th className="text-center p-2 min-w-[120px]">
                    Not Important
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "noisePreference", label: "Quiet environment" },
                  {
                    id: "personalityPreference",
                    label: "Getting along with extroverts/introverts",
                  },
                  { id: "cleanliness", label: "Cleanliness of living space" },
                  { id: "sleepSchedule", label: "Consistent sleep schedule" },
                ].map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 1 ? "bg-muted/50" : ""}
                  >
                    <td className="p-2">{item.label}</td>
                    {[
                      "very-important",
                      "somewhat-important",
                      "not-important",
                    ].map((importance) => (
                      <td key={importance} className="text-center p-2">
                        <RadioGroup
                          value={ratings[item.id].importance}
                          onValueChange={(value) =>
                            handleRatingChange(
                              item.id,
                              value as Rating["importance"]
                            )
                          }
                          className="flex justify-center"
                        >
                          <RadioGroupItem
                            value={importance}
                            id={`${item.id}-${importance}`}
                            className="h-4 w-4"
                          />
                        </RadioGroup>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
