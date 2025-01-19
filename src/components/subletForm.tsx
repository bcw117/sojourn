import React, { FormEventHandler, useState } from "react";
import { provinces, cities } from "@/app/data/locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubletForm = ({
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
        <label className="block mb-2">Rent Price</label>
        <input
          id="rentPrice"
          name="rentPrice"
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
        <label className="block mb-2">Address</label>
        <input
          id="address"
          name="address"
          className="rounded-lg w-full border-[#A3A3A3] px-3 py-1.5 my-2 text-xs text-[#000000]"
          style={{
            borderWidth: "1px",
            fontFamily: "PPObjectSans-Regular",
          }}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Home Type</label>
        <Select name="homeType">
          <SelectTrigger id="city-select" className="w-full">
            <SelectValue placeholder="Select a home type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="duplex">Duplex</SelectItem>
            <SelectItem value="na">Basement Suites</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">How many bedrooms do you have?</label>
        <Select name="numRooms">
          <SelectTrigger id="numRoomSelect" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">How many bathrooms do you have?</label>
        <Select name="numBathrooms">
          <SelectTrigger id="bedroom-select" className="w-full">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5+</SelectItem>
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

export default SubletForm;
