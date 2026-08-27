export interface HomepageEditorialItem {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly status?: string;
  readonly href?: string;
}

export interface HomepageKnowledgeItem {
  readonly title: string;
  readonly description: string;
  readonly href: string;
}
