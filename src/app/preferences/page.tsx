"use client";

import React, { useState } from "react";
import { formAction } from "./actions";
import NoisePreference from "@/components/noise-preference";
import PersonalityPreference from "@/components/personality-preference";
import CleanlinessPreference from "@/components/cleanliness-preference";
import SleepSchedulePreference from "@/components/sleep-schedule-preference";
import ImportanceMatrixSurvey from "@/components/importance-matrix-survey";

// Subletter
const page = () => {
  const [noise, setNoise] = useState<number>(1);
  const [personPref, setPersonPref] = useState<number>(1);
  const [cleanliness, setCleanliness] = useState<number>(1);
  const [sleepPref, setSleepPref] = useState<number>(1);
  const [ranking, setRanking] = useState<string[]>([
    "noise",
    "social",
    "cleanliness",
    "sleep_schedule",
  ]);

  const handleSubmit = () => {
    const preferences = {
      noise_level: noise,
      social: personPref,
      cleanliness,
      sleep_schedule: sleepPref,
      ranking,
    };
    formAction(preferences);
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-5">
      <NoisePreference onChange={setNoise} />
      <PersonalityPreference onChange={setPersonPref} />
      <CleanlinessPreference onChange={setCleanliness} />
      <SleepSchedulePreference onChange={setSleepPref} />
      <ImportanceMatrixSurvey onChange={setRanking} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default page;
