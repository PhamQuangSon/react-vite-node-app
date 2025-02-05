import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CustomPointer from "@/components/CustomPointer";
import Message from "@/components/Message";
import { useThemeStore } from "@/store/themeStore";
import withCloseTabLogging from "@/utils/withCloseTabLogging";
import withLayout from "@/utils/withLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-quill/dist/quill.snow.css";

const Article = lazy(() => import("@/pages/Article"));
const Articles = lazy(() => import("@/pages/Articles"));
const ErrorPage = lazy(() => import("@/pages/ErrorPage"));
const Home = lazy(() => import("@/pages/Home"));
const Notifications = lazy(() => import("@/pages/Notifications"));
const Post = lazy(() => import("@/pages/Post"));
const Profile = lazy(() => import("@/pages/Profile"));
const Search = lazy(() => import("@/pages/Search"));
const SignIn = lazy(() => import("@/pages/SignIn"));

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Message text="Loading app..." />}>
        <Routes>
          <Route path="/" element={<Home />} key="Home" />
          <Route
            path="/notifications"
            element={<Notifications />}
            key="Notifications"
          />
          <Route path="/sign-in" element={<SignIn />} key="SignIn" />
          <Route path="/post" element={<Post />} key="Post" />
          <Route path="/me/profile" element={<Profile />} key="Profile" />
          <Route path="/articles" element={<Articles />} key="Articles" />
          <Route path="/article" element={<Article />} key="Article" />
          <Route path="/search" element={<Search />} key="Search" />
          <Route path="*" element={<ErrorPage />} key="Error" />
        </Routes>
        <ToastContainer stacked />
        <CustomPointer />
      </Suspense>
    </QueryClientProvider>
  );
}

export default withCloseTabLogging(withLayout(App));
