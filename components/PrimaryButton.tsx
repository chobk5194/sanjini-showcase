import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "compact";
};

const variantClassName: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  primary:
    "bg-adventure-yellow text-adventure-navy shadow-[0_14px_24px_rgba(255,212,95,0.35)] hover:-translate-y-0.5 hover:brightness-[1.03]",
  secondary:
    "bg-white text-adventure-navy shadow-panel hover:-translate-y-0.5 hover:bg-sky-50",
  ghost:
    "bg-white/18 text-white ring-1 ring-white/40 backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white/24"
};

const sizeClassName: Record<NonNullable<PrimaryButtonProps["size"]>, string> = {
  default: "min-h-12 px-5 py-3 text-base",
  compact: "min-h-10 px-4 py-2.5 text-sm"
};

export function PrimaryButton({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={[
        "inline-flex w-full items-center justify-center rounded-2xl font-black transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-adventure-blue disabled:cursor-not-allowed disabled:opacity-60",
        variantClassName[variant],
        sizeClassName[size],
        className
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
