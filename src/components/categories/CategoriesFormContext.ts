import { createContext } from 'react';

import type { CategoriesFormContextType } from '../axillary/types';

const CategoriesFormContext = createContext<CategoriesFormContextType | null>(
  null,
);

export default CategoriesFormContext;
