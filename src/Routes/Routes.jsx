import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import BioDatas from "../Pages/BioDatas/BioDatas";
import PrivateRoute from "./PrivateRoute";
import BioDataDetails from "../Pages/BioDatas/BioDataDetails";
import Dashboard from "../Layouts/Dashboard";
import EditBioData from "../Pages/Dashboard/EditBioData/EditBioData";
import ViewBioData from "../Pages/Dashboard/ViewBioData/ViewBioData";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/biodatas',
                element: <PrivateRoute> <BioDatas /></PrivateRoute>
            },
            {
                path: '/biodata/:id',
                element: <PrivateRoute> <BioDataDetails /></PrivateRoute>
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard/edit-bio-data',
                element: <EditBioData />
            },
            {
                path: '/dashboard/view-bio-data',
                element: <ViewBioData />
            },
            {
                path: '/dashboard/admin',
                element: <AdminDashboard />
            },
        ]
    }
]);
