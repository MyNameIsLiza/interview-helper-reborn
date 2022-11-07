export interface Category {
  id: string;
  title: string;
  description: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  categoryId: string;
}
