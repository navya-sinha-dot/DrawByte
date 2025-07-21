import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "accent";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({
  children,
  className = "",
  variant = "primary",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  let base =
    "px-4 py-2 rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2 ";
  let color = "";
  if (variant === "primary") {
    color = "bg-primary text-primary-foreground hover:bg-purple-400 hover:text-black";
  } else if (variant === "secondary") {
    color = "bg-secondary text-secondary-foreground hover:bg-purple-200 hover:text-black";
  } else if (variant === "accent") {
    color = "bg-accent text-accent-foreground hover:bg-purple-300 hover:text-black";
  }
  return (
    <button
      className={`${base} ${color} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}; 