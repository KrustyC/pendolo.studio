import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-xs font-semibold uppercase tracking-[0.16em] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-none",
  {
    variants: {
      variant: {
        default:
          "rounded-full border-0 bg-white text-neutral-950 hover:bg-neutral-100",
        destructive: "rounded-full border-0 bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "rounded-full border-0 bg-white text-neutral-950 hover:bg-neutral-100",
        secondary:
          "rounded-full border-0 bg-neutral-200 text-neutral-900 hover:bg-neutral-300/80",
        ghost: "rounded-full border-0 bg-transparent text-foreground hover:bg-neutral-100",
        link: "rounded-none border-0 bg-transparent text-primary underline-offset-4 hover:underline px-0 py-0 h-auto min-h-0 shadow-none",
      },
      size: {
        default: "min-h-9 px-4 py-2 h-auto",
        sm: "min-h-8 px-3 py-1.5 text-[10px] h-auto",
        lg: "min-h-10 px-5 py-2.5 text-xs h-auto",
        icon: "h-10 w-10 shrink-0 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
