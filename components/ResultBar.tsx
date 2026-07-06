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
        <span className="font-heading text-sm font-semibold text-kpv-grijs/80">
          {percentage}%
        </span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-kpv-border/60"
        role="img"
        aria-label={`${label}: ${percentage} procent`}
      >
        <motion.div
          className="h-full rounded-full"
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
