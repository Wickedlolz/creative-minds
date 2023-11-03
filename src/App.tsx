import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext';

import Layout from './components/Layout';
import Home from './pages/Home';
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Post = lazy(() => import('./pages/Post'));
const Details = lazy(() => import('./pages/Details'));

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <FirebaseProvider>
            <Layout>
                <Routes>
                    <Route index element={<Home />} />
                    <Route
                        path="/auth/login"
                        element={
                            <Suspense fallback="Loading...">
                                <Login />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <Suspense fallback="Loading...">
                                <Dashboard />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/post"
                        element={
                            <Suspense fallback="Loading...">
                                <Post />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/post/:id"
                        element={
                            <Suspense fallback="Loading...">
                                <Post isInEditMode={true} />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/:id"
                        element={
                            <Suspense fallback="Loading...">
                                <Details />
                            </Suspense>
                        }
                    />
                </Routes>
            </Layout>
        </FirebaseProvider>
    );
};

export default App;
