import * as React from "react";

// Infinite horizontal marquee — pure CSS transform, pauses on hover, reduced-motion safe.
export default function Marquee({
  children,
  reverse = false,
  duration = "40s",
  gap = "1.5rem",
  className = "",
}: {
  children: React.ReactNode;
  reverse?: boolean;
  duration?: string;
  gap?: string;
  className?: string;
}) {
  const style = { "--duration": duration, "--gap": gap } as React.CSSProperties;
  const track = `flex shrink-0 items-stretch animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`;
  return (
    <div
      className={`marquee-wrap marquee-mask flex w-full overflow-hidden [gap:var(--gap)] ${className}`}
      style={style}
    >
      <div className={track} style={{ gap }}>
        {children}
      </div>
      <div className={track} style={{ gap }} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
