// reducers와 extraReducers의 차이를 간단히 말하자면, 슬라이스를 정의할 때 reducers는 슬라이스의 상태를 어떻게 업데이트할지에 대한 로직을 정의하는 반면 extraReducers는 외부에서 생성된 액션에 대한 리듀서 로직을 정의한다는 것이다.

// 즉 reducers는 슬라이스의 상태를 갱신하는 일반적인 동기적 작업을 다루고, extraReducers는 비동기적인 작업이나 외부 액션과의 상호작용을 다루는 데 사용한다.

// create async thunk
// 액션 타입 문자열, 프로미스를 반환하는 비동기 함수, 추가 옵션 순서대로 인자를 받는 함수다.
// 입력받은 액션 타입 문자열을 기반으로 프로미스 라이프사이클 액션 타입을 생성하고, thunk action creator를 반환한다.
// thunk action creator: 프로미스 콜백을 실행하고 프로미스를 기반으로 라이프사이클 액션을 디스패치한다.
// 리듀서를 생성해주는 기능은 없기 때문에 액션들을 처리할 로직을 직접 작성해야 한다.

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  GET_VISITORS_API_URL,
  GET_REVENUE_API_URL,
  GET_CUSTOMERS_API_URL,
  GET_TARGET_REALITY_API_URL,
} from '../../constants/apiUrls';
import { getRequest } from '../../constants/methods';

// 공통된 비동기 액션 생성 함수
const createFetchThunk = (actionType, apiUrl) => {
  return createAsyncThunk(actionType, async () => {
    return await getRequest(apiUrl);
  });
};

// GET Visitors data
export const fetchVisitors = createFetchThunk(
  'fetchVisitors', // action type
  GET_VISITORS_API_URL
);

// GET Revenue data
export const fetchRevenue = createFetchThunk(
  'fetchRevenue', // action type
  GET_REVENUE_API_URL
);

// GET Customers data
export const fetchCustomers = createFetchThunk(
  'fetchCustomers', // action type
  GET_CUSTOMERS_API_URL
);

// GET Target vs Reality data
export const fetchTargetReality = createFetchThunk(
  'fetchTargetReality', // action type
  GET_TARGET_REALITY_API_URL
);

// 요청 성공 시 함수 정의
const handleFullfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // payload는 요청 성공 시 받은 데이터
};

// 요청 실패 시 함수 정의
const handleRejected = (state, action) => {
  console.log('Error', action.payload);
  // state.isError = true;
};

const apiSlice = createSlice({
  name: 'apis',
  initialState: {
    visitorsData: null,
    revenueData: null,
    customersData: null,
    targetRealityData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.fulfilled, handleFullfilled('visitorsData')) // 요청 성공 시
      .addCase(fetchVisitors.rejected, handleRejected) // 요청 실패 시
      .addCase(fetchRevenue.fulfilled, handleFullfilled('revenueData'))
      .addCase(fetchRevenue.rejected, handleRejected)
      .addCase(fetchCustomers.fulfilled, handleFullfilled('customersData'))
      .addCase(fetchCustomers.rejected, handleRejected)
      .addCase(
        fetchTargetReality.fulfilled,
        handleFullfilled('targetRealityData')
      )
      .addCase(fetchTargetReality.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
