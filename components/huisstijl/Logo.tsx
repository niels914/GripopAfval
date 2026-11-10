import Image from "next/image";
import kplusvLogo from "@/assets/logos/kplusv-logo-512.png";

/**
 * Officieel KplusV-logo (huisstijl 2.2): niet kleiner dan 96px op scherm,
 * standaard 128px. Nooit groter tonen dan de bronresolutie (512px) schaalt.
 */
export function Logo({ className = "h-32 w-32" }: { className?: string }) {
  return (
    <Image
      src={kplusvLogo}
      alt="KplusV"
      priority
      className={className}
    />
  );
}
