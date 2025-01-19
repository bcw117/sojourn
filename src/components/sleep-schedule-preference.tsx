"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Moon, Clock } from "lucide-react";
import { PreferenceProps } from "@/types/preferences";

const sleepOptions = [
  {
    value: "early",
    label: "I usually wake up early in the morning",
    icon: Sun,
    numericValue: 0,
  },
  {
    value: "flexible",
    label: "I have a flexible sleep schedule",
    icon: Clock,
    numericValue: 1,
  },
  {
    value: "late",
    label: "I usually go to bed late at night",
    icon: Moon,
    numericValue: 2,
  },
];

export default function SleepSchedulePreference(props: PreferenceProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);

  const handleScheduleClick = (value: string) => {
    const option = sleepOptions.find((option) => option.value === value);

    if (option) {
      // Call props.onChange with the numeric value
      props.onChange(option.numericValue);
      setSelectedSchedule(value); // Update the selected schedule
    }
  };

  return (
    <div className="p-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            What's your preferred sleep schedule?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4">
            {sleepOptions.map((option) => (
              <Button
                key={option.value}
                variant={
                  selectedSchedule === option.value ? "default" : "outline"
                }
                onClick={() => handleScheduleClick(option.value)}
                className="w-full justify-start text-left"
              >
                <option.icon className="mr-2 h-4 w-4" />
                {option.label}
              </Button>
            ))}
          </div>
          {selectedSchedule && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              {selectedSchedule === "early" &&
                "You're an early bird! You prefer to start your day with the sunrise."}
              {selectedSchedule === "flexible" &&
                "You have an adaptable sleep routine that varies based on your needs."}
              {selectedSchedule === "late" &&
                "You're a night owl! You tend to be more active and productive in the evening hours."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
