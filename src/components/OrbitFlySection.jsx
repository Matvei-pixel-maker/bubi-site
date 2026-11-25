import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Center,
  ContactShadows,
  Environment,
  Text3D,
  useGLTF,
  useTexture,
} from '@react-three/drei'
import * as THREE from 'three'
import { ChevronsDown, Sparkles } from 'lucide-react'

const BASE = import.meta.env.BASE_URL
const MODEL_URL = `${BASE}models/cup.glb`
const STICKER_URL = `${BASE}images/logo.webp`
const FONT_URL = `${BASE}fonts/bubi.json`

const PANCAKE_URLS = {
  caramel: `${BASE}images/caramel.webp`,
  mango: `${BASE}images/mango.webp`,
  klubnika: `${BASE}images/klubnika.webp`,
}

const SOUP_URLS = {
  foBo: `${BASE}images/fo-bo.webp`,
  foGa: `${BASE}images/fo-ga.webp`,
  tomYam: `${BASE}images/tom-yam.webp`,
}

const ORBIT_TURNS = 1.5
const START_ANGLE = 0.55
const ORBIT_RADIUS = 3.55
const CUP_SCALE = 15
const LABEL_ROTATION = 1.754
const SLEEVE_THETA = 0.9
const CONTACT_Y = -2.05
const CAMERA_EASE = 0.08
const SOUP_SCALE = 0.65
const FOOD_OFFSET_X = 0.35
const START_BLEND_END = 0.08
const FINAL_BLEND_START = 0.8
const FINAL_CAMERA = new THREE.Vector3(0, 0.4, 7.5)
const FINAL_STAGE = new THREE.Vector3(-FOOD_OFFSET_X, -0.8, 1.6)
const SNAP_EDGE = 0.001
const FINAL_SNAP = 1 - SNAP_EDGE

const CENTER = new THREE.Vector3(0, 0, 0)
const UP = new THREE.Vector3(0, 1, 0)

const CARDS = [
  {
    id: '01',
    range: [0.1, 0.35],
    side: 'left',
    title: 'Бабл-ти со свежей тапиокой',
    text: 'Варим жемчужины каждые 4 часа. Размеры M и L — под любое настроение.',
  },
  {
    id: '02',
    range: [0.4, 0.65],
    side: 'right',
    title: 'Японские панкейки и моти',
    text: 'Воздушные десерты с Nutella, манго и дубайским шоколадом.',
  },
  {
    id: '03',
    range: [0.7, 0.92],
    side: 'left',
    title: 'Вьетнамские Фо Бо, Фо Га и Том Ям',
    text: 'Горячие аутентичные супы по семейным рецептам и нежные булочки бао на Ратомской, 7.',
  },
]

const ORBIT_MASCOTS = [
  {
    file: 'mascot02-sm.webp',
    position: 'right-2 top-[80px] rotate-[12deg] sm:right-6 sm:top-[96px]',
    duration: '7.6s',
    delay: '-1.2s',
  },
  {
    file: 'mascot04-sm.webp',
    position: 'bottom-7 left-2 -rotate-[10deg] sm:bottom-10 sm:left-6',
    duration: '8.4s',
    delay: '-3.1s',
  },
  {
    file: 'mascot05-sm.webp',
    position: 'bottom-7 right-2 -rotate-[8deg] sm:bottom-10 sm:right-6',
    duration: '9.1s',
    delay: '-0.4s',
  },
  {
    file: 'mascot01-sm.webp',
    position:
      'left-2 top-[140px] rotate-[8deg] opacity-80 sm:left-6 sm:top-[156px]',
    duration: '6.8s',
    delay: '-2.3s',
  },
]

const PANCAKE_ITEMS = [
  {
    key: 'caramel',
    crop: { x: 0, y: 0.1861, w: 1, h: 0.807 },
    size: [1.72, 1.1],
    position: [0, 0, 0],
    tilt: 0,
    parallax: 0.045,
    speed: 0.7,
    phase: 0,
    order: 3,
  },
  {
    key: 'mango',
    crop: { x: 0, y: 0.0999, w: 1, h: 0.868 },
    size: [1.12, 0.9],
    position: [-0.78, -0.1, -0.58],
    tilt: -0.14,
    parallax: 0.04,
    speed: 0.55,
    phase: 1.9,
    order: 1,
  },
  {
    key: 'klubnika',
    crop: { x: 0.0293, y: 0.1094, w: 0.9361, h: 0.8841 },
    size: [0.98, 0.96],
    position: [0.94, 0.14, -0.5],
    tilt: 0.18,
    parallax: 0.09,
    speed: 0.62,
    phase: 3.4,
    order: 2,
  },
]

const SOUP_ITEMS = [
  {
    key: 'foGa',
    crop: { x: 0, y: 0.3729, w: 0.9407, h: 0.2759 },
    size: [1.95, 1.57],
    position: [0, 0, 0],
    tilt: 0,
    parallax: 0.035,
    speed: 0.6,
    phase: 2.3,
    order: 3,
  },
  {
    key: 'foBo',
    crop: { x: 0.0234, y: 0.0442, w: 0.9172, h: 0.2734 },
    size: [1.5, 1.23],
    position: [-0.95, -0.1, -0.6],
    tilt: -0.14,
    parallax: 0.05,
    speed: 0.52,
    phase: 0.6,
    order: 1,
  },
  {
    key: 'tomYam',
    crop: { x: 0.0166, y: 0.703, w: 0.9655, h: 0.293 },
    size: [1.45, 1.2],
    position: [0.98, 0.12, -0.65],
    tilt: 0.13,
    parallax: 0.06,
    speed: 0.58,
    phase: 4.1,
    order: 2,
  },
]

function smoothstep(edge0, edge1, value) {
  const t = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function stageScale(progress, enterStart, enterEnd, exitStart, exitEnd) {
  const fadeIn = smoothstep(enterStart, enterEnd, progress)
  const fadeOut = 1 - smoothstep(exitStart, exitEnd, progress)

  return fadeIn * fadeOut
}

function frontBlend(progress) {
  const atStart = 1 - smoothstep(0, START_BLEND_END, progress)
  const atEnd = smoothstep(FINAL_BLEND_START, 1, progress)

  return Math.max(atStart, atEnd)
}

function orbitPosition(t, target) {
  const angle = START_ANGLE + t * Math.PI * 2 * ORBIT_TURNS
  const radius = ORBIT_RADIUS + Math.sin(t * Math.PI * 2) * 0.2
  const y = -0.62 + Math.sin(t * Math.PI * 4 - 0.35) * 0.5

  return target.set(
    Math.cos(angle) * radius,
    y,
    Math.sin(angle) * radius,
  )
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

function OrbitMascots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {ORBIT_MASCOTS.map(({ file, position, duration, delay }) => (
        <div
          key={file}
          className={`absolute h-12 w-12 sm:h-20 sm:w-20 ${position}`}
        >
          <img
            src={`${BASE}mascots/${file}`}
            alt=""
            width="192"
            height="192"
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ animationDuration: duration, animationDelay: delay }}
            className="h-full w-full animate-mascot-float select-none object-contain drop-shadow-[0_18px_26px_rgba(17,17,17,0.16)] motion-reduce:animate-none"
          />
        </div>
      ))}
    </div>
  )
}

function GiantLogo() {
  const { viewport } = useThree()
  const logoScale = viewport.width < 5 ? 0.46 : 1

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]} scale={logoScale}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={1.8}
          height={0.45}
          curveSegments={18}
          letterSpacing={0.012}
          bevelEnabled
          bevelThickness={0.08}
          bevelSize={0.06}
          bevelSegments={8}
          castShadow
        >
          bubi
          <meshPhysicalMaterial
            color="#FF7AA8"
            roughness={0.18}
            metalness={0.04}
            clearcoat={0.85}
            clearcoatRoughness={0.12}
            envMapIntensity={1.25}
            emissive="#FF4F8E"
            emissiveIntensity={0.03}
          />
        </Text3D>
      </Center>
    </group>
  )
}

function CupObject() {
  const { scene } = useGLTF(MODEL_URL)
  const stickerTexture = useTexture(STICKER_URL)

  const prepared = useMemo(() => {
    const model = scene.clone(true)
    model.updateWorldMatrix(true, true)

    const box = new THREE.Box3().setFromObject(model)
    const size = box.getSize(new THREE.Vector3())
    const minY = box.min.y
    const height = size.y

    const sleeveHeight = height * 0.4
    const sleeveY = minY + height * 0.42
    const sleeveBottom = sleeveY - sleeveHeight / 2
    const sleeveTop = sleeveY + sleeveHeight / 2

    const vertex = new THREE.Vector3()
    let sumX = 0
    let sumZ = 0
    let count = 0

    model.traverse((child) => {
      if (!child.isMesh) return

      const positions = child.geometry.attributes.position

      for (let i = 0; i < positions.count; i += 1) {
        vertex.fromBufferAttribute(positions, i).applyMatrix4(child.matrixWorld)

        if (vertex.y > minY + height * 0.07 && vertex.y < minY + height * 0.32) {
          sumX += vertex.x
          sumZ += vertex.z
          count += 1
        }
      }
    })

    const boxCenter = box.getCenter(new THREE.Vector3())
    const axisX = count ? sumX / count : boxCenter.x
    const axisZ = count ? sumZ / count : boxCenter.z

    const bodyBottomY = minY + height * 0.045
    const bodyTopY = minY + height * 0.72
    const bodyRadiusBottom = height * 0.202
    const bodyRadiusTop = height * 0.273
    const slope = (bodyRadiusTop - bodyRadiusBottom) / (bodyTopY - bodyBottomY)
    const clearance = 0.0008
    const radiusBottom =
      bodyRadiusBottom + (sleeveBottom - bodyBottomY) * slope + clearance
    const radiusTop =
      bodyRadiusBottom + (sleeveTop - bodyBottomY) * slope + clearance

    model.traverse((child) => {
      if (!child.isMesh) return

      const map = child.material?.map

      child.material = new THREE.MeshPhysicalMaterial({
        map,
        color: '#ffffff',
        roughness: 0.42,
        metalness: 0.02,
        clearcoat: 0.5,
        clearcoatRoughness: 0.3,
        envMapIntensity: 0.9,
        side: THREE.DoubleSide,
      })
    })

    return {
      model,
      axisX,
      axisZ,
      centerY: (box.min.y + box.max.y) / 2,
      sleeveY,
      sleeveHeight,
      radiusBottom: radiusBottom + 0.0009,
      radiusTop: radiusTop + 0.0009,
    }
  }, [scene])

  const sticker = useMemo(() => {
    const texture = stickerTexture.clone()
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8
    texture.needsUpdate = true
    return texture
  }, [stickerTexture])

  return (
    <group scale={CUP_SCALE}>
      <group position={[0, -prepared.centerY, 0]}>
        <group position={[prepared.axisX, 0, prepared.axisZ]}>
          <group rotation-y={LABEL_ROTATION}>
            <primitive
              object={prepared.model}
              position={[-prepared.axisX, 0, -prepared.axisZ]}
            />
          </group>

          <mesh position={[0, prepared.sleeveY, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry
              args={[
                prepared.radiusTop,
                prepared.radiusBottom,
                prepared.sleeveHeight,
                48,
                1,
                true,
                -SLEEVE_THETA / 2,
                SLEEVE_THETA,
              ]}
            />
            <meshPhysicalMaterial
              map={sticker}
              transparent
              alphaTest={0.02}
              roughness={0.34}
              metalness={0.02}
              clearcoat={0.45}
              clearcoatRoughness={0.22}
              envMapIntensity={0.9}
              side={THREE.FrontSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function FoodComposition({ urls, items }) {
  const textures = useTexture(urls)
  const groups = useRef([])

  const cropped = useMemo(
    () =>
      items.map((item) => {
        const texture = textures[item.key].clone()
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = 8
        texture.wrapS = THREE.ClampToEdgeWrapping
        texture.wrapT = THREE.ClampToEdgeWrapping
        texture.repeat.set(item.crop.w, item.crop.h)
        texture.offset.set(item.crop.x, 1 - item.crop.y - item.crop.h)
        texture.needsUpdate = true
        return texture
      }),
    [items, textures],
  )

  useFrame((state) => {
    const time = state.clock.elapsedTime

    items.forEach((item, index) => {
      const group = groups.current[index]
      if (!group) return

      group.position.x =
        item.position[0] + Math.sin(time * item.speed + item.phase) * item.parallax
      group.position.y =
        item.position[1] +
        Math.cos(time * item.speed * 0.82 + item.phase) * item.parallax * 0.55
      group.rotation.y =
        item.tilt + Math.sin(time * 0.62 + item.phase) * 0.07
      group.rotation.x = Math.cos(time * 0.48 + item.phase) * 0.035
    })
  })

  return (
    <group>
      {items.map((item, index) => (
        <group
          key={item.key}
          ref={(element) => {
            groups.current[index] = element
          }}
          position={item.position}
        >
          <mesh renderOrder={item.order}>
            <planeGeometry args={item.size} />
            <meshBasicMaterial
              map={cropped[index]}
              transparent
              alphaTest={0.02}
              side={THREE.DoubleSide}
              toneMapped={false}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FlyingStage({ progressRef }) {
  const root = useRef(null)
  const cupStage = useRef(null)
  const pancakeStage = useRef(null)
  const soupStage = useRef(null)
  const initialized = useRef(false)
  const desiredRef = useRef(new THREE.Vector3())
  const { camera, size, viewport } = useThree()
  const portrait = size.width < size.height
  const narrow = viewport.width < 5
  const foodScale = narrow ? 0.46 : 1
  const foodLift = narrow ? 0.9 : 0
  const finalStage = useMemo(
    () =>
      new THREE.Vector3(
        -FOOD_OFFSET_X * foodScale,
        narrow ? -1 : FINAL_STAGE.y,
        FINAL_STAGE.z,
      ),
    [foodScale, narrow],
  )

  const applyScale = (group, target) => {
    if (!group) return

    const next = THREE.MathUtils.lerp(group.scale.x, target, 0.16)
    group.scale.setScalar(next)
    group.visible = next > 0.012
  }

  useFrame((state) => {
    if (!root.current) return

    const time = state.clock.elapsedTime
    const progress = progressRef.current
    const desired = desiredRef.current
    const toFront = frontBlend(progress)

    orbitPosition(progress, desired)
    desired.y += foodLift + Math.sin(time * 1.4) * 0.045 * (1 - toFront)
    desired.lerp(finalStage, toFront)

    if (!initialized.current) {
      root.current.position.copy(desired)
      initialized.current = true
    } else {
      root.current.position.lerp(desired, CAMERA_EASE)
    }

    if (progress <= SNAP_EDGE || progress >= FINAL_SNAP) {
      root.current.position.copy(finalStage)
    }

    root.current.lookAt(camera.position)
    root.current.rotateY(0.1 * (1 - toFront))

    const cupScale = stageScale(progress, -1, 0, 0.3, 0.4)
    const pancakeScale = stageScale(progress, 0.3, 0.4, 0.6, 0.72)
    const soupScale = stageScale(progress, 0.6, 0.72, 2, 3)

    applyScale(cupStage.current, cupScale * (portrait ? 0.92 : 1))
    applyScale(pancakeStage.current, pancakeScale * (portrait ? 0.8 : 1))
    applyScale(
      soupStage.current,
      soupScale * SOUP_SCALE * (portrait ? 0.9 : 1),
    )
  })

  return (
    <group ref={root} scale={foodScale}>
      <group position={[FOOD_OFFSET_X, 0, 0]}>
        <group ref={cupStage} scale={0.001}>
          <CupObject />
        </group>

        <group ref={pancakeStage} scale={0.001}>
          <FoodComposition urls={PANCAKE_URLS} items={PANCAKE_ITEMS} />
        </group>

        <group ref={soupStage} scale={0.001}>
          <FoodComposition urls={SOUP_URLS} items={SOUP_ITEMS} />
        </group>
      </group>
    </group>
  )
}

function CameraRig({ progressRef }) {
  const { camera, viewport } = useThree()
  const initialized = useRef(false)
  const desired = useMemo(() => new THREE.Vector3(), [])
  const cupPosition = useMemo(() => new THREE.Vector3(), [])
  const previousPosition = useMemo(() => new THREE.Vector3(), [])
  const tangent = useMemo(() => new THREE.Vector3(), [])
  const outward = useMemo(() => new THREE.Vector3(), [])
  const lookTarget = useMemo(() => new THREE.Vector3(), [])
  const lookAt = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const progress = progressRef.current
    const narrow = viewport.width < 5
    const toFront = frontBlend(progress)

    if (narrow) {
      const angle = START_ANGLE + progress * Math.PI * 2 * ORBIT_TURNS
      const height =
        FINAL_CAMERA.y + Math.sin(progress * Math.PI * 4 - 0.35) * 0.12

      desired.set(
        Math.cos(angle) * FINAL_CAMERA.z,
        height,
        Math.sin(angle) * FINAL_CAMERA.z,
      )
      lookTarget.copy(CENTER).addScaledVector(UP, 0.12)
    } else {
      orbitPosition(progress, cupPosition)
      orbitPosition(Math.max(0, progress - 0.004), previousPosition)

      tangent.subVectors(cupPosition, previousPosition)
      if (tangent.lengthSq() < 0.000001) tangent.set(-1, 0, 0)
      tangent.normalize()

      outward.set(cupPosition.x, 0, cupPosition.z)
      if (outward.lengthSq() < 0.000001) outward.set(0, 0, 1)
      outward.normalize()

      desired
        .copy(cupPosition)
        .addScaledVector(outward, 5.4)
        .addScaledVector(tangent, -2)
        .addScaledVector(UP, 1.25)

      lookTarget.copy(cupPosition).lerp(CENTER, 0.46)
      lookTarget.addScaledVector(UP, 0.16)
    }

    desired.lerp(FINAL_CAMERA, toFront)
    lookTarget.lerp(CENTER, toFront)

    if (!initialized.current) {
      camera.position.copy(desired)
      lookAt.copy(lookTarget)
      initialized.current = true
    } else {
      camera.position.lerp(desired, CAMERA_EASE)
      lookAt.lerp(lookTarget, 0.1)
    }

    if (progress <= SNAP_EDGE || progress >= FINAL_SNAP) {
      camera.position.copy(FINAL_CAMERA)
      lookAt.copy(CENTER)
    }

    camera.lookAt(lookAt)
  })

  return null
}

function Scene({ progressRef }) {
  return (
    <>
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 6, 6]} intensity={2.2} color="#FFF7FB" />
      <directionalLight position={[-5, 2, 4]} intensity={1.15} color="#FFB3D1" />
      <pointLight position={[0, -3, 4]} intensity={1.6} color="#FF85B3" />
      <pointLight position={[-4, 3, -3]} intensity={0.9} color="#FFFFFF" />

      <Suspense fallback={null}>
        <EnvironmentBoundary>
          <Environment preset="city" environmentIntensity={0.9} />
        </EnvironmentBoundary>
      </Suspense>

      <GiantLogo />

      <Suspense fallback={null}>
        <FlyingStage progressRef={progressRef} />
      </Suspense>

      <ContactShadows
        position={[0, CONTACT_Y, 0]}
        opacity={0.3}
        scale={16}
        blur={2.8}
        far={5}
        resolution={512}
        color="#4A1024"
      />

      <CameraRig progressRef={progressRef} />
    </>
  )
}

export default function OrbitFlySection() {
  const sectionRef = useRef(null)
  const progressRef = useRef(0)
  const [frameloop, setFrameloop] = useState(() =>
    typeof IntersectionObserver === 'undefined' ? 'always' : 'never',
  )
  const [activeCard, setActiveCard] = useState(-1)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
      { threshold: 0 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    let frame = 0

    const update = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const scrollLength = rect.height - window.innerHeight
      const progress =
        scrollLength > 0
          ? THREE.MathUtils.clamp(-rect.top / scrollLength, 0, 1)
          : 0

      progressRef.current = progress

      const nextCard = CARDS.findIndex(
        (card) => progress >= card.range[0] && progress <= card.range[1],
      )

      setActiveCard((current) => (current === nextCard ? current : nextCard))
      setShowHint((current) => {
        const next = progress < 0.03
        return current === next ? current : next
      })
    }

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="orbit"
      aria-labelledby="orbit-title"
      className="relative z-20 isolate h-[340vh] bg-[#FFF5F8]"
    >
      <h2 id="orbit-title" className="sr-only">
        FPV-полёт блюд вокруг 3D-логотипа bubi
      </h2>

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#FFF5F8]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,#FFEAF3_0%,#FFF5F8_58%,#FFF5F8_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(#FF85B3_1px,transparent_1.4px)] opacity-[0.14] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_50%_50%,black,transparent_70%)]" />
          <div className="absolute -left-20 top-1/4 h-64 w-64 rounded-full bg-bubi-pink/10 blur-3xl" />
          <div className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-bubi-petal/20 blur-3xl" />

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
          >
            <path
              d="M-120 40C180 110 360 0 620 120C880 240 1080 100 1560 260L1560 420C1080 280 880 420 620 300C360 180 180 290-120 220Z"
              fill="#FFD6E6"
              fillOpacity="0.48"
            />
            <path
              d="M-120 520C200 600 420 480 700 610C980 740 1200 590 1560 710L1560 900C1200 790 980 930 700 800C420 680 200 800-120 720Z"
              fill="#FFD6E6"
              fillOpacity="0.44"
            />
            <path
              d="M900-100C1060 10 1240-70 1560 40L1560 140C1280 40 1080 120 900 20Z"
              fill="#FFD6E6"
              fillOpacity="0.4"
            />
          </svg>

          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bubi-blush to-transparent" />
        </div>

        <OrbitMascots />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 1.5, 7], fov: 45 }}
            frameloop={frameloop}
            style={{ touchAction: 'pan-y' }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.ACESFilmicToneMapping
              gl.toneMappingExposure = 1.08
            }}
          >
            <Suspense fallback={null}>
              <Scene progressRef={progressRef} />
            </Suspense>
          </Canvas>
        </div>

        <div className="pointer-events-none absolute left-4 top-24 z-20 sm:left-8 sm:top-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-bubi-graphite/10 bg-white/80 px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-bubi-graphite/60 shadow-[0_12px_28px_-22px_rgba(17,17,17,0.5)] backdrop-blur-md sm:text-[10px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bubi-pink opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bubi-pink" />
            </span>
            FPV-полёт
            <span className="hidden text-bubi-graphite/30 sm:inline">
              · меню вокруг bubi
            </span>
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          {CARDS.map((card, index) => {
            const active = activeCard === index

            return (
              <article
                key={card.id}
                aria-hidden={!active}
                className={`absolute bottom-24 left-4 right-4 mx-auto w-auto max-w-[340px] rounded-2xl border-2 border-[#111111] bg-white p-5 shadow-[6px_6px_0px_#FF85B3] transition-opacity duration-500 sm:bottom-auto sm:top-1/2 sm:mx-0 sm:w-[300px] sm:max-w-none sm:-translate-y-1/2 lg:w-[330px] lg:p-6 ${
                  card.side === 'left'
                    ? 'sm:left-6 lg:left-10'
                    : 'sm:left-auto sm:right-6 lg:right-10'
                } ${active ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.18em] text-bubi-graphite/45">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bubi-pink text-[10px] text-bubi-graphite">
                    {card.id}
                  </span>
                  <span>{card.id} / меню bubi</span>
                </div>

                <h3 className="mt-3 font-display text-[17px] font-extrabold leading-[1.15] tracking-[-0.03em] text-bubi-graphite lg:text-[19px]">
                  {card.title}
                </h3>

                <p className="mt-2 text-[12.5px] leading-[1.6] text-bubi-graphite/60 lg:text-[13px]">
                  {card.text}
                </p>

                <span className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-bubi-rose">
                  <Sparkles aria-hidden="true" size={12} strokeWidth={2.5} />
                  fresh every day
                </span>
              </article>
            )
          })}
        </div>

        <div
          className={`pointer-events-none absolute inset-x-0 bottom-7 z-20 flex justify-center px-4 transition-opacity duration-500 ${
            showHint ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-bubi-graphite/10 bg-white/85 px-4 py-2.5 text-[9.5px] font-extrabold uppercase tracking-[0.15em] text-bubi-graphite/55 shadow-[0_16px_34px_-26px_rgba(17,17,17,0.55)] backdrop-blur-md sm:text-[10px]">
            <ChevronsDown
              aria-hidden="true"
              size={14}
              strokeWidth={2.6}
              className="animate-bounce text-bubi-rose motion-reduce:animate-none"
            />
            <span className="sm:hidden">Скролльте — FPV-полёт</span>
            <span className="hidden sm:inline">
              Скролльте — блюда летят вокруг bubi
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

useGLTF.preload(MODEL_URL)
