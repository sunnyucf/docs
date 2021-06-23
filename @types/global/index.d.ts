export type TableOfContentsItem = {
  url: string;
  title: string;
  items?: TableOfContentsItem[];
};

export type TableOfContents = TableOfContentsItem[];
