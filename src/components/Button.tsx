import React from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  icon: Icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-light-primary dark:bg-dark-primary text-white hover:opacity-90 focus:ring-light-primary dark:focus:ring-dark-primary",
    secondary:
      "bg-light-accent dark:bg-dark-accent text-white hover:opacity-90 focus:ring-light-accent dark:focus:ring-dark-accent",
    outline:
      "border-2 border-light-primary dark:border-dark-primary text-light-primary dark:text-dark-primary hover:bg-light-primary dark:hover:bg-dark-primary hover:text-white focus:ring-light-primary dark:focus:ring-dark-primary",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
}

