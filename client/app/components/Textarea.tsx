import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full px-4 py-2 border rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500",
        className
      )}
      {...props}
    />
  );
}
