'use client'

import { useState } from 'react'
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageGallery } from "./image-gallery"
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

interface ListingCardProps {
  imageUrl: string
  price: string
  details: string
  location: string
  profileImage?: string
  images: string[]
  onVote: (direction: number) => void
}

export function ListingCard({
  imageUrl,
  price,
  details,
  location,
  profileImage,
  images,
  onVote
}: ListingCardProps) {
  const [{ x, rotate }, api] = useSpring(() => ({ x: 0, rotate: 0 }))

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2
    const dir = xDir < 0 ? -1 : 1
    
    if (!down && trigger) {
      api.start({
        x: dir * 200,
        rotate: dir * 20,
        onRest: () => {
          onVote(dir)
          api.start({ x: 0, rotate: 0 })
        },
      })
    } else {
      api.start({ x: down ? mx : 0, rotate: down ? mx / 10 : 0, immediate: down })
    }
  }, { from: () => [x.get(), 0], filterTaps: true, rubberband: true })

  return (
    <div className="relative w-full max-w-md aspect-square">
      <animated.div
        {...bind()}
        style={{ x, rotate, touchAction: 'none' }}
        className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
      >
        <div className="absolute inset-0">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Listing photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage src={profileImage} />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{price}</h3>
              <p className="text-sm text-gray-200">{details}</p>
              <p className="text-sm text-gray-200">{location}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 z-10">
          <ImageGallery images={images} />
        </div>
      </animated.div>
    </div>
  )
}

