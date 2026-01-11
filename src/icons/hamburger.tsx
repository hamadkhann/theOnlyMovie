export function HamburgerIcon({
  className = "w-6 h-6",
}: {
  className?: string;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
