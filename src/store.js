import { configureStore } from '@reduxjs/toolkit'

import usersReducer from "./slices/users";
import workspacesReducer from "./slices/workspaces";
import integrationsReducer from "./slices/integrations";
import flowsReducer from "./slices/flows";

export const store = configureStore({
  reducer: {
    integrations: integrationsReducer,
    users: usersReducer,
    workspaces: workspacesReducer,
    flows: flowsReducer,
  },
})
