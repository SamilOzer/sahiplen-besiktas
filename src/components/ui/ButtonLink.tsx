import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: "primary" | "secondary" | "text";
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link className={`button button--${variant}`} href={href}>
      {children}
    </Link>
  );
}
