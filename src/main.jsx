import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./pages/HomePage/Home.jsx";
import ProjectPage from "./pages/ProjectPage/Project.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import Register from "./pages/AuthPage/Register.jsx";
import Login from "./pages/AuthPage/Login.jsx";
import store from "./store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import GetPostBidPage from "./pages/PostById/GetPostBidPage.jsx";
import Multi from "./pages/AuthPage/Multi.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
     
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/add-account" element={<Multi />} />
        <Route path="/new" element={<ProjectPage />} />
        <Route path="/:username" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/read/:postid" element={<GetPostBidPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
