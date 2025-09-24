
import { createAsyncThunk } from "@reduxjs/toolkit";

export const BASE_URL = "http://localhost:8000/api"
export const BASE_URL_UI = "http://localhost:3000"

// export const BASE_URL = "https://admin.mylancerhub.app/api"

export const fetchUserLogin = createAsyncThunk("fetchUserLogin", async (data) => {
    const res = await fetch(`${BASE_URL}/users/login`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    return res?.json();
});



export const fetchUserVerify = createAsyncThunk("fetchUserVerify", async (data) => {
    const res = await fetch(`${BASE_URL}/users/verify`, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    return res?.json();
});

export const fetchUserCurrent = createAsyncThunk("fetchUserCurrent", async () => {
    const res = await fetch(`${BASE_URL}/user`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Accept": "application/json",
        }
    });
    return res?.json();
});

export const fetchCreateWorkspace = createAsyncThunk("fetchCreateWorkspace", async (data) => {
    const res = await fetch(`${BASE_URL}/workspaces${data.id ? "/" + data.id : ""}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    return res?.json();
});


export const fetchCreateFlow = createAsyncThunk("fetchCreateFlow", async (data) => {
    const res = await fetch(`${BASE_URL}/flows${data.id ? "/" + data.id : ""}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    return res?.json();
});

export const fetchUpdateFlowWorkspace = createAsyncThunk("fetchUpdateFlowWorkspace", async (data) => {
    const res = await fetch(`${BASE_URL}/flows/workspace/${data.id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
    });
    return res?.json();
});

export const fetchUpdateFlow = createAsyncThunk("fetchUpdateFlow", async (data) => {

  let form = new FormData();

  form.append('content', data["content"] ?? "");

  form.append('has_marketplace', data["has_marketplace"] ? 1 : 0);

  form.append('description', data["description"] ?? "");

  form.append('price', data["price"] ?? 0);

  form.append('icon', data["icon"] ?? "");

  form.append('discount', data["discount"] ?? 0);    

  const res = await fetch(`${BASE_URL}/flows/${data.id}`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
    },
    method: "POST",
    body: form,
  });
  return res?.json();
});


export const fetchDeleteFlow = createAsyncThunk("fetchDeleteFlow", async (data) => {
    const res = await fetch(`${BASE_URL}/flows/delete/${data.id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
    return res?.json();
});

export const fetchDuplicateFlow = createAsyncThunk("fetchDuplicateFlow", async (data) => {
    const res = await fetch(`${BASE_URL}/flows/copy/${data.id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        }
    });
    return res?.json();
});

export const fetchFlows = createAsyncThunk("fetchFlows", async (id) => {
    const res = await fetch(`${BASE_URL}/flows`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Accept": "application/json",
        }
    });
    return res?.json();
});


export const fetchFlow = createAsyncThunk("fetchFlow", async (id) => {
    const res = await fetch(`${BASE_URL}/flows/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Accept": "application/json",
        }
    });
    return res?.json();
});

export const fetchWorkspaces = createAsyncThunk("fetchWorkspaces", async () => {
    const res = await fetch(`${BASE_URL}/workspaces`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Accept": "application/json",
        }
    });
    return res?.json();
});


export const fetchWorkspaceDelete = createAsyncThunk("fetchWorkspaceDelete", async ({ id }) => {
    const res = await fetch(`${BASE_URL}/workspaces/delete/${id}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Accept": "application/json",
        }
    });
    return res?.json();
});

export const fetchCoreIntegrations = createAsyncThunk("fetchCoreIntegrations", async () => {
    const res = await fetch(`${BASE_URL}/integrations`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Accept": "application/json",
        }
    });
    return res?.json();
});

export const fetchCoreElements = createAsyncThunk("fetchCoreElements", async () => {
    const res = await fetch(`${BASE_URL}/elements`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("_token_")}`,
            "Accept": "application/json",
        }
    });
    return res?.json();
});


export const fetchCoreIntegrationInterface = createAsyncThunk("fetchCoreIntegrationInterface", async () => {
    const res = await fetch(`${BASE_URL}/integrations/interface`, {
        headers: {
            "Accept": "application/json",
        }
    });
    return res?.json();
});