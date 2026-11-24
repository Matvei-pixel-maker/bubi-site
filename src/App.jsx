import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-bubi-blush">
        <Navbar />
        <main>
          <Hero />
        </main>
      </div>
    </MotionConfig>
  )
}
