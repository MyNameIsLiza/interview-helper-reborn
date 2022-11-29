import { useMutation, useQueryClient } from 'react-query';

import type { ServerError } from '../../services/api';
import { categoriesRequests } from '../../services/api';
import { Category } from '../../types';

import useCategories from './useCategories';

export default function useEditCategory() {
  const queryClient = useQueryClient();
  const query = useMutation('edit category', categoriesRequests.editCategory, {
    onSuccess: async (_, category) => {
      /*queryClient.setQueryData('categories', (oldQueryData) => {
        console.log('oldQueryData', oldQueryData);
        Array.isArray(oldQueryData);
        {
          return [...oldQueryData, category];
        }
      });*/
      queryClient.setQueryData(['category', category.id], (oldQueryData) => {
        console.log('oldQueryData', oldQueryData);
        return category;
      });

      await queryClient.fetchQuery(
        'categories',
        categoriesRequests.fetchCategories,
      );
      /*await queryClient.fetchQuery(['category', category.id], () =>
       categoriesRequests.fetchCategory(category.id),
     ); */
    },
  });
  return {
    editCategory: query.mutateAsync,
    ...query,
    error: query.error as ServerError,
  };
}
