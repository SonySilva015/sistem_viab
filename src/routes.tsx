import { createHashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/dash";
import Settings from "./pages/config";

export const router = createHashRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/configuracoes",
                element: <Settings />,
            },
        ],
    },
]);