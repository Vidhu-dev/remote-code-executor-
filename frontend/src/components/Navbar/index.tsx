import { FC } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button'

const Navbar: FC = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Navbar Left */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            CoExe
          </Link>
        </div>
        {/* Navbar Right */}
        <div className="hidden md:flex items-center">
          <Link to="/" className="ml-4">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
