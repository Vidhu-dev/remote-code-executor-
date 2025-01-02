import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'

const Navbar: FC = () => {
  const [showError, setShowError] = useState(false)
  const handleClick = () => {
    setShowError(true)
    setTimeout(() => setShowError(false), 3000)
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Navbar Left */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            CoExe
          </Link>
        </div>
        {/* Error Message */}
        {showError && (
          <div className="absolute top-0 left-0 right-0 mt-1 text-center text-red-500">
            Signup functionality is not working yet.
          </div>
        )}
        {/* Navbar Right */}
        <div className="hidden md:flex items-center">
          <Button onClick={handleClick}>Sign up</Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
