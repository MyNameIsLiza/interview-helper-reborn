import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import type { Category } from '../../types';

interface UseCategoryResult {
  category?: Category;
  error: ServerError;
  isLoading: UseQueryResult['isLoading'];
}

export default function useCategory(id?: string): UseCategoryResult {
  const query = useQuery<Category, ServerError>(
    ['category', id],
    async () => categoriesRequests.fetchCategory(id),
    { enabled: !!id },
  );

  return { category: query.data, ...query };
}
