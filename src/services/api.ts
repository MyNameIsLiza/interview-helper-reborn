import axios from 'axios';

import type { Category, Topic } from '../types';

export interface APIResponse<ResultType> {
  message: string;
  result: ResultType;
}

export type ServerError = {
  message: string;
} | null;

export interface TopicsParameters {
  categoryId?: string;
}

const url = 'https://interview-helper-api.herokuapp.com/api';

export const categoriesRequests = {
  fetchCategories: async (): Promise<Category[]> =>
    axios
      .get<APIResponse<Category[]>>(`${url}/categories`)
      .then((response) => response.data.result),
  fetchCategory: async (id = ''): Promise<Category> =>
    axios
      .get<APIResponse<Category>>(`${url}/categories/${id}`)
      .then((response) => response.data.result),
  deleteCategory: async (id: string): Promise<Category> =>
    axios
      .delete<APIResponse<Category>>(`${url}/categories/${id}`)
      .then((response) => response.data.result),
  addCategory: async (category: Omit<Category, 'id'>): Promise<Category> =>
    axios
      .post<APIResponse<Category>>(`${url}/categories`, category)
      .then((response) => response.data.result),
  editCategory: async (category: Category): Promise<Category> =>
    axios
      .put<APIResponse<Category>>(`${url}/categories`, category)
      .then((response) => response.data.result),
};

export const topicsRequests = {
  fetchTopics: async (parameters?: TopicsParameters): Promise<Topic[]> =>
    axios
      .get<APIResponse<Topic[]>>(`${url}/topics`, {
        params: parameters,
      })
      .then((response) => response.data.result),
  deleteTopic: async (id: string): Promise<Topic> =>
    axios
      .delete<APIResponse<Topic>>(`${url}/topics/${id}`)
      .then((response) => response.data.result),
  addTopic: async (topic: Omit<Topic, 'id'>): Promise<Topic> =>
    axios
      .post<APIResponse<Topic>>(`${url}/topics`, topic)
      .then((response) => response.data.result),
  editTopic: async (topic: Topic): Promise<Topic> =>
    axios
      .put<APIResponse<Topic>>(`${url}/topics`, topic)
      .then((response) => response.data.result),
};
