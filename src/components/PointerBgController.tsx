"use client";

import { useEffect, useRef } from "react";

export default function PointerBgController() {
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const handlePointerMove = (event: PointerEvent) => {
      pendingRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const pending = pendingRef.current;
          if (!pending) return;

          const viewportWidth = window.innerWidth || 1;
          const viewportHeight = window.innerHeight || 1;
          const xPercent = Math.max(0, Math.min(100, (pending.x / viewportWidth) * 100));
          const yPercent = Math.max(0, Math.min(100, (pending.y / viewportHeight) * 100));

          root.style.setProperty("--cursor-x", `${xPercent}%`);
          root.style.setProperty("--cursor-y", `${yPercent}%`);
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove as EventListener);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return null;
}


