import React, { useState, FC } from 'react'
import { Link } from 'react-router-dom'

const Navbar: FC = () => {
  const [click, setClick] = useState<boolean>(false)

  const handleClick = () => {
    setClick(!click)
  }

  const signUpClick = () => {
    console.log('Sign up clicked')
    alert('Devs are working on it, please wait for a while :)')
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Menu Icon */}
        <div className="text-xl cursor-pointer md:hidden" onClick={handleClick}>
          <i className="fas fa-bars"></i>
        </div>

        {/* Navbar Left */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            Codex
          </Link>
          <div
            className={`${
              click ? 'block' : 'hidden'
            } md:flex md:items-center ml-4 space-x-4`}
          >
            {/* Uncomment and add links here */}
            {/* <Link to="/" className="hover:text-gray-300">
              Noted
            </Link> */}
          </div>
        </div>

        {/* Navbar Right */}
        <div className="hidden md:flex items-center">
          <Link to="/" className="ml-4">
            <button
              onClick={signUpClick}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {click && (
        <div className="md:hidden bg-gray-700 text-white py-4">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-600">
            Noted
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
