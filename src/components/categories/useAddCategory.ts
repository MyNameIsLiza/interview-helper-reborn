import { message } from 'antd';
import type { UseMutateAsyncFunction, UseMutationResult } from 'react-query';
import { useMutation, useQueryClient } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import type { Category } from '../../types';

interface UseAddCategoryResult {
  addCategory: UseMutateAsyncFunction<Category, unknown, Omit<Category, 'id'>>;
  error: ServerError;
  isLoading: UseMutationResult['isLoading'];
}

export default function useAddCategory(): UseAddCategoryResult {
  const queryClient = useQueryClient();
  const query = useMutation<Category, ServerError, Omit<Category, 'id'>>(
    'add category',
    async (category: Omit<Category, 'id'>) =>
      categoriesRequests.addCategory(category),
    {
      onSuccess: (response, category) => {
        queryClient.setQueryData('categories', (oldQueryData) => {
          if (Array.isArray(oldQueryData)) {
            message
              .success(`Category ${category.title} was created successfully`)
              .then(null, console.error);
            return [...oldQueryData, response];
          }
          console.warn('oldQueryData is not array');
          return [] as Category[];
        });
        /* queryClient.fetchQuery(
          'categories',
          categoriesRequests.fetchCategories,
        ); */
      },
      onError: (error, variables) => {
        // message.error(error);
      },
    },
  );
  return {
    addCategory: query.mutateAsync,
    ...query,
  };
}
