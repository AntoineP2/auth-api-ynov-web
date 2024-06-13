import { createSlice } from '@reduxjs/toolkit';

const sliceName = 'authenticationSlice';

type AuthenticationState = {
    userFirstName: string;
    userLastName: string;
    userTrigramme: string;
    userMail: string;
};

const initialState: CountState = {
    userFirstName: '',
    userLastName: '',
    userTrigramme: '',
    userMail: '',
};

const AuthenticationSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        resetUserData: state => {
            state.userFirstName = '';
            state.userLastName = '';
            state.userTrigramme = '';
            state.userMail = '';
        },
        setUserData: (state, action) => {
            const { userFirstName, userLastName, userTrigramme, userMail } = action.payload;
            state.userFirstName = userFirstName;
            state.userLastName = userLastName;
            state.userTrigramme = userTrigramme;
            state.userMail = userMail;
        },
    },
    extraReducers: () => {
        // Add your extra reducers here
    },
});

export const { resetUserData, setUserData } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
