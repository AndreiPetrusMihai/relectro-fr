import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CustomProviders from "./app/CustomProviders";
import { theme } from "./app/theme";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <CustomProviders>
              <App />
            </CustomProviders>
          </NotificationsProvider>
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
