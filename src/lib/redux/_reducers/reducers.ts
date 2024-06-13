import { combineReducers } from '@reduxjs/toolkit';
import AuthenticationSlice from '~/lib/redux/_slices/authentication/authentication.slice';
import CounterSlice from '~/lib/redux/_slices/counter/counter.slice';

const reducers = combineReducers({
    counter: CounterSlice,
    authentication: AuthenticationSlice,
});

export default reducers;
