import type { ReactNode } from "react";

interface NoticeProps {
  readonly title: string;
  readonly children: ReactNode;
}

export function Notice({ title, children }: NoticeProps) {
  return (
    <aside className="notice" aria-label={title}>
      <p className="notice__title">{title}</p>
      <div className="notice__content">{children}</div>
    </aside>
  );
}
