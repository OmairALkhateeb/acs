import { useEffect, useState } from "react";

function getIsLowPowerDevice() {
  if (typeof window === "undefined") return false;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobileViewport = window.matchMedia("(max-width: 1024px)").matches;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;

  return reducedMotion || mobileViewport || lowMemory || lowCpu;
}

export function usePerformanceMode() {
  const [lowPowerMode, setLowPowerMode] = useState(getIsLowPowerDevice);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 1024px)");

    const update = () => setLowPowerMode(getIsLowPowerDevice());
    update();

    media.addEventListener("change", update);
    mobile.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { lowPowerMode };
}
