import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "steel" | "outline";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({ variant = "primary", href, className = "", children, ...props }: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 font-vazir";
  
  const variants = {
    primary: "bg-signal-500 hover:bg-signal-400 text-white shadow-lg shadow-signal-500/20 hover:shadow-signal-500/40",
    steel: "bg-metal-brushed text-ink-950 hover:brightness-110 metal-shadow",
    outline: "border-2 border-steel-400 text-steel-100 hover:bg-steel-400/10",
  };

  const style = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={style}>
        {children}
      </Link>
    );
  }

  return (
    <button className={style} {...props}>
      {children}
    </button>
  );
}
