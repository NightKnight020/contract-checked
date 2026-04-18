import Link from 'next/link';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const sizes = {
  sm: { icon: 24, text: 'text-base' },
  md: { icon: 32, text: 'text-lg' },
  lg: { icon: 40, text: 'text-2xl' },
};

export function Logo({ variant = 'dark', size = 'md', href = '/' }: LogoProps) {
  const iconColor = variant === 'dark' ? '#ffffff' : '#2D6A4F';
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#1B4332]';
  const { icon: iconSize, text: textSize } = sizes[size];

  const svgIcon = (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Central pillar */}
      <rect x="19" y="6" width="2" height="28" rx="1" fill={iconColor} />
      {/* Top fulcrum */}
      <rect x="8" y="9" width="24" height="2" rx="1" fill={iconColor} />
      {/* Left pan string */}
      <line x1="12" y1="11" x2="10" y2="22" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="11" x2="14" y2="22" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* Right pan string */}
      <line x1="28" y1="11" x2="26" y2="22" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="11" x2="30" y2="22" stroke={iconColor} strokeWidth="1.5" strokeLinecap="round" />
      {/* Left pan */}
      <path d="M7 22 Q12 26 17 22" stroke={iconColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Right pan */}
      <path d="M23 22 Q28 26 33 22" stroke={iconColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Base */}
      <path d="M14 34 H26" stroke={iconColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  return (
    <Link href={href} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
      {svgIcon}
      <span className={`font-bold ${textSize} ${textColor}`}>Contract Checked</span>
    </Link>
  );
}
