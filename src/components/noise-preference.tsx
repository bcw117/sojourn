"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume2, Volume1, VolumeX } from "lucide-react";
import { PreferenceProps } from "@/types/preferences";

export default function NoisePreference(props: PreferenceProps) {
  const [value, setValue] = useState([50]);
  const [preference, setPreference] = useState("neutral");

  useEffect(() => {
    if (value[0] < 33) {
      setPreference("noisy");
      props.onChange(0);
    } else if (value[0] > 66) {
      setPreference("quiet");
      props.onChange(2);
    } else {
      setPreference("neutral");
      props.onChange(1);
    }
  }, [value]);

  return (
    <div className="p-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            How do you prefer your environment?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <Volume2 className="h-6 w-6 text-muted-foreground" />
            <Volume1 className="h-6 w-6 text-muted-foreground" />
            <VolumeX className="h-6 w-6 text-muted-foreground" />
          </div>

          <Slider
            defaultValue={[50]}
            value={value}
            onValueChange={setValue}
            max={100}
            step={1}
            className="py-4"
          />

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">I prefer very noisy</span>
            <span className="text-muted-foreground">
              I prefer complete silence
            </span>
          </div>

          <div className="text-center text-sm">
            {preference === "noisy" && (
              <p>You prefer a lively, energetic environment</p>
            )}
            {preference === "neutral" && (
              <p>You prefer a balanced noise level</p>
            )}
            {preference === "quiet" && (
              <p>You prefer a peaceful, quiet environment</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
