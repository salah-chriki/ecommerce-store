import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button ref={ref} className={cn("rounded-full w-auto", className)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
