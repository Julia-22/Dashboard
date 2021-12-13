import { create } from "@mui/material/styles/createTransitions";
import { createAction } from "@reduxjs/toolkit";

const getBoadrsRequest = createAction('dashboard/getBoadrsRequest');
const getBoadrsSuccess = createAction('dashboard/getBoadrsSuccess');
const getBoadrsError = createAction('dashboard/getBoadrsError');

const setBoadrs = createAction('dashboard/setBoadrs');

const setCurrentBoard = createAction('dashboard/setCurrentBoard');

const setCurrentItem = createAction('dashboard/setCurrentItem');



export default {
  getBoadrsRequest,
  getBoadrsSuccess,
  getBoadrsError,
  setBoadrs,
  setCurrentBoard,
  setCurrentItem
}