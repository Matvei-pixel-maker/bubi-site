import { ArrowUpRight, Clock3, MapPin } from 'lucide-react'

function InstagramIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer id="contacts" className="relative z-10 overflow-hidden bg-[#FFF5F8]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="footerWaveGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#262626" />
              <stop offset="100%" stopColor="#0D0D0D" />
            </linearGradient>
          </defs>
          <path
            d="M-120 40C180 110 360 0 620 120C880 240 1080 100 1560 260L1560 420C1080 280 880 420 620 300C360 180 180 290-120 220Z"
            fill="url(#footerWaveGradient)"
            fillOpacity="1"
          />
          <path
            d="M-120 520C200 600 420 480 700 610C980 740 1200 590 1560 710L1560 900C1200 790 980 930 700 800C420 680 200 800-120 720Z"
            fill="url(#footerWaveGradient)"
            fillOpacity="1"
          />
          <path
            d="M900-100C1060 10 1240-70 1560 40L1560 140C1280 40 1080 120 900 20Z"
            fill="url(#footerWaveGradient)"
            fillOpacity="1"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 py-10 text-white sm:px-6 lg:px-10 lg:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md">
            <a href="#top" aria-label="bubi — на главную" className="inline-flex">
              <img
                src={`${import.meta.env.BASE_URL}images/brand-logo.webp`}
                alt="bubi"
                width="640"
                height="225"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-8 w-auto object-contain brightness-0 invert drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.04]"
              />
            </a>

            <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-xl bg-black/35 px-3 py-2 text-[12.5px] font-bold text-white sm:bg-[#FF85B3] sm:text-[13px] sm:text-[#111111]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin
                  aria-hidden="true"
                  size={14}
                  strokeWidth={2.5}
                  className="text-white sm:text-[#111111]"
                />
                г. Минск, ул. Ратомская, 7
              </span>
              <span aria-hidden="true" className="text-white/70 sm:text-[#FF85B3]">
                •
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3
                  aria-hidden="true"
                  size={13}
                  strokeWidth={2.5}
                  className="text-white sm:text-[#111111]"
                />
                11:00–22:00
              </span>
            </p>

            <a
              href="https://www.instagram.com/bubi.bubbletea/"
              target="_blank"
              rel="noreferrer"
              className="group mt-4 inline-flex items-center gap-2.5 rounded-full border-2 border-[#FF85B3] bg-[#FF85B3] px-4 py-2.5 text-[11.5px] font-extrabold text-[#111111] shadow-[0_16px_34px_-24px_rgba(255,133,179,0.9)] transition duration-200 hover:-translate-y-0.5 hover:border-[#FFB3D1] hover:bg-[#FFB3D1]"
            >
              <InstagramIcon className="text-[#111111] transition group-hover:text-[#FF85B3]" />
              @bubi.bubbletea
              <ArrowUpRight
                aria-hidden="true"
                size={13}
                strokeWidth={2.8}
                className="text-[#111111]/60 transition group-hover:text-[#111111]"
              />
            </a>
          </div>

          <div className="flex flex-wrap gap-2 sm:justify-end">
            <a
              href="#menu"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#FF85B3] bg-[#FF85B3] px-5 text-[12px] font-extrabold text-[#111111] shadow-[0_14px_30px_-24px_rgba(255,133,179,0.9)] transition hover:border-[#FFB3D1] hover:bg-[#FFB3D1]"
            >
              Меню
              <ArrowUpRight
                aria-hidden="true"
                size={14}
                strokeWidth={2.6}
                className="text-[#111111]"
              />
            </a>
            <a
              href="#order"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#FF85B3] bg-[#FF85B3] px-5 text-[12px] font-extrabold text-[#111111] shadow-[0_14px_30px_-24px_rgba(255,133,179,0.9)] transition hover:border-[#FFB3D1] hover:bg-[#FFB3D1]"
            >
              Мой заказ
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[9px] text-[#111111]">
                0
              </span>
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 rounded-2xl border border-white/25 bg-black/20 px-4 py-4 text-[9.5px] font-extrabold uppercase tracking-[0.14em] text-white sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} bubi · bubble tea &amp; cafe</p>
          <p className="inline-flex items-center gap-1.5">
            Сделано с любовью к тапиоке
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-white"
            />
          </p>
        </div>
      </div>
    </footer>
  )
}
