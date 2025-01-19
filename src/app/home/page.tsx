"use client";
import React from "react";

const page = () => {
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      window.location.href = "/"; // Redirect after signing out
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div>
      page
      <button
        onClick={() => {
          handleSignOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default page;
