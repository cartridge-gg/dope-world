import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Bridge from "./routes/Bridge";
import Faq from "./routes/Faq";
import Terms from "./routes/Terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Bridge />
      </Layout>
    ),
  },
  {
    path: "/terms",
    element: (
      <Layout>
        <Terms />
      </Layout>
    ),
  },
  {
    path: "/faq",
    element: (
      <Layout>
        <Faq />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
