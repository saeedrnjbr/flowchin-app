import { fetchCreateWorkspace, fetchWorkspaceDelete, fetchWorkspaces } from "@/pages/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
    isLoading: false,
    data: [],
    message: "",
    error: false,

    workspacesIsLoading: false,
    workspacesData: [],
    workspacesError: false,

    workspaceDeleteIsLoading: false,
    workspaceDeleteData: [],
    workspaceDeleteError: false,
};

const workspaceSlice = createSlice({
    name: "workspaces",
    initialState,
    extraReducers: (builder) => {

        builder.addCase(fetchCreateWorkspace.pending, (state, action) => {
            state.isLoading = true;
            state.error = false;
            state.data = [];
        })
        builder.addCase(fetchCreateWorkspace.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            state.error = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchCreateWorkspace.rejected, (state, action) => {
            state.isLoading = false;
            state.error = false;
        })


        builder.addCase(fetchWorkspaces.pending, (state, action) => {
            state.workspacesIsLoading = true;
            state.workspacesError = false;
            state.workspacesData = undefined;
        })
        builder.addCase(fetchWorkspaces.fulfilled, (state, action) => {
            state.workspacesIsLoading = false;
            state.workspacesData = action.payload.data;
            state.workspacesError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchWorkspaces.rejected, (state, action) => {
            state.workspacesIsLoading = false;
            state.workspacesError = false;
        })


        builder.addCase(fetchWorkspaceDelete.pending, (state, action) => {
            state.workspaceDeleteIsLoading = true;
            state.workspaceDeleteError = false;
            state.workspaceDeleteData = [];
        })
        builder.addCase(fetchWorkspaceDelete.fulfilled, (state, action) => {
            state.workspaceDeleteIsLoading = false;
            state.workspaceDeleteData = action.payload.data;
            state.workspaceDeleteError = action.payload.error;
            state.message = action.payload.message;
        })
        builder.addCase(fetchWorkspaceDelete.rejected, (state, action) => {
            state.workspaceDeleteIsLoading = false;
            state.workspaceDeleteError = false;
        })


    }
});

export const { CREATE_WORKSPACE, LIST_WORKSPACE, DELETE_WORKSPACE } = workspaceSlice.actions;

export default workspaceSlice.reducer;