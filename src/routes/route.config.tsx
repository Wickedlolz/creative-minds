import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
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
                async lazy() {
                    const { default: Login } = await import('../pages/Login');

                    return { Component: Login };
                },
            },
            {
                path: 'dashboard',
                async lazy() {
                    const { default: Dashboard } = await import(
                        '../pages/Dashboard'
                    );
                    return { Component: Dashboard };
                },
            },
            {
                path: 'post',
                async lazy() {
                    const { default: Post } = await import('../pages/Post');

                    return { Component: Post };
                },
            },
            {
                path: 'post/:id',
                async lazy() {
                    const { default: Post } = await import('../pages/Post');

                    return { element: <Post isInEditMode /> };
                },
            },
            {
                path: 'details/:id',
                async lazy() {
                    const { default: Details } = await import(
                        '../pages/Details'
                    );

                    return { Component: Details };
                },
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
