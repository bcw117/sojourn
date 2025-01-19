"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { provinces, cities } from "../data/canada-locations";

export default function CanadaLocationSelector() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCity(""); // Reset city when province changes
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="province-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Province/State
        </label>
        <Select onValueChange={handleProvinceChange} value={selectedProvince}>
          <SelectTrigger id="province-select" className="w-full">
            <SelectValue placeholder="Select a province" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedProvince && (
        <div>
          <label
            htmlFor="city-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select City
          </label>
          <Select onValueChange={setSelectedCity} value={selectedCity}>
            <SelectTrigger id="city-select" className="w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities[selectedProvince].map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedProvince && selectedCity && (
        <p className="mt-4 text-sm text-gray-600">
          You selected: {selectedCity}, {selectedProvince}
        </p>
      )}
    </div>
  );
}
