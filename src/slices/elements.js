import { fetchCoreElements } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false
};

const elementSlice = createSlice({
    name: "elements",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchCoreElements.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchCoreElements.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCoreElements.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

    }
});

export const { LIST_ELEMENT } = elementSlice.actions;

export default elementSlice.reducer;