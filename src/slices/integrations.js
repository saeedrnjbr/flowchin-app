import { fetchCoreIntegrationInterface, fetchCoreIntegrations, fetchToolsIntegrations } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    data: [],
    message: "",
    error: false,

    interfaceIsLoading: false,
    interfaceData: undefined,
    interfaceError: false,

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

        builder.addCase(fetchCoreIntegrationInterface.pending, (state, action) => {
            state.interfaceIsLoading = true;
            state.interfaceError = false;
            state.interfaceData = undefined;
        })
        builder.addCase(fetchCoreIntegrationInterface.fulfilled, (state, action) => {
            state.interfaceIsLoading = false;
            state.interfaceData = action.payload.data;
            state.interfaceError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCoreIntegrationInterface.rejected, (state, action) => {
            state.interfaceIsLoading = false;
            state.interfaceError = false;
        })

    }
});

export const { LIST_INTEGRATION } = integrationSlice.actions;

export default integrationSlice.reducer;