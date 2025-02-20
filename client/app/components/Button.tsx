import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({
  variant = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-semibold rounded-md transition",
        variant === "default"
          ? "bg-rose-600 text-white hover:bg-rose-700"
          : "border border-rose-600 text-rose-600 hover:bg-rose-100",
        className
      )}
      {...props}
    />
  );
}
