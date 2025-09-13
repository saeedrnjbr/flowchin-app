import { fetchUserCurrent, fetchUserLogin, fetchUserVerify } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    verifyIsLoading: false,
    verifyData: [],
    verifyError: false,

    currentIsLoading: true,
    currentData: [],
    currentError: undefined,

};

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchUserLogin.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchUserLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })


        builder.addCase(fetchUserVerify.pending, (state) => {
            state.verifyIsLoading = true;
            state.verifyError = false;
            state.verifyData = [];
            state.isLoading = false;
            state.data = [];
            state.error = false;
        })
        builder.addCase(fetchUserVerify.fulfilled, (state, action) => {
            state.verifyIsLoading = false;
            state.verifyData = action.payload.data;
            state.verifyError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchUserVerify.rejected, (state) => {
            state.verifyIsLoading = false;
            state.verifyError = false;
        })


        builder.addCase(fetchUserCurrent.pending, (state) => {
            state.currentIsLoading = true;
            state.currentData = undefined;
        })
        builder.addCase(fetchUserCurrent.fulfilled, (state, action) => {
            state.currentIsLoading = false;
            state.currentData = action.payload.data;
            state.currentError = action.payload.message ? true : action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchUserCurrent.rejected, (state) => {
            state.currentIsLoading = false;
            state.currentError = true;
        })

    }
});

export const { LOGIN_USERS, VERIFY_USER } = userSlice.actions;

export default userSlice.reducer;