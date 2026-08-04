"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { REGIONS, regionFromPath } from "@/lib/regions";

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const src = variant === "light" ? "/mnt-logo-white.png" : "/mnt-logo.png";
  // Home is the home of the region you are standing in. Sending an India
  // visitor to the US site because they clicked the logo is the fastest way to
  // lose them, and it silently flips the nav under them.
  const pathname = usePathname() || "/";
  const home = REGIONS[regionFromPath(pathname)].base || "/";
  return (
    <Link
      href={home}
      aria-label="MnT Future, home"
      className={`inline-flex items-center ${className}`}
      // Same-route clicks don't re-navigate, so the router never scrolls:
      // take the user to the top ourselves when they're already home.
      onClick={() => {
        if (window.location.pathname === home) window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Image
        src={src}
        alt="MnT Future"
        // Intrinsic size of mnt-logo.png. The white variant is 2784×538: a
        // 0.09% aspect difference, invisible under h-9 w-auto.
        width={2828}
        height={546}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
