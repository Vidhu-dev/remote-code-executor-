import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landing-page'
import SignIn from './pages/authentication'
import CodeExecutor from './pages/code-executor '
import CodeExecution from './pages/temp-executor'
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/executor',
    element: <CodeExecutor />,
  },
  {
    path: '/exe',
    element: <CodeExecution />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
