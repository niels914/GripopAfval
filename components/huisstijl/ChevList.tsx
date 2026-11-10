/** Chevron-bullet-lijst: het standaardlijstteken uit de huisstijl. */
export function ChevList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={`chev ${className ?? ""}`}>{children}</ul>;
}
