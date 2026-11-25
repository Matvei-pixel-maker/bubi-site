import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  Text3D,
} from '@react-three/drei'
import * as THREE from 'three'

const EASE = THREE.MathUtils.damp

const PEARL_GEOMETRY = new THREE.SphereGeometry(1, 32, 32)

const BLACK_PEARL_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: '#141414',
  roughness: 0.12,
  metalness: 0.32,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  envMapIntensity: 1.25,
})

const PINK_PEARL_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: '#FFB3D1',
  roughness: 0.18,
  metalness: 0.04,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.15,
})

const PEARLS = [
  { position: [-2.72, 1.5, 0.4], size: 0.3, pink: true, speed: 0.85, phase: 0.4, spin: 0.25 },
  { position: [2.62, 1.18, 0.1], size: 0.22, pink: false, speed: 0.7, phase: 1.8, spin: -0.3 },
  { position: [-2.38, -1.32, 0.7], size: 0.27, pink: false, speed: 0.95, phase: 3.1, spin: 0.2 },
  { position: [2.48, -1.22, 0.55], size: 0.34, pink: true, speed: 0.62, phase: 2.4, spin: -0.18 },
  { position: [0.7, 2.08, -0.55], size: 0.19, pink: false, speed: 0.8, phase: 0.9, spin: 0.35 },
  { position: [-1.3, 1.98, 0.35], size: 0.16, pink: true, speed: 1.05, phase: 4.2, spin: -0.28 },
  { position: [1.5, -1.96, 0.9], size: 0.21, pink: true, speed: 0.75, phase: 5.1, spin: 0.22 },
  { position: [-2.95, -0.08, -0.35], size: 0.14, pink: true, speed: 1.15, phase: 2.9, spin: -0.34 },
  { position: [2.95, -0.05, -0.6], size: 0.16, pink: false, speed: 0.9, phase: 4.8, spin: 0.3 },
  { position: [0.1, -2.3, 0.25], size: 0.12, pink: false, speed: 1.25, phase: 1.2, spin: 0.4 },
  { position: [-0.85, -2.12, 1.05], size: 0.15, pink: true, speed: 0.68, phase: 3.7, spin: -0.24 },
  { position: [1.82, 1.9, 1.15], size: 0.1, pink: false, speed: 1.1, phase: 5.6, spin: 0.36 },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  )

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return isMobile
}

class EnvironmentBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('Environment preset недоступен, используем базовый свет.', error)
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

function Pearls({ isMobile }) {
  const group = useRef(null)
  const { pointer } = useThree()

  useFrame((state, delta) => {
    if (!group.current) return

    const time = state.clock.elapsedTime
    const step = Math.min(delta, 0.05)

    if (isMobile) {
      group.current.rotation.y = Math.sin(time * 0.38) * 0.1
      group.current.rotation.x = Math.sin(time * 0.29) * 0.06
    } else {
      group.current.rotation.y = EASE(
        group.current.rotation.y,
        pointer.x * 0.3,
        3.5,
        step,
      )
      group.current.rotation.x = EASE(
        group.current.rotation.x,
        -pointer.y * 0.16,
        3.5,
        step,
      )
    }

    group.current.children.forEach((pearl, index) => {
      const config = PEARLS[index]
      if (!config) return

      pearl.position.set(
        config.position[0] +
          Math.sin(time * config.speed * 0.6 + config.phase) * 0.07,
        config.position[1] +
          Math.sin(time * config.speed + config.phase) * 0.14,
        config.position[2] +
          Math.cos(time * config.speed * 0.5 + config.phase) * 0.08,
      )
      pearl.rotation.y += step * config.spin
    })
  })

  return (
    <group ref={group}>
      {PEARLS.map((pearl, index) => (
        <mesh
          key={`${pearl.position.join('-')}-${index}`}
          geometry={PEARL_GEOMETRY}
          material={pearl.pink ? PINK_PEARL_MATERIAL : BLACK_PEARL_MATERIAL}
          position={pearl.position}
          scale={pearl.size}
        />
      ))}
    </group>
  )
}

function BubbiLogo() {
  return (
    <Float
      speed={1.4}
      rotationIntensity={0.22}
      floatIntensity={0.55}
      floatingRange={[-0.08, 0.12]}
    >
      <Center>
        <Text3D
          font={`${import.meta.env.BASE_URL}fonts/bubi.json`}
          size={1.55}
          height={0.36}
          curveSegments={16}
          letterSpacing={0.012}
          bevelEnabled
          bevelThickness={0.07}
          bevelSize={0.05}
          bevelSegments={8}
          castShadow
        >
          bubi
          <meshPhysicalMaterial
            color="#FF7AA8"
            roughness={0.18}
            metalness={0.05}
            clearcoat={0.8}
            clearcoatRoughness={0.16}
            envMapIntensity={1.15}
            emissive="#FF4F8E"
            emissiveIntensity={0.04}
          />
        </Text3D>
      </Center>
    </Float>
  )
}

function Scene({ isMobile }) {
  const { viewport } = useThree()
  const scale = Math.min(1, viewport.width / 6.8)

  return (
    <group scale={scale}>
      <BubbiLogo />
      <Pearls isMobile={isMobile} />

      <ContactShadows
        position={[0, -2.08, 0]}
        opacity={0.3}
        scale={12}
        blur={2.6}
        far={4.5}
        resolution={512}
        color="#4A1024"
      />

      <ambientLight intensity={0.85} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={2.1}
        color="#FFF7FB"
      />
      <directionalLight
        position={[-5, 2, 4]}
        intensity={1.15}
        color="#FFB3D1"
      />
      <pointLight position={[0, -3, 4]} intensity={1.4} color="#FF85B3" />

      <Suspense fallback={null}>
        <EnvironmentBoundary>
          <Environment preset="city" environmentIntensity={0.9} />
        </EnvironmentBoundary>
      </Suspense>
    </group>
  )
}

export default function Hero3D() {
  const isMobile = useIsMobile()

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.15, 8.6], fov: 42 }}
      style={{
        touchAction: 'pan-y',
        pointerEvents: isMobile ? 'none' : 'auto',
      }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.12
      }}
    >
      <Suspense fallback={null}>
        <Scene isMobile={isMobile} />
      </Suspense>

      {!isMobile && (
        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.55}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.42}
          minAzimuthAngle={-0.7}
          maxAzimuthAngle={0.7}
        />
      )}
    </Canvas>
  )
}
