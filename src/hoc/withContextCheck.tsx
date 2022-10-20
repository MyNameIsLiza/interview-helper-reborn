import type { FC } from 'react';
import { useContext } from 'react';

import CategoriesFormContext from '../components/categories/CategoriesFormContext';

export default function withContextCheck<T extends Record<string, unknown>>(
  WrappedComponent: FC<T>,
): FC<T> {
  function WithContextCheck(properties: T): React.ReactElement | null {
    const context = useContext(CategoriesFormContext);
    if (!context) {
      return null;
    }
    return <WrappedComponent {...properties} />;
  }

  WithContextCheck.displayName = `withContextCheck(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;
  return WithContextCheck;
}
