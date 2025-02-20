import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 border rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500",
        className
      )}
      {...props}
    />
  );
}
