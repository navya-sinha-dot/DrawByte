import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`px-3 py-2 rounded bg-black text-lavender border border-lavender focus:outline-none focus:ring-2 focus:ring-lavender focus:border-lavender transition ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input"; 