import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Dispatch } from 'redux';

import type { RootState } from '..';

export interface Category {
  id: string;
  title: string;
  description: string;
}

interface CategoriesState {
  loading: boolean;
  error: string | null;
  categories: Category[];
}

export const initialState = {
  loading: false,
  error: null,
  categories: [] as Category[],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesStarted: (state: CategoriesState) => {
      state.loading = true;
    },
    getCategoriesSuccess: (
      state: CategoriesState,
      { payload }: PayloadAction<Category[]>,
    ) => {
      state.categories = payload;
      state.loading = false;
      state.error = null;
    },
    getCategoriesFailure: (
      state: CategoriesState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    deleteCategoryStarted: (state: CategoriesState) => {
      state.loading = true;
    },
    deleteCategorySuccess: (
      state: CategoriesState,
      { payload }: PayloadAction<string>,
    ) => {
      const indexToDelete = state.categories.findIndex(
        (category) => category.id === payload,
      );
      state.categories.splice(indexToDelete, 1);
      state.loading = false;
      state.error = null;
    },
    deleteCategoryFailure: (
      state: CategoriesState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    addCategoryStarted: (state: CategoriesState) => {
      state.loading = true;
    },
    addCategorySuccess: (
      state: CategoriesState,
      { payload }: PayloadAction<Category>,
    ) => {
      state.categories.push(payload);
      state.loading = false;
      state.error = null;
    },
    addCategoryFailure: (
      state: CategoriesState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    editCategoryStarted: (state: CategoriesState) => {
      state.loading = true;
    },
    editCategorySuccess: (
      state: CategoriesState,
      { payload }: PayloadAction<Category>,
    ) => {
      const indexToEdit = state.categories.findIndex(
        (category) => category.id === payload.id,
      );
      state.categories[indexToEdit] = payload;
      state.loading = false;
      state.error = null;
    },
    editCategoryFailure: (
      state: CategoriesState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  getCategoriesStarted,
  getCategoriesFailure,
  getCategoriesSuccess,
  deleteCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryStarted,
  addCategoryStarted,
  addCategoryFailure,
  addCategorySuccess,
  editCategoryFailure,
  editCategoryStarted,
  editCategorySuccess,
} = categoriesSlice.actions;

export const categoriesSelector = (state: RootState): CategoriesState =>
  state.categories;

export default categoriesSlice.reducer;

interface ServerResponse<ResultType> {
  message: string;
  result: ResultType;
}

interface ServerError {
  message: string;
}

export function fetchCategories(): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(getCategoriesStarted());
    axios
      .get<ServerResponse<Category[]>>(
        'https://interview-helper-api.herokuapp.com/api/categories',
      )
      .then((response) => dispatch(getCategoriesSuccess(response.data.result)))
      .catch((error: ServerError) =>
        dispatch(getCategoriesFailure(error.message)),
      );
  };
}

export function deleteCategory(id: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(deleteCategoryStarted());
    axios
      .delete<ServerResponse<Category>>(
        `https://interview-helper-api.herokuapp.com/api/categories/${id}`,
      )
      .then((response) =>
        dispatch(deleteCategorySuccess(response.data.result.id)),
      )
      .catch((error: ServerError) =>
        dispatch(deleteCategoryFailure(error.message)),
      );
  };
}

export function addCategory(
  category: Omit<Category, 'id'>,
): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(addCategoryStarted());
    axios
      .post<ServerResponse<Category>>(
        `https://interview-helper-api.herokuapp.com/api/categories`,
        category,
      )
      .then((response) => dispatch(addCategorySuccess(response.data.result)))
      .catch((error: ServerError) =>
        dispatch(addCategoryFailure(error.message)),
      );
  };
}

export function editCategory(category: Category): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(editCategoryStarted());
    axios
      .put<ServerResponse<Category>>(
        `https://interview-helper-api.herokuapp.com/api/categories`,
        category,
      )
      .then((response) => dispatch(editCategorySuccess(response.data.result)))
      .catch((error: ServerError) =>
        dispatch(editCategoryFailure(error.message)),
      );
  };
}
