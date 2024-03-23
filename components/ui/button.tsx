"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
        className={cn(
          "flex w-full items-center justify-center rounded-md  p-2 font-sans font-bold tracking-wide hover:bg-muted",
          className,
        )}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
