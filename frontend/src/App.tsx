import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landing-page'
import SignIn from './pages/authentication'
import CodeExecutor from './pages/code-executor '
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <SignIn/>,
  },
  {
    path: "/executor",
    element: <CodeExecutor/>
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
