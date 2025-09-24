import { fetchCreateFlow, fetchDeleteFlow, fetchDuplicateFlow, fetchFlow, fetchFlows, fetchUpdateFlow, fetchUpdateFlowWorkspace } from "@/pages/api";
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

    flowDeleteIsLoading: false,
    flowDeleteData: [],
    flowDeleteError: false,

    flowDuplicateIsLoading: false,
    flowDuplicateData: [],
    flowDuplicateError: false,

    flowUpdateIsLoading: false,
    flowUpdateData: [],
    flowUpdateError: false,

    flowUpdateWorkspaceIsLoading: false,
    flowUpdateWorkspaceData: [],
    flowUpdateWorkspaceError: false,

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

        builder.addCase(fetchDeleteFlow.pending, (state, action) => {
            state.flowDeleteIsLoading = true;
            state.flowDeleteError = false;
            state.flowDeleteData = [];
        })
        builder.addCase(fetchDeleteFlow.fulfilled, (state, action) => {
            state.flowDeleteIsLoading = false;
            state.flowDeleteData = action.payload.data;
            state.flowDeleteError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchDeleteFlow.rejected, (state, action) => {
            state.flowDeleteIsLoading = false;
            state.flowDeleteError = false;
        })

        builder.addCase(fetchDuplicateFlow.pending, (state, action) => {
            state.flowDuplicateIsLoading = true;
            state.flowDuplicateError = false;
            state.flowDuplicateData = [];
        })
        builder.addCase(fetchDuplicateFlow.fulfilled, (state, action) => {
            state.flowDuplicateIsLoading = false;
            state.flowDuplicateData = action.payload.data;
            state.flowDuplicateError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchDuplicateFlow.rejected, (state, action) => {
            state.flowDuplicateIsLoading = false;
            state.flowDuplicateError = false;
        })

        builder.addCase(fetchUpdateFlow.pending, (state, action) => {
            state.flowUpdateIsLoading = true;
            state.flowUpdateError = false;
            state.flowUpdateData = [];
        })
        builder.addCase(fetchUpdateFlow.fulfilled, (state, action) => {
            state.flowUpdateIsLoading = false;
            state.flowUpdateData = action.payload.data;
            state.flowUpdateError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchUpdateFlow.rejected, (state, action) => {
            state.flowUpdateIsLoading = false;
            state.flowUpdateError = false;
        })

        builder.addCase(fetchUpdateFlowWorkspace.pending, (state, action) => {
            state.flowUpdateWorkspaceIsLoading = true;
            state.flowUpdateWorkspaceError = false;
            state.flowUpdateWorkspaceData = [];
        })
        builder.addCase(fetchUpdateFlowWorkspace.fulfilled, (state, action) => {
            state.flowUpdateWorkspaceIsLoading = false;
            state.flowUpdateWorkspaceData = action.payload.data;
            state.flowUpdateWorkspaceError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchUpdateFlowWorkspace.rejected, (state, action) => {
            state.flowUpdateWorkspaceIsLoading = false;
            state.flowUpdateWorkspaceError = false;
        })



    }
});

export const { CREATE_FLOW, LIST_FLOW, GET_FLOW, DELETE_FLOW, DUPLICATE_FLOW, UPDATE_FLOW } = flowSlice.actions;

export default flowSlice.reducer;