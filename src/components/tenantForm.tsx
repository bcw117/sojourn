import React, { FormEventHandler, useState } from "react";
import { provinces, cities } from "@/app/data/locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TenantForm = ({
  handleSubmit,
}: {
  handleSubmit: FormEventHandler<HTMLFormElement>;
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">State/Town</label>
        <Select
          onValueChange={handleProvinceChange}
          name="province"
          value={selectedProvince}
        >
          <SelectTrigger
            id="province-select"
            name="province"
            className="w-full"
          >
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
        <div className="mb-4">
          <label className="block mb-2">City</label>
          <Select
            onValueChange={setSelectedCity}
            name="city"
            value={selectedCity}
          >
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

      <div className="mb-4 w-full">
        <label className="block mb-2">Minimum Rent Price</label>
        <input
          id="minRentPrice"
          name="minRentPrice"
          placeholder="$"
          className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000] w-full"
          style={{
            borderWidth: "1px",
            fontFamily: "PPObjectSans-Regular",
          }}
          required
        />
      </div>
      <div className="mb-4 w-full">
        <label className="block mb-2">Maximum Rent Price</label>
        <input
          id="maxRentPrice"
          name="maxRentPrice"
          placeholder="$"
          className="rounded-lg border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000] w-full"
          style={{
            borderWidth: "1px",
            fontFamily: "PPObjectSans-Regular",
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Are you willing to share a bedroom with your roomate(s)?
        </label>
        <Select name="numRoomPref">
          <SelectTrigger id="numRoomSelect" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">No</SelectItem>
            <SelectItem value="1">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          Are you willing to share a bathroom with your roomate(s)?
        </label>
        <Select name="numBathroomPref">
          <SelectTrigger id="numRoomSelect" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">No</SelectItem>
            <SelectItem value="1">Yes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Gender</label>
        <Select name="gender">
          <SelectTrigger id="city-select" className="w-full">
            <SelectValue placeholder="Select a gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="na">No Preference</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-[#171717] text-white w-[200px] p-2 rounded-xl"
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default TenantForm;
