import { createHashRouter } from 'react-router-dom';
import App from "./Components/App.jsx";
import Play from "./Components/Play.jsx";
import NotFound from "./Components/NotFound.jsx";
import DefaultLayout from './components/DefaultLayout.jsx';
import { Navigate } from "react-router-dom";


const router = createHashRouter([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          element: <Navigate to="/home" />
        },
        {
          path: '/home',
          element: <App />
        },
        {
          path: '/play',
          element: <Play />
        },
      ]
    },
    {
      path: '/*',
      element: <NotFound />
    }
  ]);  

export default router;