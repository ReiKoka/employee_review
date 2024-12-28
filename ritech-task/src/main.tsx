import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/index";
import { Toaster } from "sonner";
import { ModalProvider } from "./context/ModalContext.tsx";
import { IdsProvider } from "./context/IdsContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

// ...

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <IdsProvider>
            <ModalProvider>
              <App />
              <ReactQueryDevtools />
              <Toaster position="top-center" />
            </ModalProvider>
          </IdsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
