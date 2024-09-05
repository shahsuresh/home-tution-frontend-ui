import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import guestRoutes from "./routes/guestRoutes.jsx";
import mainRoutes from "./routes/mainRoutes.jsx";
import { Provider } from "react-redux";
import reduxStore from "./store/store";

//? Create a client to use tanstack/react-query and Provide the client to your App
const queryClient = new QueryClient();

//? create router to use react-router-dom package for client side routing
const router = createBrowserRouter([...guestRoutes, ...mainRoutes]);

createRoot(document.getElementById("root")).render(
  //   Provide the queryClient to your App from tanstack/react query
  //   provider of redux store
  <Provider store={reduxStore}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
);
