import React, { useState } from 'react'
import { motion } from 'motion/react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()
  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{
        backgroundColor: 'hsla(223,43%,13%,1)',
        backgroundImage: `
                    radial-gradient(at 0px 0px, hsla(140,50%,75%,0.5) 0px, transparent 50%),
                    radial-gradient(at ${mousePosition.x}px ${mousePosition.y}px, hsla(148,50%,5%,0.5) 0px, transparent 20%),
                    url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.51"%3E%3Cdefs%3E%3Cfilter id="nnnoise-filter" x="-20%25" y="-20%25" width="140%25" height="140%25" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"%3E%3CfeTurbulence type="turbulence" baseFrequency="0.067" numOctaves="4" seed="15" stitchTiles="stitch" x="0%25" y="0%25" width="100%25" height="100%25" result="turbulence"%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale="7" specularConstant="0.9" specularExponent="20" lighting-color="%235b19b6" x="0%25" y="0%25" width="100%25" height="100%25" in="turbulence" result="specularLighting"%3E%3CfeDistantLight azimuth="3" elevation="103"%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3C/filter%3E%3C/defs%3E%3Crect width="700" height="700" fill="%231e0f0fff"%3E%3C/rect%3E%3Crect width="700" height="700" fill="%235b19b6" filter="url(%23nnnoise-filter)"%3E%3C/rect%3E%3C/svg%3E')
                `,
        mixBlendMode: 'overlay',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="relative text-center z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-9xl font-bold text-white"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          CoExe
        </motion.h1>
        <motion.p
          className="text-lg mt-4 text-gray-300 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.5 }}
        >
          A Collabratibe Code Execution Platform
        </motion.p>
        <motion.div
          className="mt-8 space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          <Button type="primary" onClick={() => navigate('/login')}>
            Get Started <span className=" text-xl"> &#8594;</span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LandingPage
