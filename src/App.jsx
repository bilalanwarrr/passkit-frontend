import MainLayout from "./layouts/MainLayout";
import CreateCampaign from "./screens/CreateCampaign";
import CreateTemplate from "./screens/CreateTemplate";
import CreateCoupons from "./screens/CreateCoupons";
import Home from "./screens/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loader from "./utils/Loader";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./screens/Login";
import PrivateRoutes from "./AuthRoutes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-campaign",
        element: <CreateCampaign />,
      },
      {
        path: "/create-template",
        element: <CreateTemplate />,
      },
      {
        path: "/create-passes",
        element: <CreateCoupons />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />

        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </div>
    </>
  );
};

export default App;
