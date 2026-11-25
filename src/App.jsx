import { lazy, Suspense } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

const OrbitFlySection = lazy(() => import('./components/OrbitFlySection'))

function OrbitFallback() {
  return (
    <div className="relative h-[340vh] bg-bubi-blush" aria-hidden="true">
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <span className="grid h-16 w-16 animate-pulse place-items-center rounded-full bg-bubi-pink/20 font-display text-[11px] font-extrabold text-bubi-rose">
          bubi
        </span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-bubi-blush">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<OrbitFallback />}>
            <OrbitFlySection />
          </Suspense>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
