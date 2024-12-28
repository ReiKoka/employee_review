import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        first:
          "bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-foreground  border-none",
        second:
          "bg-purple-100 text-primary text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-purple-900 dark:text-foreground border-none ",
        third:
          "bg-green-100 text-green-800 border-none text-xs font-medium me-2 px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-foreground ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
