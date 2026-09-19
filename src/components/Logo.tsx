import Link from 'next/link';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const sizes = {
  sm: { height: 24, text: 'text-sm' },
  md: { height: 32, text: 'text-base' },
  lg: { height: 40, text: 'text-lg' },
};

export function Logo({ variant = 'dark', size = 'md', href = '/' }: LogoProps) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-[#0F172A]';
  const { height, text: textSize } = sizes[size];
  const scalesColor = variant === 'dark' ? '#ffffff' : '#0F172A';
  const checkColor = '#059669';

  return (
    <Link href={href} className="flex items-center gap-3 hover:opacity-90 transition-opacity">
      <svg
        width={height}
        height={height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="22" y="8" width="4" height="32" rx="2" fill={scalesColor} />
        <rect x="8" y="12" width="32" height="3" rx="1.5" fill={scalesColor} />
        <line x1="14" y1="13" x2="11" y2="26" stroke={scalesColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="13" x2="17" y2="26" stroke={scalesColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="13" x2="31" y2="26" stroke={scalesColor} strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="13" x2="37" y2="26" stroke={scalesColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M8 26 Q14 30 20 26" stroke={scalesColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M28 26 Q34 30 40 26" stroke={scalesColor} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M16 40 H32" stroke={scalesColor} strokeWidth="3" strokeLinecap="round" />
        <rect x="26" y="12" width="18" height="18" rx="3" stroke={checkColor} strokeWidth="2.5" fill={variant === 'dark' ? '#0F172A' : 'white'} />
        <path d="M28 18L32 22L40 14" stroke={checkColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-bold tracking-tight ${textSize} ${textColor}`}>
        Contract Checked
      </span>
    </Link>
  );
}
