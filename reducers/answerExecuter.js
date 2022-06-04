import { createSlice } from "@reduxjs/toolkit";

const initialState = {}; // do this when i have more data to store in initialState
export const counterReducer = createSlice({
  name: "stupidname",
  initialState,
  reducers: {
    addtext: (state, action) => {
      state[action.payload.id] = action.payload.value;
    },
    deleteState: (state) => {
      Object.keys(state).forEach((key) => {
        delete state[key];
      });
    },
    checkAnswers: (state) => {
      let scores = 0;
      const keys = Object.keys(state);
      const values = Object.values(state);
      if (keys.length > 0) {
        for (let i = 0; i < 4; i++) {
          if (keys[i]) {
            if (keys[i] === values[i]) {
              scores++;
            }
          }
        }
        state.scores = scores;
      } else {
        state.scores = scores;
      }
    },
  },
});
//for actions
export const { addtext, deleteState, checkAnswers } = counterReducer.actions;
//for combined reducer i think
export default counterReducer.reducer;
//for selector, store's specific data, call by reducer's name i put into store.js
//export const selectAnswer = (store) => store.counterReducer.answer; //store or state, just a name, a var in func.
