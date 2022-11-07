import type { AxiosResponse } from 'axios';
import axios from 'axios';

import type { Category, Topic } from '../types';

interface ServerResponse<ResultType> {
  message: string;
  result: ResultType;
}

export interface ServerError {
  message: string;
}

const url = 'https://interview-helper-api.herokuapp.com/api';

export const categoriesRequests = {
  fetchCategories: async (): Promise<
    AxiosResponse<ServerResponse<Category[]>>
  > => axios.get(`${url}/categories`),
  fetchCategory: async (
    id: string,
  ): Promise<AxiosResponse<ServerResponse<Category>>> =>
    axios.get(`${url}/categories/${id}`),
  deleteCategory: async (
    id: string,
  ): Promise<AxiosResponse<ServerResponse<Category>>> =>
    axios.delete(`${url}/categories/${id}`),
  addCategory: async (
    category: Omit<Category, 'id'>,
  ): Promise<AxiosResponse<ServerResponse<Category>>> =>
    axios.post(`${url}/categories`, category),
  editCategory: async (
    category: Category,
  ): Promise<AxiosResponse<ServerResponse<Category>>> =>
    axios.put(`${url}/categories`, category),
};

export const topicsRequests = {
  fetchTopics: async (): Promise<AxiosResponse<ServerResponse<Topic[]>>> =>
    axios.get(`${url}/topics`),
  deleteTopic: async (
    id: string,
  ): Promise<AxiosResponse<ServerResponse<Topic>>> =>
    axios.delete(`${url}/topics/${id}`),
  addTopic: async (
    topic: Omit<Topic, 'id'>,
  ): Promise<AxiosResponse<ServerResponse<Topic>>> =>
    axios.post(`${url}/topics`, topic),
  editTopic: async (
    topic: Topic,
  ): Promise<AxiosResponse<ServerResponse<Topic>>> =>
    axios.put(`${url}/topics`, topic),
};
