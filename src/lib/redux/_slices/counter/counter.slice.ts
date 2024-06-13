import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceName = 'countSlice';

type CountState = {
    currentCount: number;
};

const initialState: CountState = {
    currentCount: 0,
};

const CountStateSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        incrementCounter: state => {
            state.currentCount = state.currentCount += 1;
        },
        decrementCounter: state => {
            state.currentCount = state.currentCount -= 1;
        },
    },
    extraReducers: () => {},
});

export const { incrementCounter, decrementCounter } = CountStateSlice.actions;

export default CountStateSlice.reducer;
