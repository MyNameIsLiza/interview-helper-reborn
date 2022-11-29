import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { Category, Topic } from '../types';

export interface ServerAxiosResponse<ResultType> {
  message: string;
  result: ResultType;
}

export type ServerResponse<ResultType> = Promise<
  AxiosResponse<ServerAxiosResponse<ResultType>>
>;

export type ServerError = {
  message: string;
} | null;

export type TopicsParams = {
  categoryId: string;
} | null;

const url = 'https://interview-helper-api.herokuapp.com/api';

export const categoriesRequests = {
  fetchCategories: async () =>
    axios
      .get<ServerAxiosResponse<Category[]>>(`${url}/categories`)
      .then((response) => response.data.result),
  fetchCategory: async (id = '') =>
    axios
      .get<ServerAxiosResponse<Category>>(`${url}/categories/${id}`)
      .then((response) => response.data.result),
  deleteCategory: async (id: string): ServerResponse<Category> =>
    axios
      .delete(`${url}/categories/${id}`)
      .then((response) => response.data.result),
  addCategory: async (
    category: Omit<Category, 'id'>,
  ): ServerResponse<Category> =>
    axios
      .post(`${url}/categories`, category)
      .then((response) => response.data.result),
  editCategory: async (category: Category): ServerResponse<Category> =>
    axios
      .put(`${url}/categories`, category)
      .then((response) => response.data.result),
};

export const topicsRequests = {
  fetchTopics: async (parameters?: TopicsParams) =>
    axios
      .get<ServerAxiosResponse<Topic[]>>(`${url}/topics`, {
        params: parameters,
      })
      .then((response) => response.data.result),
  deleteTopic: async (id: string): ServerResponse<Topic> =>
    axios
      .delete(`${url}/topics/${id}`)
      .then((response) => response.data.result),
  addTopic: async (topic: Omit<Topic, 'id'>): ServerResponse<Topic> =>
    axios.post(`${url}/topics`, topic).then((response) => response.data.result),
  editTopic: async (topic: Topic): ServerResponse<Topic> =>
    axios.put(`${url}/topics`, topic).then((response) => response.data.result),
};
