"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Heart, X } from 'lucide-react';
import { useSwipeable } from 'react-swipeable';
import { getPotentialMatches, handleSwipe } from "./actions";
import { getUser } from "../../../utils/auth/user";
import { ActionButton } from "../../components/swipe-action-button";
import { ListingCard } from "../../components/listing-card";
import house1 from "../../pictures/house-pic-1.png";
import house2 from "../../pictures/house-pic-2.png";
import house3 from "../../pictures/house-pic-3.png";
import house4 from "../../pictures/house-pic-4.png";
import house5 from "../../pictures/house-pic-5.png";
import house6 from "../../pictures/house-pic-6.png";
import house7 from "../../pictures/house-pic-7.png";
import house8 from "../../pictures/house-pic-8.png";
import house9 from "../../pictures/house-pic-9.png";
import house10 from "../../pictures/house-pic-10.png";
import placeholder from "../../pictures/placeholder.png";

export default function SwipeInterface() {
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const currentListing = matches[currentIndex];

  const onSwipe = async () => {
    console.log("BEFORE", currentIndex);
    setCurrentIndex(prev => prev + 1);
    console.log(currentIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUser();
      if (!userData) {
        alert("Internal Server Error");
        console.log("Did not find user data");
        return;
      }
      const DUMMY_LISTINGS = [
        {
          id: 1,
          imageUrl: house1,
          price: "$1000/month",
          details: "2bed, 1bath",
          location: "Vancouver, BC",
          profileImage: placeholder,
          images: [house1, placeholder, placeholder, placeholder],
        }, {
          id: 2,
          imageUrl: house2,
          price: "$1500/month",
          details: "2bed, 10bath",
          location: "Vancouver, BC",
          profileImage: placeholder,
          images: [house2, placeholder, placeholder, placeholder],
        },
        {
          id: 3,
          imageUrl: house3,
          price: "$1800/month",
          details: "3bed, 2bath",
          location: "Burnaby, BC",
          profileImage: placeholder,
          images: [house3, placeholder, placeholder, placeholder],
        },
        {
          id: 4,
          imageUrl: house4,
          price: "$2000/month",
          details: "4bed, 3bath",
          location: "Richmond, BC",
          profileImage: placeholder,
          images: [house4, placeholder, placeholder, placeholder],
        },
        {
          id: 5,
          imageUrl: house5,
          price: "$750/month",
          details: "1bed, 1bath",
          location: "Surrey, BC",
          profileImage: placeholder,
          images: [house5, placeholder, placeholder, placeholder],
        },
        {
          id: 6,
          imageUrl: house6,
          price: "$2500/month",
          details: "5bed, 4bath",
          location: "Coquitlam, BC",
          profileImage: placeholder,
          images: [house6, placeholder, placeholder, placeholder],
        },
        {
          id: 7,
          imageUrl: house7,
          price: "$1200/month",
          details: "2bed, 1bath",
          location: "Langley, BC",
          profileImage: placeholder,
          images: [house7, placeholder, placeholder, placeholder],
        },
        {
          id: 8,
          imageUrl: house8,
          price: "$950/month",
          details: "1bed, 1bath",
          location: "North Vancouver, BC",
          profileImage: placeholder,
          images: [house8, placeholder, placeholder, placeholder],
        },
        {
          id: 9,
          imageUrl: house9,
          price: "$1000/month",
          details: "3bed, 2bath",
          location: "West Vancouver, BC",
          profileImage: placeholder,
          images: [house9, placeholder, placeholder, placeholder],
        },
        {
          id: 10,
          imageUrl: house10,
          price: "$1100/month",
          details: "2bed, 1bath",
          location: "New Westminster, BC",
          profileImage: placeholder,
          images: [house10, placeholder, placeholder, placeholder],
        },
      ];
      const potentialMatches = DUMMY_LISTINGS;
      setMatches(potentialMatches);
      setUser(userData);
    };

    fetchData();
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      handleSwipe(user.id, currentListing.id, "dislike", setCurrentIndex);
      onSwipe();
      setSwipeDirection(null);
    },
    onSwipedRight: () => {
      handleSwipe(user.id, currentListing.id, "like", setCurrentIndex);
      onSwipe();
      setSwipeDirection(null);
    },
    onSwiping: (eventData) => {
      const direction = eventData.dir === 'Left' ? 'dislike' : 'like';
      setSwipeDirection(direction);
      setSwipeProgress(Math.abs(eventData.deltaX) / 200); // Adjust 200 to change sensitivity
    },
    trackMouse: true,
  });

  return (
    <div className="pt-32 min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div {...swipeHandlers} className="relative w-full max-w-md px-4">
        {currentListing && (
          <>
            <ListingCard
              {...currentListing}
              onSwipe={() => onSwipe()}
            />
            {swipeDirection && (
              <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center ${
                swipeDirection === 'like' ? 'bg-green-500' : 'bg-red-500'
              } bg-opacity-${Math.round(swipeProgress * 100)} rounded-3xl`}>
                {swipeDirection === 'like' ? <Heart className="h-16 w-16 text-white" /> : <X className="h-16 w-16 text-white" />}
              </div>
            )}
          </>
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
    </div>
  );
}
