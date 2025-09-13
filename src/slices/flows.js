import { fetchCreateFlow, fetchFlow, fetchFlows } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    isLoading: false,
    data: [],
    message: "",
    error: false,

    flowIsLoading: false,
    flowData: undefined,
    flowError: false,

    flowsIsLoading: false,
    flowsData: undefined,
    flowsError: false,

};

const flowSlice = createSlice({
    name: "flows",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchCreateFlow.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
            state.flowsData = undefined;
            state.flowData = undefined;
        })
        builder.addCase(fetchCreateFlow.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCreateFlow.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })

        builder.addCase(fetchFlows.pending, (state, action) => {
            state.flowsIsLoading = true;
            state.flowsError = false;
            state.flowsData = undefined;
            state.flowData = undefined;
        })
        builder.addCase(fetchFlows.fulfilled, (state, action) => {
            state.flowsIsLoading = false;
            state.flowsData = action.payload.data;
            state.flowsError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchFlows.rejected, (state, action) => {
            state.flowsIsLoading = false;
            state.flowsError = false;
        })

        builder.addCase(fetchFlow.pending, (state, action) => {
            state.flowIsLoading = true;
            state.flowError = false;
            state.flowData = undefined;
        })
        builder.addCase(fetchFlow.fulfilled, (state, action) => {
            state.flowIsLoading = false;
            state.flowData = action.payload.data;
            state.flowError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchFlow.rejected, (state, action) => {
            state.flowIsLoading = false;
            state.flowError = false;
        })

    }
});

export const { CREATE_FLOW, LIST_FLOW, GET_FLOW } = flowSlice.actions;

export default flowSlice.reducer;