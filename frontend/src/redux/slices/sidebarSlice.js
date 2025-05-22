import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebarOpen: (state) => {
      state.isSidebarOpen = true;
    },

    setSidebarClose: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { setSidebarOpen, setSidebarClose } = sidebarSlice.actions; // 업데이트 되는 내용 actions

export default sidebarSlice.reducer;
