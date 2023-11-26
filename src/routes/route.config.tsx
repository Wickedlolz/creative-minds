import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Post from '../pages/Post';
import Login from '../pages/Login';
import Details from '../pages/Details';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />,
                errorElement: <NotFound />,
            },
            {
                path: 'auth/login',
                element: <Login />,
                errorElement: <NotFound />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                errorElement: <NotFound />,
            },
            {
                path: 'post',
                element: <Post />,
                errorElement: <Post />,
            },
            {
                path: 'post/:id',
                element: <Post isInEditMode />,
                errorElement: <NotFound />,
            },
            {
                path: 'details/:id',
                element: <Details />,
                errorElement: <NotFound />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
