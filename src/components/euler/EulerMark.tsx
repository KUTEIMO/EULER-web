interface EulerMarkProps {
  className?: string;
  height?: number;
}

export default function EulerMark({ className = '', height = 32 }: EulerMarkProps) {
  return (
    <img
      src="/branding/euler_mark.svg"
      alt="EULER"
      height={height}
      className={className}
      decoding="async"
    />
  );
}
