import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Nav from './Nav';

const Layout = () => {
    return (
        <div className="mx-6 md:max-w-2xl md:mx-auto">
            <Nav />
            <main>
                <Outlet />
            </main>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Layout;
