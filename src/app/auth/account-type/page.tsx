"use client";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import group121 from "@/pictures/Group 121.png";
import group222 from "@/pictures/Group 222.png";
import Link from "next/link";

export default function WhatAreYouLooking() {
  return (
    <div className="flex flex-row justify-center w-full mt-20 relative">
      <div className="overflow-hidden flex flex-col justify-center gap-5">
        <p className="text-[28px] font-headings-title-subsection font-[number:var(--headings-title-subsection-font-weight)] text-black text-center tracking-[var(--headings-title-subsection-letter-spacing)] leading-[var(--headings-title-subsection-line-height)] [font-style:var(--headings-title-subsection-font-style)]">
          What are you looking for?
          <br />
          (Please select one of the following)
        </p>

        <div className="flex gap-10">
          <Link
            href={{
              pathname: "/auth/account-creation",
              query: { name: "sublet" },
            }}
          >
            <img
              className="left-[180px] w-[522px] h-[580px] top-[308px] hover:cursor-pointer hover:scale-[103%] transition transform duration-300 ease-in-out"
              alt="Group"
              src={group121.src}
            />
          </Link>

          <Link
            href={{
              pathname: "/auth/account-creation",
              query: { name: "tenant" },
            }}
          >
            <img
              className="left-[810px] w-[522px] h-[580px] top-[308px] hover:cursor-pointer hover:scale-[103%] transition transform duration-300 ease-in-out"
              alt="Group"
              src={group222.src}
            />
          </Link>
        </div>

        <div className="inline-flex items-center absolute top-[700px] left-[25px] isolate">
          <ChevronLeftIcon className="!relative !w-[35px] !h-[35px]" />
          <Link href="/">
            <p>Back</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
