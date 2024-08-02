export interface Post {
  id: string;
  slug: string;
  title: string;
  published_date: string;
  content: string;
  image: string | null | undefined;
  author?: Author;
  teaser: string;
  categories: {
    title: string;
  }[];
}

export interface Author {
  id: string;
  slug: string;
  title: string;
  picture: string | null | undefined;
  description: string | null | undefined;
}
