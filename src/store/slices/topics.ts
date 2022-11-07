import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Dispatch } from 'redux';

import type { ServerError } from '../../services/api';
import { topicsRequests } from '../../services/api';
import type { Topic } from '../../types';
import type { RootState } from '..';

interface TopicsState {
  loading: boolean;
  error: string | null;
  topics: Topic[];
}

export const initialState = {
  loading: false,
  error: null,
  topics: [] as Topic[],
};

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
    getTopicsStarted: (state: TopicsState) => {
      state.loading = true;
    },
    getTopicsSuccess: (
      state: TopicsState,
      { payload }: PayloadAction<Topic[]>,
    ) => {
      state.topics = payload;
      state.loading = false;
      state.error = null;
    },
    getTopicsFailure: (
      state: TopicsState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    deleteTopicStarted: (state: TopicsState) => {
      state.loading = true;
    },
    deleteTopicSuccess: (
      state: TopicsState,
      { payload }: PayloadAction<string>,
    ) => {
      const indexToDelete = state.topics.findIndex(
        (topic) => topic.id === payload,
      );
      state.topics.splice(indexToDelete, 1);
      state.loading = false;
      state.error = null;
    },
    deleteTopicFailure: (
      state: TopicsState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    addTopicStarted: (state: TopicsState) => {
      state.loading = true;
    },
    addTopicSuccess: (
      state: TopicsState,
      { payload }: PayloadAction<Topic>,
    ) => {
      state.topics.push(payload);
      state.loading = false;
      state.error = null;
    },
    addTopicFailure: (
      state: TopicsState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
    editTopicStarted: (state: TopicsState) => {
      state.loading = true;
    },
    editTopicSuccess: (
      state: TopicsState,
      { payload }: PayloadAction<Topic>,
    ) => {
      const indexToEdit = state.topics.findIndex(
        (topic) => topic.id === payload.id,
      );
      state.topics[indexToEdit] = payload;
      state.loading = false;
      state.error = null;
    },
    editTopicFailure: (
      state: TopicsState,
      { payload }: PayloadAction<string>,
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const {
  getTopicsStarted,
  getTopicsFailure,
  getTopicsSuccess,
  deleteTopicFailure,
  deleteTopicSuccess,
  deleteTopicStarted,
  addTopicStarted,
  addTopicFailure,
  addTopicSuccess,
  editTopicFailure,
  editTopicStarted,
  editTopicSuccess,
} = topicsSlice.actions;

export const topicsSelector = (state: RootState): TopicsState => state.topics;

export default topicsSlice.reducer;

export function fetchTopics(): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(getTopicsStarted());
    topicsRequests
      .fetchTopics()
      .then((response) => dispatch(getTopicsSuccess(response.data.result)))
      .catch((error: ServerError) => dispatch(getTopicsFailure(error.message)));
  };
}

export function deleteTopic(id: string): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(deleteTopicStarted());
    topicsRequests
      .deleteTopic(id)
      .then((response) => dispatch(deleteTopicSuccess(response.data.result.id)))
      .catch((error: ServerError) =>
        dispatch(deleteTopicFailure(error.message)),
      );
  };
}

export function addTopic(
  topic: Omit<Topic, 'id'>,
): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(addTopicStarted());
    topicsRequests
      .addTopic(topic)
      .then((response) => dispatch(addTopicSuccess(response.data.result)))
      .catch((error: ServerError) => dispatch(addTopicFailure(error.message)));
  };
}

export function editTopic(topic: Topic): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    dispatch(editTopicStarted());
    topicsRequests
      .editTopic(topic)
      .then((response) => dispatch(editTopicSuccess(response.data.result)))
      .catch((error: ServerError) => dispatch(editTopicFailure(error.message)));
  };
}
