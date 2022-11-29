import type { Category } from '../../types';

export interface CategoriesFormContextType {
  setCategory: (category: Category | null) => void;
  setOpen: (open: boolean) => void;
  category: Category | null;
  open: boolean;
}
