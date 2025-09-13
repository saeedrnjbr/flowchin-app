import { fetchCoreIntegrations, fetchToolsIntegrations } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false

};

const integrationSlice = createSlice({
    name: "integrations",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchCoreIntegrations.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchCoreIntegrations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCoreIntegrations.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

    }
});

export const { LIST_INTEGRATION } = integrationSlice.actions;

export default integrationSlice.reducer;