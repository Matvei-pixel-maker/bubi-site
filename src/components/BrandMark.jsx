export default function BrandMark({ compact = false }) {
  return (
    <a
      href="#top"
      aria-label="bubi — бабл-ти и кафе, на главную"
      className="group flex shrink-0 items-center gap-2.5 rounded-full"
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-[1.5px] border-bubi-pink bg-white shadow-[0_10px_22px_-14px_rgba(232,122,158,0.85)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <span className="font-display text-[13px] font-extrabold tracking-[-0.04em] text-[#E87A9E]">
          bubi
        </span>
      </span>

      {!compact && (
        <span className="hidden flex-col leading-none sm:flex">
          <span className="font-display text-[19px] font-extrabold leading-none tracking-[-0.045em] text-bubi-graphite">
            bubi
          </span>
          <span className="mt-1.5 text-[7.5px] font-extrabold uppercase leading-none tracking-[0.24em] text-bubi-graphite/40">
            bubble tea &amp; cafe
          </span>
        </span>
      )}
    </a>
  )
}
