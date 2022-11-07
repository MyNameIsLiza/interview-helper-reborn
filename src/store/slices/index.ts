import { combineReducers } from 'redux';

import categorySlice from './categories';
import topicsSlice from './topics';

const rootReducer = combineReducers({
  categories: categorySlice,
  topics: topicsSlice,
});

export default rootReducer;
