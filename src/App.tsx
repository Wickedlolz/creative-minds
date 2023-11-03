import { Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./context/FirebaseContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";

import "react-toastify/dist/ReactToastify.css";
import Details from "./pages/Details";

const App = () => {
  return (
    <FirebaseProvider>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<Post isInEditMode={true} />} />
          <Route path="/:id" element={<Details />} />
        </Routes>
      </Layout>
    </FirebaseProvider>
  );
};

export default App;
