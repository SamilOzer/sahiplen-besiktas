interface PageHeaderProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly context?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  context = "Beşiktaş / Hayvan hizmetleri",
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__rail" aria-hidden="true">
        <span>Alan</span>
        <span>{context}</span>
      </div>
      <div className="page-header__title">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <p className="page-header__description">{description}</p>
    </header>
  );
}
