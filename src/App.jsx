import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ImageDetails from "./pages/ImageDetails";
import Collections from "./pages/Collections";
import CollectionPhotos from "./pages/CollectionPhotos";
import { UserProvider, useUserContext } from "./contexts/UserContext";
import HandleLogin from "./pages/HandleLogin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 3 * 1000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="/login" element={<HandleLogin />} />
              <Route
                path="home/images/:imageQuery"
                element={<SearchResults />}
              />
              <Route path="home/image/:imageId" element={<ImageDetails />} />
              <Route path="collections" element={<Collections />} />
              <Route
                path="collections/:collectionId"
                element={<CollectionPhotos />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#E5E7EB",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
