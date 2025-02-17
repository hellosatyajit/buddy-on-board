import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export function StarRating({ value, onChange, label }: StarRatingProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className="focus:outline-none"
          >
            <Star
              className={cn(
                "w-6 h-6 transition-colors",
                rating <= value
                  ? "fill-blue-600 text-blue-600"
                  : "fill-none text-black stroke-1"
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
} 