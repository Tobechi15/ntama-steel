type LogoProps = {
  className?: string;
  markOnly?: boolean;
};

export function Logo({ className = "", markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
        fill="none"
      >
        <path d="M3 35.5V10.2L14.6 2v25.3L3 35.5Z" fill="#E9721E" />
        <path d="M17.1 2h8.2l11.7 8.2v25.3h-7.4V15.4l-12.5-8.7V2Z" fill="#F3F2EE" />
        <path d="M3 35.5 14.6 27.3v8.2H3Z" fill="#B85513" />
      </svg>
      {!markOnly && (
        <span className="flex flex-col justify-center leading-none">
          <span className="font-display text-[1.02rem] font-extrabold tracking-[0.04em]">
            NTAMA
          </span>
          <span className="mt-[3px] text-[0.55rem] font-medium tracking-[0.42em] text-mist">
            STEEL
          </span>
        </span>
      )}
    </span>
  );
}
