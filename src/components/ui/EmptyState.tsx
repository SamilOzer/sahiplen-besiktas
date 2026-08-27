import Link from "next/link";

interface EmptyStateProps {
  readonly title: string;
  readonly description: string;
  readonly action?: { readonly href: string; readonly label: string };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action ? <Link className="button button--secondary" href={action.href}>{action.label}</Link> : null}
    </div>
  );
}
