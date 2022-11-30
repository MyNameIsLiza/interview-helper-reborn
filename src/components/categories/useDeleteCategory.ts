import type { UseMutateAsyncFunction, UseMutationResult } from 'react-query';
import { useMutation, useQueryClient } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import type { Category } from '../../types';

interface UseDeleteCategoryResult {
  deleteCategory: UseMutateAsyncFunction<Category, unknown, string>;
  error: ServerError;
  isLoading: boolean;
}

export default function useDeleteCategory(): UseDeleteCategoryResult {
  const queryClient = useQueryClient();
  const query = useMutation<Category, ServerError, string>(
    'delete category',
    async (id) => categoriesRequests.deleteCategory(id),
    {
      onSuccess: async () =>
        /* await queryClient.fetchQuery(
          'categories',
          categoriesRequests.fetchCategories,
        ); */
        queryClient.invalidateQueries('categories'),
    },
  );
  return {
    deleteCategory: query.mutateAsync,
    error: query.error,
    isLoading: query.isLoading,
  };
}
