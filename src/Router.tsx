import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { App } from "./App";
import { DreamTeam } from "@/views/DreamTeam";

const routes = {
  home: {
    path: "/",
    element: App,
  },
  dreamTeam: {
    path: "/dream-team",
    element: DreamTeam,
  },
};

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: Object.values(routes).map(({ element: Element, path }) => ({
      path,
      element: <Element />,
    })),
  },
  { path: "*", element: <div className="notfound">Page not found</div> },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
