import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { WorkIndex } from "./pages/WorkIndex";
import { WorkDetail } from "./pages/WorkDetail";
import { Domains } from "./pages/Domains";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "work", Component: WorkIndex },
      { path: "work/:slug", Component: WorkDetail },
      { path: "domains", Component: Domains },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);