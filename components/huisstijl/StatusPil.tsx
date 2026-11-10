/** Statuspil, bijv. "Concept" bij nog niet geaccordeerde cijfers. */
export function StatusPil({ children = "Concept" }: { children?: React.ReactNode }) {
  return <span className="status-pil">{children}</span>;
}
