import { combineReducers } from 'redux';

import categorySlice from './categories';

const rootReducer = combineReducers({
  categories: categorySlice,
});

export default rootReducer;
