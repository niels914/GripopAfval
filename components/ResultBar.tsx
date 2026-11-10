"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Horizontale staaf voor de restafvalsamenstelling. */
export function ResultBar({
  percentage,
  label,
  color,
}: {
  percentage: number;
  label: string;
  color: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-semibold text-tekst-2">{percentage}%</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden bg-mist"
        role="img"
        aria-label={`${label}: ${percentage} procent`}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          initial={reduceMotion ? { width: `${percentage}%` } : { width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
