import { type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const cls = (variant: Variant) => (variant === "outline" ? "btn-premium-outline" : "btn-premium");

export function GoldButton({ children, variant = "solid", className = "", ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${cls(variant)} ${className}`} {...rest}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

export function GoldLink({ children, variant = "solid", className = "", ...rest }: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${cls(variant)} ${className}`} {...rest}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
