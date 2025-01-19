"use client";

import { useState } from "react";
import { insert } from "./actions";
import SubletForm from "@/components/subletForm";
import { useSearchParams } from "next/navigation";
import TenantForm from "@/components/tenantForm";
import { UserData } from "@/types/account";

export default function AccountCreation() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const searchParams = useSearchParams();

  const name = searchParams.get("name");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const result: UserData = {
      userType: name ?? "tenant",
      province: formData.get("province") as string,
      city: formData.get("city") as string,
      rentPrice: formData.get("rentPrice") as string,
      minRentPrice: formData.get("minRentPrice") as string,
      maxRentPrice: formData.get("maxRentPrice") as string,
      numRooms: formData.get("numRooms") as string,
      numBathrooms: formData.get("numBathrooms") as string,
      numRoomPref: formData.get("numRoomPref") as string,
      numBathroomPref: formData.get("numBathroomPref") as string,
      gender: formData.get("gender") as string,
      address: formData.get("address") as string,
    };

    try {
      await insert(result);
      //router.push('/preferences');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setShowError(true);
      } else {
        console.log("An unknown error occurred");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex bg-[#FFFFFF] bg-[url('../pictures/bg.png')] bg-no-repeat"
      style={{ backgroundSize: "120%", backgroundPosition: "300% 1%" }}
    >
      <div className="w-2/3 ml-auto flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <p className="text-[#000000] text-left">
            Complete your account setup
          </p>
          <p
            className="text-xs text-left"
            style={{ fontFamily: "PPObjectSans-Regular" }}
          >
            These options will shape the recommendations you see on your feed.
          </p>
          {name === "sublet" ? (
            <SubletForm handleSubmit={handleSubmit} />
          ) : (
            <TenantForm handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
