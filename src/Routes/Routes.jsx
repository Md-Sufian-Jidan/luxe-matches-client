import { createBrowserRouter } from "react-router-dom";
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
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ApprovePremium from "../Pages/Dashboard/ApprovePremium/ApprovePremium";
import AdminSuccessStories from "../Pages/Dashboard/AdminSuccessStories/AdminSuccessStories";
import GotMarried from "../Pages/Dashboard/GotMarried/GotMarried";
import ApprovedContactRequest from "../Pages/Dashboard/ApprovedContactRequest/ApprovedContactRequest";
import MyFavourites from "../Pages/Dashboard/MyFavourites/MyFavourites";
import Payment from "../Components/Payment/Payment";
import MyContactRequest from "../Pages/Dashboard/MyContactRequest/MyContactRequest";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Contact from "../Pages/Contact/Contact";
import AdminRoute from "../Routes/AdminRoute";

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
                path: '/user/view-bioData/:id',
                element: <PrivateRoute> <BioDataDetails /></PrivateRoute>
            },
            {
                path: '/about',
                element: <AboutUs />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/checkout/:id',
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard/edit-bio-data',
                element: <PrivateRoute><EditBioData /></PrivateRoute>
            },
            {
                path: '/dashboard/view-bio-data',
                element: <PrivateRoute><ViewBioData /></PrivateRoute>
            },
            {
                path: '/dashboard/favourites',
                element: <PrivateRoute><MyFavourites /></PrivateRoute>
            },
            {
                path: '/dashboard/requests',
                element: <PrivateRoute><MyContactRequest /></PrivateRoute>
            },
            {
                path: '/dashboard/married',
                element: <PrivateRoute><GotMarried /></PrivateRoute>
            },
            // admin routes
            {
                path: '/dashboard/admin',
                element: <AdminRoute><AdminDashboard /></AdminRoute>
            },
            {
                path: '/dashboard/manage-users',
                element: <AdminRoute><ManageUsers /></AdminRoute>
            },
            {
                path: '/dashboard/approve-premium',
                element: <AdminRoute><ApprovePremium /></AdminRoute>
            },
            {
                path: '/dashboard/approve-contacts',
                element: <AdminRoute><ApprovedContactRequest /></AdminRoute>
            },
            {
                path: '/dashboard/success-stories',
                element: <AdminRoute><AdminSuccessStories /></AdminRoute>
            },
        ]
    },
]);
