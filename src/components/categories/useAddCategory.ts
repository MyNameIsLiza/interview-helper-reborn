import { message } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import type { Category } from '../../types';

export default function useAddCategory() {
  const queryClient = useQueryClient();
  const query = useMutation(
    'add category',
    async (category: Omit<Category, 'id'>) =>
      categoriesRequests.addCategory(category),
    {
      onSuccess: (response, category) => {
        queryClient.setQueryData('categories', (oldQueryData) => {
          if (Array.isArray(oldQueryData)) {
            message.success(
              `Category ${category.title} was created successfuly`,
            );
            return [...oldQueryData, response];
          }
          console.warn('oldQueryData is not array');
          return [];
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
    error: query.error as ServerError,
  };
}
