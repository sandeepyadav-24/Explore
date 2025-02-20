import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div className={cn("bg-white shadow-lg rounded-lg p-6", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ className, children }: CardProps) {
  return <h2 className={cn("text-lg font-bold", className)}>{children}</h2>;
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn("text-gray-700", className)}>{children}</div>;
}
