import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export default function Logo({ 
  width = 40, 
  height = 40, 
  className = "",
  showText = true,
  textClassName = ""
}: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="DebtPayoffPro Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
      {showText && (
        <span className={`ml-2 text-xl font-bold ${textClassName}`} style={{ color: '#00509E' }}>
          DebtPayoffPro
        </span>
      )}
    </div>
  );
} 