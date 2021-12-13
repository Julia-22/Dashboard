import { createReducer, combineReducers } from "@reduxjs/toolkit";
import action from './action';

const boardsReducer = createReducer([], {
  [action.getBoadrsSuccess]: (_, { payload }) => [...payload],
  [action.setBoadrs]: (_, { payload }) => [...payload],
});

const currentBoardReducer = createReducer(null, {
  [action.setCurrentBoard]: (_, { payload }) => payload,
});

const currentItemReducer = createReducer(null, {
  [action.setCurrentItem]: (_, { payload }) => payload,
});

const loadingBoard = createReducer(false, {
  [action.getBoadrsRequest]: () => true,
  [action.getBoadrsSuccess]: () => false,
})

export default combineReducers({
  boards: boardsReducer,
  currentBoard: currentBoardReducer,
  currentItem: currentItemReducer,
  loadingBoard
})