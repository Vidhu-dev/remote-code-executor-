import React from 'react'
import { motion } from 'motion/react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const SignIn: React.FC = () => {
  const navigate = useNavigate()

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
  }

  const formVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.8, duration: 0.5 } },
  }

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    navigate('/executor')
  }
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: 'hsla(223,43%,13%,1)',
        backgroundImage: `
                    radial-gradient(at 0px 0px, hsla(140,50%,75%,0.5) 0px, transparent 50%),
                    url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700" opacity="0.51"%3E%3Cdefs%3E%3Cfilter id="nnnoise-filter" x="-20%25" y="-20%25" width="140%25" height="140%25" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB"%3E%3CfeTurbulence type="turbulence" baseFrequency="0.067" numOctaves="4" seed="15" stitchTiles="stitch" x="0%25" y="0%25" width="100%25" height="100%25" result="turbulence"%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale="7" specularConstant="0.9" specularExponent="20" lighting-color="%235b19b6" x="0%25" y="0%25" width="100%25" height="100%25" in="turbulence" result="specularLighting"%3E%3CfeDistantLight azimuth="3" elevation="103"%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3C/filter%3E%3C/defs%3E%3Crect width="700" height="700" fill="%231e0f0fff"%3E%3C/rect%3E%3Crect width="700" height="700" fill="%235b19b6" filter="url(%23nnnoise-filter)"%3E%3C/rect%3E%3C/svg%3E')
                `,
        mixBlendMode: 'overlay',
      }}
    >
      <motion.header
        className="w-full py-4 px-12 text-white bg-purple-700 fixed top-0 left-0 right-0 z-50"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <h1 className="text-xl font-bold">CoExe</h1>
      </motion.header>
      <div className="flex flex-col items-center justify-center w-full pt-32 pb-8 px-4 min-h-screen">
        <motion.div
          className="w-full max-w-xs"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <h2 className="text-3xl font-bold text-gray-300 mb-8 ">Sign In</h2>
          <div className="flex flex-col space-y-4">
            <Button type="primary" onClick={handleGoogleSignIn}>
              Continue with Google
            </Button>
            <Button type="secondary">Continue with GitHub</Button>
          </div>
          <p className="mt-6 text-center text-sm text-gray-400">
            By signing in, you agree to our{' '}
            <a href="/terms" className="text-purple-500 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-purple-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SignIn
