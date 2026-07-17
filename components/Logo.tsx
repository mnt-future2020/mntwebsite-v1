import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const src = variant === "light" ? "/mnt-logo-white.png" : "/mnt-logo.png";
  return (
    <Link href="/" aria-label="MnT Future, home" className={`inline-flex items-center ${className}`}>
      <Image
        src={src}
        alt="MnT Future"
        // Intrinsic size of mnt-logo.png. The white variant is 2784×538 — a
        // 0.09% aspect difference, invisible under h-9 w-auto.
        width={2828}
        height={546}
        priority
        className="h-9 w-auto sm:h-10"
      />
    </Link>
  );
}
