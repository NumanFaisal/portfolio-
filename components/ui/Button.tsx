import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all focus-visible:ring-2 ring-[var(--color-accent)] ring-offset-2 ring-offset-[var(--color-bg)] disabled:opacity-50 disabled:cursor-not-allowed select-none",
          {
            "accent-gradient text-white hover:opacity-90 shadow-[var(--shadow-accent)]":
              variant === "primary",
            "border border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]":
              variant === "ghost",
            "border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)]":
              variant === "outline",
            "px-3 py-1.5 text-sm rounded-[var(--radius-md)]": size === "sm",
            "px-5 py-2.5 text-sm rounded-[var(--radius-full)]": size === "md",
            "px-7 py-3.5 text-base rounded-[var(--radius-full)]": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
