import type { Category } from '../../store/slices/categories';

export interface CategoriesFormContextType {
  setCategory: (category: Category | null) => void;
  setOpen: (open: boolean) => void;
  category: Category | null;
}
