import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionButtonProps {
  onClick: () => void
  variant: "accept" | "reject"
  children: React.ReactNode
}

export function ActionButton({ onClick, variant, children }: ActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "h-16 w-16 rounded-full shadow-lg transition-all duration-200 ease-in-out transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        variant === "accept" ? "bg-pink-100 hover:bg-pink-200 text-pink-500" : "bg-gray-600 hover:bg-gray-700 text-white"
      )}
    >
      {children}
    </Button>
  )
}

