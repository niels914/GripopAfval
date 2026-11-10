/** Waarschuwing/highlight: Violet blok — nooit geel. */
export function Letop({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`letop ${className ?? ""}`}>{children}</div>;
}
