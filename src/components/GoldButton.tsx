import { type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const cls = (variant: Variant) => (variant === "outline" ? "btn-premium-outline" : "btn-premium");

export function GoldButton({
  children,
  variant = "solid",
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${cls(variant)} ${className} ${variant === "solid" ? "gold-button" : ""}`}
      {...rest}
    >
      <span className={`button-text ${variant === "outline" ? "button-text-outline" : ""}`}>{children}</span>
    </button>
  );
}
export function GoldLink({ children, variant = "solid", className = "", ...rest }: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${cls(variant)} ${className} ${variant === "solid" ? "gold-button" : ""}`} {...rest}>
      <span className={`button-text ${variant === "outline" ? "button-text-outline" : ""}`}>{children}</span>
    </a>
  );
}