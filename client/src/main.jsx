import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import './index.css'
import App from './App.jsx'
import { Index } from './pages/home.jsx';
import { Login } from './security/login.jsx';
import { Protected } from './security/protected.jsx';
import { Signup } from './security/signup.jsx';

const router = createBrowserRouter([
  {
    path: '/login', element: <Login />
  },
  {
    path: '/signup', element: <Signup />
  },
  {
    element: <Protected />,
    children: [
      {
        path: '/', element: <App />,
        children: [
          {
            path: '/', element: <Index />
          },
          {
            path: '/chat/:id', element: <Index />
          },
          
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
