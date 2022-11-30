import type { Category } from '../../types';

export const categoriesRequests = {
  fetchCategories: async (): Promise<Category[]> => {
    return new Promise((resolve) => {
      resolve([]);
    });
  },
};
