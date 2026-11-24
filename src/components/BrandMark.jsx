export default function BrandMark({ compact = false }) {
  return (
    <a
      href="#top"
      aria-label="bubi — бабл-ти и кафе, на главную"
      className="group flex shrink-0 items-center gap-2.5 rounded-full"
    >
      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bubi-pink shadow-[inset_0_-4px_0_rgba(17,17,17,0.14),0_8px_18px_-10px_rgba(255,133,179,0.9)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <span className="font-display text-[12px] font-extrabold tracking-[-0.04em] text-white">
          bubi
        </span>
        <span className="absolute -left-0.5 bottom-1 h-1.5 w-1.5 rounded-full bg-white/80" />
        <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-[3px] border-white bg-bubi-graphite" />
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
