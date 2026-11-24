import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  CupSoda,
  Hand,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react'

const Hero3D = lazy(() => import('./Hero3D'))

const EASE = [0.22, 1, 0.36, 1]

const MARQUEE_ITEMS = [
  'Bubble tea',
  'Japanese pancakes',
  'Mochi',
  'Pho bo',
  'Tom yum',
  'Ratomskaya 7',
]

function HeroDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_16%,#FFEDF4_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_6%_80%,#FFF7FA_0%,transparent_45%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(#FF85B3_1px,transparent_1.4px)] opacity-[0.18] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_72%_26%,black,transparent_64%)]" />

      <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-bubi-pink/10 blur-3xl" />
      <div className="absolute -right-20 top-6 h-96 w-96 rounded-full bg-bubi-petal/25 blur-3xl" />

      <svg
        className="absolute inset-0 h-full w-full"
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
    </div>
  )
}

const MASCOTS = [
  {
    file: 'mascot01-384.webp',
    position:
      '-left-4 top-[74px] h-12 w-12 -rotate-12 sm:-left-10 sm:top-[92px] sm:h-20 sm:w-20 lg:top-[98px] lg:h-24 lg:w-24 xl:h-28 xl:w-28',
    duration: '7.4s',
    delay: '-0.6s',
  },
  {
    file: 'mascot02-384.webp',
    position:
      '-left-5 bottom-[86px] h-12 w-12 rotate-[8deg] sm:-left-8 sm:bottom-[100px] sm:h-20 sm:w-20 lg:-left-10 lg:bottom-[24px] lg:h-24 lg:w-24 xl:h-28 xl:w-28',
    duration: '8.2s',
    delay: '-2.4s',
  },
  {
    file: 'mascot03-384.webp',
    position:
      '-right-4 top-[74px] h-12 w-12 rotate-[14deg] sm:-right-7 sm:top-[92px] sm:h-20 sm:w-20 lg:-right-8 lg:top-[98px] lg:h-24 lg:w-24 xl:h-28 xl:w-28',
    duration: '7.8s',
    delay: '-3.1s',
  },
  {
    file: 'mascot04-384.webp',
    position:
      '-right-5 bottom-[86px] h-12 w-12 -rotate-[10deg] sm:-right-8 sm:bottom-[100px] sm:h-20 sm:w-20 lg:-right-8 lg:bottom-[24px] lg:h-24 lg:w-24 xl:h-28 xl:w-28',
    duration: '9s',
    delay: '-1.3s',
  },
  {
    file: 'mascot05-384.webp',
    position:
      'left-1/2 top-[76px] h-8 w-8 -translate-x-1/2 rotate-[-6deg] opacity-75 sm:top-[88px] sm:h-12 sm:w-12 lg:top-[108px] lg:h-16 lg:w-16',
    duration: '6.6s',
    delay: '-4s',
  },
]

function HeroMascots() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {MASCOTS.map(({ file, position, duration, delay }) => (
        <div key={file} className={`absolute ${position}`}>
          <img
            src={`${import.meta.env.BASE_URL}mascots/${file}`}
            alt=""
            width="384"
            height="384"
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

function Sticker() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-1 right-0 z-20 h-20 w-20 sm:-right-1 sm:top-1 sm:h-24 sm:w-24 lg:-right-2 lg:h-28 lg:w-28"
    >
      <div className="relative grid h-full w-full place-items-center rounded-full border border-bubi-graphite/10 bg-white/75 shadow-[0_20px_44px_-26px_rgba(17,17,17,0.4)] backdrop-blur-md">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-spin-slower"
        >
          <defs>
            <path
              id="bubi-sticker-path"
              d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            />
          </defs>
          <text
            fill="rgba(17,17,17,0.55)"
            fontSize="6.6"
            fontWeight="800"
            letterSpacing="1.85"
          >
            <textPath href="#bubi-sticker-path">
              FRESH TAPIOCA • BUBBLE TEA • MINSK •
            </textPath>
          </text>
        </svg>

        <span className="grid h-10 w-10 place-items-center rounded-full bg-bubi-pink text-bubi-graphite shadow-[inset_0_-3px_0_rgba(17,17,17,0.12)] sm:h-11 sm:w-11">
          <CupSoda size={19} strokeWidth={2.3} />
        </span>
      </div>
    </div>
  )
}

function HeartCloudSticker() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-1 top-1 z-20 -rotate-6 sm:left-0 sm:top-2 lg:-left-4"
    >
      <div className="animate-float-soft drop-shadow-[0_18px_26px_rgba(17,17,17,0.22)]">
        <svg
          viewBox="0 0 100 100"
          className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          fill="none"
        >
          <path
            d="M30 16C22 16 16 22 16 30C8 32 6 42 12 48C8 56 14 66 24 66C26 76 36 80 44 74C50 82 62 80 66 72C76 76 86 68 84 58C92 54 94 42 86 36C90 26 82 16 72 18C66 10 54 10 48 18C42 14 34 12 30 16Z"
            fill="#111111"
          />
          <path
            d="M30 60C29 71 25 82 20 89C32 85 43 78 49 71C43 69 36 65 30 60Z"
            fill="#111111"
          />
          <path
            d="M50 61C50 61 33 49 33 38.5C33 32.5 38 28 43.5 28C47 28 49 30 50 33C51 30 53 28 56.5 28C62 28 67 32.5 67 38.5C67 49 50 61 50 61Z"
            fill="#FF85B3"
          />
          <path
            d="M50 55.5C50 55.5 37.5 45.5 37.5 38.5C37.5 34 41 31 44.8 31C47.2 31 49.1 32.5 50 34.8C50.9 32.5 52.8 31 55.2 31C59 31 62.5 34 62.5 38.5C62.5 45.5 50 55.5 50 55.5Z"
            fill="#FFB3D1"
            fillOpacity="0.5"
          />
        </svg>
      </div>
    </div>
  )
}

function VisualFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="grid h-28 w-28 animate-pulse-soft place-items-center rounded-full bg-bubi-pink/25">
        <span className="font-display text-sm font-extrabold text-bubi-graphite/40">
          bubi
        </span>
      </div>
    </div>
  )
}

function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-t border-bubi-graphite/10 bg-bubi-graphite py-3.5">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
            className="flex shrink-0 items-center gap-6 pr-6"
          >
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-6 whitespace-nowrap text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/85"
              >
                {item}
                <span className="h-1.5 w-1.5 rotate-45 bg-bubi-pink" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    const syncFullscreen = () =>
      setIsFullscreen(Boolean(document.fullscreenElement))

    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [])

  useEffect(() => {
    if (!note) return undefined

    const timeout = window.setTimeout(() => setNote(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [note])

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen()
      } else {
        setNote('Этот браузер не поддерживает полноэкранный режим')
      }
    } catch {
      setNote('Не удалось включить полноэкранный режим')
    }
  }

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-bubi-blush"
    >
      <HeroDecor />
      <HeroMascots />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <div className="mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-6 px-4 pb-10 pt-28 sm:gap-8 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] lg:gap-6 lg:px-10 lg:pb-10 lg:pt-32 xl:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="relative z-10 max-w-[700px]"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-bubi-graphite py-2 pl-2 pr-3.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_-22px_rgba(17,17,17,0.9)] sm:text-[10px] sm:tracking-[0.18em]">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-bubi-pink text-bubi-graphite">
                <Sparkles aria-hidden="true" size={11} strokeWidth={2.6} />
              </span>
              <span>Bubble teashnaya</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-bubi-pink"
              />
              <span>Minsk</span>
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,4.55rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-bubi-graphite sm:mt-6">
              <span className="block">
                Культура{' '}
                <span className="relative inline-block">
                  чая
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 14"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 h-2.5 w-full text-bubi-pink"
                  >
                    <path
                      d="M3 9.5C27 4 59 3 117 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="block">прямиком из</span>
              <span className="mt-2 inline-block -rotate-1 rounded-[16px] bg-bubi-pink px-3 pb-1 pt-0.5 text-white shadow-[0_16px_30px_-20px_rgba(255,133,179,0.95)] sm:rounded-[20px] sm:px-4 sm:pb-1.5">
                Вьетнама
              </span>
            </h1>

            <p className="mt-5 max-w-[545px] text-[14.5px] leading-[1.7] text-bubi-graphite/65 sm:mt-6 sm:text-[16.5px]">
              Авторский бабл-ти с тапиокой, воздушные японские панкейки, нежные
              моти и аутентичные супы Фо Бо и Том Ям на Ратомской, 7.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#menu"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-bubi-graphite pl-6 pr-2 text-[14px] font-extrabold text-white shadow-[0_20px_40px_-22px_rgba(17,17,17,0.9)] transition duration-300 hover:-translate-y-0.5 hover:bg-black sm:text-[15px]"
              >
                Смотреть меню
                <span className="grid h-10 w-10 place-items-center rounded-full bg-bubi-pink text-bubi-graphite transition duration-300 group-hover:rotate-45">
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    strokeWidth={2.8}
                  />
                </span>
              </a>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full border border-bubi-graphite/12 bg-white/85 px-5 text-[13px] font-extrabold text-bubi-graphite shadow-[0_16px_34px_-26px_rgba(17,17,17,0.55)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-bubi-pink/40 hover:bg-white sm:text-sm"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bubi-pink/15 text-bubi-rose transition duration-300 group-hover:bg-bubi-pink group-hover:text-bubi-graphite">
                  {isFullscreen ? (
                    <Minimize2 aria-hidden="true" size={15} strokeWidth={2.5} />
                  ) : (
                    <Maximize2 aria-hidden="true" size={15} strokeWidth={2.5} />
                  )}
                </span>
                <span className="sm:hidden">
                  {isFullscreen ? 'Выйти' : 'Крупный экран'}
                </span>
                <span className="hidden sm:inline">
                  {isFullscreen
                    ? 'Выйти из большого экрана'
                    : 'Крупный экран для кассы'}
                </span>
              </button>
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-bubi-graphite/50 sm:text-[10px]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-bubi-pink" />
                свежая тапиока
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-bubi-pink" />
                японские панкейки
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-bubi-pink" />
                супы фо бо и том ям
              </span>
            </p>

            <span aria-live="polite" className="sr-only">
              {isFullscreen ? 'Полноэкранный режим включён' : ''}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative mx-auto w-full max-w-[620px]"
          >
            <div className="relative h-[330px] sm:h-[440px] lg:h-[clamp(460px,62vh,580px)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[2%] rounded-full bg-[radial-gradient(circle_at_36%_28%,#FFFFFF_0%,#FFE6F0_52%,#FFD2E4_100%)] shadow-[inset_0_0_80px_rgba(255,133,179,0.22),0_50px_90px_-60px_rgba(255,133,179,0.65)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-bubi-graphite/12"
              />

              <div
                role="img"
                aria-label="Интерактивный 3D-логотип bubi в окружении глянцевых жемчужин тапиоки. Потяните сцену, чтобы повернуть логотип."
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Suspense fallback={<VisualFallback />}>
                  <Hero3D />
                </Suspense>
              </div>

              <Sticker />
              <HeartCloudSticker />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-bubi-graphite/10 bg-white/80 px-3.5 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-bubi-graphite/55 shadow-[0_12px_28px_-22px_rgba(17,17,17,0.5)] backdrop-blur-md sm:text-[10px]">
                  <Hand
                    aria-hidden="true"
                    size={13}
                    strokeWidth={2.4}
                    className="text-bubi-rose"
                  />
                  Покрути логотип
                  <span className="hidden text-bubi-graphite/30 sm:inline">
                    · он живой
                  </span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <Marquee />
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[60] flex justify-center px-4">
        <AnimatePresence>
          {note && (
            <motion.div
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="rounded-full bg-bubi-graphite px-5 py-3 text-xs font-bold text-white shadow-[0_20px_40px_-20px_rgba(17,17,17,0.8)]"
            >
              {note}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
