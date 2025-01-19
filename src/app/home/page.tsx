"use client";
import React from "react";
import { useState } from "react"
import { Heart, X } from 'lucide-react'
import { getPotentialMatches, handleSwipe } from "./actions";
import { getUser } from "../../../utils/auth/user"
import { ActionButton } from "../../components/swipe-action-button"
import { ListingCard } from "../../components/listing-card"
import house1 from "../../pictures/house-pic-1.png";
import house2 from "../../pictures/house-pic-2.png";
import placeholder from "../../pictures/placeholder.png";

export default function SwipeInterface() {
  const [user, setUser] = useState<User | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState<any[]>([])
  const currentListing = matches[currentIndex]

  React.useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser()
      if (!userData) {
        alert("Internal Server Error")
        console.log("Did not find user data")
        return
      }
      const DUMMY_LISTINGS = [
        {
          id: 1,
          imageUrl: house1,
          price: "$1000/month",
          details: "2bed, 1bath",
          location: "Vancouver, BC",
          profileImage: placeholder,
          images: [
            house1,
            placeholder,
            placeholder,
            placeholder,
          ]
        },
        {
          id: 2,
          imageUrl: house2,
          price: "$1500/month",
          details: "2bed, 10bath",
          location: "Vancouver, BC",
          profileImage: placeholder,
          images: [
            house2,
            placeholder,
            placeholder,
            placeholder
          ]
        }
      ]
      const potentialMatches = DUMMY_LISTINGS
      setMatches(potentialMatches)
      setUser(userData)
    }

    fetchData()
  }, [])

  return (
    <div className="pt-32 min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="relative w-full max-w-md px-4">
        {currentListing && (
          <ListingCard
            {...currentListing}
            setCurrentIndex={setCurrentIndex}
            onSwipe={handleSwipe}
          />
        )}
        {!currentListing && (
          <div className="text-center p-4 bg-white rounded-3xl shadow-xl">
            <h2 className="text-2xl font-bold mb-2">No more listings</h2>
            <p>Check back later for more options!</p>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <ActionButton
          variant="reject"
          onClick={() => handleSwipe(user.id, currentListing.id, "dislike", setCurrentIndex)}
        >
          <X className="h-8 w-8" />
        </ActionButton>
        <ActionButton
          variant="accept"
          onClick={() => handleSwipe(user.id, currentListing.id, "like", setCurrentIndex)}
        >
          <Heart className="h-8 w-8" />
        </ActionButton>
      </div>
    </div >
  );
};