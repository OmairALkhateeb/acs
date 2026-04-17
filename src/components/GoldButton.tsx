import { type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm tracking-widest uppercase font-medium transition-all duration-500 overflow-hidden";

const styles: Record<Variant, string> = {
  solid:
    "bg-gradient-gold text-black shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5",
  outline:
    "border border-[var(--gold)]/60 text-[var(--gold-soft)] hover:text-black hover:border-[var(--gold)] hover:shadow-gold",
};

export function GoldButton({ children, variant = "solid", className = "", ...rest }: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {variant === "outline" && (
        <span className="absolute inset-0 bg-gradient-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-0" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}

export function GoldLink({ children, variant = "solid", className = "", ...rest }: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${styles[variant]} ${className}`} {...rest}>
      {variant === "outline" && (
        <span className="absolute inset-0 bg-gradient-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 -z-0" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
