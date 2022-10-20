import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { Category } from '../types';

interface ServerResponse<ResultType> {
  message: string;
  result: ResultType;
}

export interface ServerError {
  message: string;
}

export const categoriesRequests = {
  fetchCategories: async (): Promise<
    AxiosResponse<ServerResponse<Category[]>>
  > => axios.get('https://interview-helper-api.herokuapp.com/api/categories'),
  deleteCategory: async (
    id: string,
  ): Promise<AxiosResponse<ServerResponse<Category>>> =>
    axios.delete(
      `https://interview-helper-api.herokuapp.com/api/categories/${id}`,
    ),
  addCategory: async (
    category: Omit<Category, 'id'>,
  ): Promise<AxiosResponse<ServerResponse<Category>>> =>
    axios.post(
      `https://interview-helper-api.herokuapp.com/api/categories`,
      category,
    ),
  editCategory: async (
    category: Category,
  ): Promise<AxiosResponse<ServerResponse<Category>>> =>
    axios.put(
      `https://interview-helper-api.herokuapp.com/api/categories`,
      category,
    ),
};
