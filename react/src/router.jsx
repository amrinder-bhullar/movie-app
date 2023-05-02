import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to={"/dashboard"} />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/search",
                element: <Search />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;
