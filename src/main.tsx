import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./routers/router.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { CustomThemeProvider } from "./commons/context/ThemeContext";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CustomThemeProvider>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </CustomThemeProvider>
  </StrictMode>,
);
