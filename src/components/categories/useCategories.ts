import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import type { Category } from '../../types';

interface UseCategoriesResult {
  categories: Category[];
  error: ServerError;
  isLoading: UseQueryResult['isLoading'];
  isFetching: UseQueryResult['isFetching'];
}

/* type UseCategoriesResult2 = Omit<UseQueryResult, 'error'> & {
  categories: Category[];
  error: ServerError
} */

export default function useCategories(): UseCategoriesResult {
  const query = useQuery<Category[], ServerError>(
    'categories',
    categoriesRequests.fetchCategories,
  );

  return {
    categories: query.data || [],
    error: query.error,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
  };
}
