import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-950 text-white shadow-[0_20px_60px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:bg-neutral-800",
        secondary:
          "border border-neutral-200 bg-white/80 text-neutral-950 shadow-sm backdrop-blur hover:-translate-y-0.5 hover:border-neutral-300",
        ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
        whatsapp:
          "bg-[#111f18] text-white shadow-[0_20px_60px_rgba(17,31,24,0.25)] hover:-translate-y-0.5 hover:bg-[#173a28]",
      },
      size: {
        default: "h-12 px-5",
        sm: "h-10 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-7 text-base",
        icon: "h-11 w-11 rounded-full p-0",
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

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
