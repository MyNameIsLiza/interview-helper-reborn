import { useMutation, useQueryClient } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import { Category } from '../../types';

export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  const query = useMutation(
    'delete category',
    async (id: string) => categoriesRequests.deleteCategory(id),
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
    ...query,
    error: query.error as ServerError,
  };
}
