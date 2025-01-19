"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brush, Trash, Trash2 } from "lucide-react";
import { PreferenceProps } from "@/types/preferences";

const cleanlinessOptions = [
  { value: 1, label: "I prefer a very tidy environment" },
  { value: 2, label: "I prefer a tidy environment" },
  { value: 3, label: "I'm messy from time to time" },
  { value: 4, label: "Tidiness is not very important to me" },
];

export default function CleanlinessPreference(props: PreferenceProps) {
  const [value, setValue] = useState([2.5]);
  const [preference, setPreference] = useState(cleanlinessOptions[1].label);

  useEffect(() => {
    const nearestOption = cleanlinessOptions.reduce((prev, curr) =>
      Math.abs(curr.value - value[0]) < Math.abs(prev.value - value[0])
        ? curr
        : prev
    );

    const option = cleanlinessOptions.find(
      (option) => option.label === nearestOption.label
    );

    props.onChange(option?.value ?? 0);
    setPreference(nearestOption.label);
  }, [value]);

  return (
    <div className="p-4">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            How do you prefer your living space?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <Sparkles className="h-6 w-6 text-muted-foreground" />
            <Brush className="h-6 w-6 text-muted-foreground" />
            <Trash className="h-6 w-6 text-muted-foreground" />
            <Trash2 className="h-6 w-6 text-muted-foreground" />
          </div>

          <Slider
            value={value}
            onValueChange={setValue}
            max={4}
            min={1}
            step={0.1}
            className="py-4"
          />

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Very tidy</span>
            <span className="text-muted-foreground">Not important</span>
          </div>

          <div className="text-center text-sm">
            <p>{preference}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
