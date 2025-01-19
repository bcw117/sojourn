"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreferenceProps } from "@/types/preferences";

export default function PersonalityPreference(props: PreferenceProps) {
  const [selectedPreference, setSelectedPreference] = useState<string | null>(
    null
  );

  const handlePreferenceClick = (preference: string) => {
    if (preference === "extroverts") {
      props.onChange(0);
    } else if (preference === "introverts") {
      props.onChange(2);
    } else {
      props.onChange(1);
    }

    setSelectedPreference(preference);
  };

  return (
    <div className="p-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Do you get along with extroverts or introverts?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant={
                selectedPreference === "extroverts" ? "default" : "outline"
              }
              onClick={() => handlePreferenceClick("extroverts")}
              className="w-full sm:w-auto"
            >
              Extroverts
            </Button>
            <Button
              variant={
                selectedPreference === "introverts" ? "default" : "outline"
              }
              onClick={() => handlePreferenceClick("introverts")}
              className="w-full sm:w-auto"
            >
              Introverts
            </Button>
            <Button
              variant={
                selectedPreference === "no-preference" ? "default" : "outline"
              }
              onClick={() => handlePreferenceClick("no-preference")}
              className="w-full sm:w-auto"
            >
              No Preference
            </Button>
          </div>
          {selectedPreference && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              {selectedPreference === "extroverts" &&
                "You prefer the company of outgoing and sociable people."}
              {selectedPreference === "introverts" &&
                "You prefer the company of reserved and thoughtful people."}
              {selectedPreference === "no-preference" &&
                "You enjoy the company of both extroverts and introverts equally."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
