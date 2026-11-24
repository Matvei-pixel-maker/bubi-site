import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  Menu,
  ShoppingBag,
  X,
} from 'lucide-react'
import BrandMark from './BrandMark'

const EASE = [0.22, 1, 0.36, 1]

export function AddressPlate({ className = '' }) {
  return (
    <div
      className={`flex items-center justify-center gap-2.5 rounded-full bg-bubi-graphite px-4 py-2.5 text-[10.5px] font-bold text-white shadow-[0_12px_28px_-20px_rgba(17,17,17,0.95)] ${className}`}
    >
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <MapPin
          aria-hidden="true"
          size={13}
          strokeWidth={2.5}
          className="text-bubi-pink"
        />
        ул. Ратомская, 7
      </span>
      <span
        aria-hidden="true"
        className="h-1 w-1 shrink-0 rounded-full bg-bubi-pink"
      />
      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
        <Clock3
          aria-hidden="true"
          size={12}
          strokeWidth={2.5}
          className="text-bubi-pink"
        />
        11:00–22:00
      </span>
    </div>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const handleChange = (event) => {
      if (event.matches) setIsOpen(false)
    }

    desktop.addEventListener('change', handleChange)
    return () => desktop.removeEventListener('change', handleChange)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-[1440px] px-3 pt-3 sm:px-6 sm:pt-5 lg:px-10">
        <nav
          aria-label="Главная навигация"
          className="relative rounded-[26px] border border-bubi-graphite/10 bg-white/80 px-3 py-2 shadow-[0_20px_60px_-34px_rgba(17,17,17,0.6)] backdrop-blur-xl sm:rounded-full sm:px-4"
        >
          <div className="relative flex items-center justify-between gap-2 sm:gap-4">
            <BrandMark />

            <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
              <AddressPlate />
            </div>

            <div className="flex items-center justify-end gap-2">
              <a
                href="#menu"
                className="hidden h-11 items-center gap-2 rounded-full border-2 border-bubi-graphite px-5 text-[13px] font-extrabold text-bubi-graphite transition duration-200 hover:-translate-y-0.5 hover:bg-bubi-graphite hover:text-white lg:inline-flex"
              >
                Меню
                <ArrowUpRight
                  aria-hidden="true"
                  size={15}
                  strokeWidth={2.6}
                  className="text-bubi-pink"
                />
              </a>

              <a
                href="#order"
                aria-label="Мой заказ, сейчас 0 позиций"
                className="group inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-bubi-graphite pl-3 pr-2 text-[13px] font-extrabold text-white shadow-[0_12px_26px_-16px_rgba(17,17,17,0.9)] transition duration-200 hover:-translate-y-0.5 hover:bg-black sm:pl-4 sm:pr-2.5"
              >
                <ShoppingBag
                  aria-hidden="true"
                  size={16}
                  strokeWidth={2.4}
                  className="text-bubi-pink transition-transform duration-300 group-hover:-rotate-6"
                />
                <span className="hidden sm:inline">Мой заказ</span>
                <span className="grid h-6 min-w-6 place-items-center rounded-full bg-bubi-pink px-1.5 text-[10px] font-extrabold leading-none text-bubi-graphite">
                  0
                </span>
              </a>

              <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bubi-blush text-bubi-graphite transition hover:bg-bubi-pink/25 lg:hidden"
              >
                {isOpen ? (
                  <X aria-hidden="true" size={18} strokeWidth={2.6} />
                ) : (
                  <Menu aria-hidden="true" size={18} strokeWidth={2.6} />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-nav"
                key="mobile-nav"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="absolute inset-x-0 top-[calc(100%+8px)] origin-top rounded-3xl border border-bubi-graphite/10 bg-white/95 p-3 shadow-[0_30px_70px_-40px_rgba(17,17,17,0.65)] backdrop-blur-xl lg:hidden"
              >
                <AddressPlate className="w-full" />

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href="#menu"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-12 items-center justify-between rounded-2xl bg-bubi-graphite px-4 text-[13px] font-extrabold text-white transition hover:bg-black"
                  >
                    Меню
                    <ArrowUpRight
                      aria-hidden="true"
                      size={16}
                      strokeWidth={2.6}
                      className="text-bubi-pink"
                    />
                  </a>
                  <a
                    href="#order"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex h-12 items-center justify-between rounded-2xl border border-bubi-graphite/10 bg-bubi-blush px-4 text-[13px] font-extrabold text-bubi-graphite transition hover:border-bubi-pink/50"
                  >
                    Мой заказ
                    <span className="grid h-6 min-w-6 place-items-center rounded-full bg-bubi-pink px-1.5 text-[10px] text-bubi-graphite">
                      0
                    </span>
                  </a>
                </div>

                <p className="mt-3 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-bubi-graphite/40">
                  Минск · ежедневно 11:00–22:00
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </header>
  )
}
