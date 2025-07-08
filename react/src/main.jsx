import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Homepage from './components/Homepage/Homepage.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import SignUp from './components/SignUp/SignUp.jsx';
import Login from './components/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: < App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: < Homepage /> },
      { path: "sign-up", element: <SignUp />},
      { path: "login", element: <Login /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
