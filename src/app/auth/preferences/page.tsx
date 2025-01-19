"use client";

import React, { useState } from "react";
import { formAction } from "./actions";
import NoisePreference from "@/components/noise-preference";
import PersonalityPreference from "@/components/personality-preference";
import CleanlinessPreference from "@/components/cleanliness-preference";
import SleepSchedulePreference from "@/components/sleep-schedule-preference";
import ImportanceMatrixSurvey from "@/components/importance-matrix-survey";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Subletter
const page = () => {
  const [bio, setBio] = useState<string>("");
  const [noise, setNoise] = useState<number>(1);
  const [personPref, setPersonPref] = useState<string>("");
  const [cleanliness, setCleanliness] = useState<number>(1);
  const [sleepSch, setSleepSch] = useState<string>("");
  const [genderPref, setGenderPref] = useState<string>("");
  const [ranking, setRanking] = useState<string[]>([
    "noise",
    "social",
    "cleanliness",
    "sleep_schedule",
  ]);

  const searchParams = useSearchParams();

  const userType = searchParams.get("type");

  const handleSubmit = () => {
    const preferences = {
      userType: userType ?? "tenant",
      noise_level: noise,
      social: personPref,
      cleanliness,
      sleep_schedule: sleepSch,
      bio,
      ranking,
    };
    formAction(preferences);
  };

  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-5">
      <h1>Edit your preferences</h1>
      <h3>Tailor your profile to find the perfect match for you roommate</h3>
      <div className="w-1/3">
        <label className="block">Bio</label>
        <textarea
          id="bio"
          name="interestsHobbies"
          className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000] w-full"
          style={{
            borderWidth: "1px",
            fontFamily: "PPObjectSans-Regular",
          }}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          rows={6}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Roommate Gender Preference</label>
        <Select
          onValueChange={setGenderPref}
          value={genderPref}
          name="genderPref"
        >
          <SelectTrigger id="city-select" className="w-full">
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Male</SelectItem>
            <SelectItem value="2">Female</SelectItem>
            <SelectItem value="1">Doesn't Matter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Do you get along with extroverts or introverts
        </label>
        <Select
          onValueChange={setPersonPref}
          value={personPref}
          name="genderPref"
        >
          <SelectTrigger id="city-select" className="w-full">
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Extroverts</SelectItem>
            <SelectItem value="2">Introverts</SelectItem>
            <SelectItem value="1">Doesn't Matter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          What is your preferred sleep schedule?
        </label>
        <Select onValueChange={setSleepSch} value={sleepSch} name="sleepSch">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an Option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">
              I usually wake up early in the morning
            </SelectItem>
            <SelectItem value="1">I have a flexible sleep schedule</SelectItem>
            <SelectItem value="2">I usually go to bed late at night</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CleanlinessPreference onChange={setCleanliness} />
      <NoisePreference onChange={setNoise} />
      <ImportanceMatrixSurvey onChange={setRanking} />
      <button
        className="bg-[#171717] text-white w-[200px] p-2 rounded-xl"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};

export default page;
