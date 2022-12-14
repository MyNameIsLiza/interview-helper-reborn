import { createContext } from 'react';

import type { CategoriesFormContextType } from './types';

const CategoriesFormContext = createContext<CategoriesFormContextType | null>(
  null,
);

export default CategoriesFormContext;
