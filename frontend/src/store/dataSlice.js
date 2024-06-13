import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  fileStatus: false,
  fileName: null,
  messages: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fileStatusUpdate: (state, action) => {
      state.fileStatus = true;
      state.fileName = action.payload.fileName;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addQuestion: (state, action) => {
      state.messages.push(action.payload.question);
    },
    addAnswer: (state, action) => {
      state.messages.push(action.payload.answer);
    },
    removeQuestion: (state, action) => {
      state.messages.pop();
    },
  },
});

export const {
  fileStatusUpdate,
  setLoading,
  addQuestion,
  addAnswer,
  removeQuestion,
} = dataSlice.actions;
export default dataSlice.reducer;
