import * as React from "react";

type IconProps = {
  name: IconName;
  className?: string;
};

export type IconName =
  | "stethoscope"
  | "cart"
  | "shield"
  | "spark"
  | "code"
  | "video"
  | "records"
  | "hospital"
  | "ai"
  | "network"
  | "store"
  | "tag"
  | "grid"
  | "bolt"
  | "phone"
  | "layers"
  | "check"
  | "arrow"
  | "chevron"
  | "lock"
  | "gauge"
  | "users"
  | "rocket"
  | "compass"
  | "mail"
  | "pin"
  | "globe"
  | "clock"
  | "instagram"
  | "linkedin"
  | "facebook"
  | "quote"
  | "cloud"
  | "plus"
  | "edit"
  | "trash"
  | "bell"
  | "search"
  | "eye"
  | "download"
  | "save"
  | "x"
  | "filter"
  | "link"
  | "image"
  | "chat"
  | "calendar"
  | "wallet"
  | "building";

const paths: Record<IconName, React.ReactNode> = {
  stethoscope: (
    <>
      <path d="M5 3v6a5 5 0 0 0 10 0V3" />
      <path d="M3 3h4M13 3h4" />
      <path d="M10 19a4 4 0 0 0 4-4" />
      <circle cx="18" cy="17" r="3" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2.2l2 12.4A2 2 0 0 0 8.1 17H18a2 2 0 0 0 2-1.6L21.5 8H6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9.2 12l2 2 3.6-3.8" />
    </>
  ),
  spark: (
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
  ),
  code: (
    <>
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
      <path d="M13 5l-2 14" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
      <path d="M15.5 10l6-3v10l-6-3" />
    </>
  ),
  records: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M12 7v6M9 10h6" />
      <path d="M8 17h8" />
    </>
  ),
  hospital: (
    <>
      <path d="M3 21h18" />
      <rect x="5" y="6" width="14" height="15" rx="1.5" />
      <path d="M12 3v3M10.5 4.5h3" />
      <path d="M9 11h6M12 9v4" />
    </>
  ),
  ai: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      <circle cx="12" cy="12" r="2.4" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.6 7.6L11 16M16.4 7.6L13 16M8 6h8" />
    </>
  ),
  store: (
    <>
      <path d="M4 9l1.2-4.4A1.5 1.5 0 0 1 6.6 3.5h10.8a1.5 1.5 0 0 1 1.4 1.1L20 9" />
      <path d="M4 9v10a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V9" />
      <path d="M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0" />
    </>
  ),
  tag: (
    <>
      <path d="M3 11.5V5a2 2 0 0 1 2-2h6.5L21 12.5 12.5 21 3 11.5z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  chevron: <path d="M6 9l6 6 6-6" />,
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      <path d="M12 14v3" />
    </>
  ),
  gauge: (
    <>
      <path d="M3.5 18a8.5 8.5 0 1 1 17 0" />
      <path d="M12 14l4-3" />
      <circle cx="12" cy="14" r="1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M17 14.5a5.5 5.5 0 0 1 3.5 5.1" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3c3 1 5 4 5 8l-2 3H9l-2-3c0-4 2-7 5-8z" />
      <circle cx="12" cy="9" r="1.6" />
      <path d="M9 14l-2.5 2.5M15 14l2.5 2.5M10 18c0 1.5-1 3-1 3M14 18c0 1.5 1 3 1 3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.6" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="16.7" cy="7.3" r="1" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7 10.5V16" />
      <path d="M7 7.4v.01" />
      <path d="M11 16v-3.3a2 2 0 0 1 4 0V16" />
      <path d="M11 10.6V16" />
    </>
  ),
  facebook: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M13.6 8.6h-1.1c-.9 0-1.5.5-1.5 1.5V11h2.2l-.3 2.1h-1.9V19" />
    </>
  ),
  quote: <path d="M9 7c-2.5 1-4 3-4 6v4h5v-5H6.5C6.6 9.5 7.7 8.3 9.5 7.6L9 7zm9 0c-2.5 1-4 3-4 6v4h5v-5h-3.5c.1-2.5 1.2-3.7 3-4.4L18 7z" />,
  cloud: <path d="M6.8 18.5a4.2 4.2 0 0 1-.5-8.37 5.6 5.6 0 0 1 10.78-1.36A3.9 3.9 0 0 1 17.6 18.5H6.8z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M10 11v6M14 11v6" />
      <path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
      <path d="M9 7V4h6v3" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </>
  ),
  save: (
    <>
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M8 3v6h7" />
      <path d="M8 21v-6h8v6" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6L6 18" />,
  filter: <path d="M3 5h18l-7 8v6l-4-2v-4z" />,
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 16l-5-5L5 20" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1.3" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" />
      <path d="M3 21h18" />
    </>
  ),
};

export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
