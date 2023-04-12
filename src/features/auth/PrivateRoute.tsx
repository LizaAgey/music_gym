import React from 'react';
import {Route, Navigate, useLocation, RouteProps, Outlet} from 'react-router-dom';
import {useAuth} from "./AuthContext";

interface PrivateRouteProps {
    path: string;
    element: React.ReactNode;
}

export const PrivateRoute = (): JSX.Element => {
    const { isAuthenticated } = useAuth();

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

