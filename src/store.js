import { configureStore } from '@reduxjs/toolkit'

import usersReducer from "./slices/users";
import workspacesReducer from "./slices/workspaces";
import integrationsReducer from "./slices/integrations";
import flowsReducer from "./slices/flows";
import elementsReducer from "./slices/elements";

export const store = configureStore({
  reducer: {
    elements: elementsReducer,
    integrations: integrationsReducer,
    users: usersReducer,
    workspaces: workspacesReducer,
    flows: flowsReducer,
  },
})
