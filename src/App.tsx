import { RouterProvider } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext';
import { router } from './routes/route.config';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <FirebaseProvider>
            <RouterProvider router={router} />
        </FirebaseProvider>
    );
};

export default App;
