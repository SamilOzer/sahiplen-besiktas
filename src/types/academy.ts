export interface KnowledgeArticle {
  readonly slug: string;
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly updatedAt: string;
  readonly sections: readonly {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly checklist?: readonly string[];
  }[];
  readonly sources: readonly { readonly title: string; readonly url: string }[];
}
