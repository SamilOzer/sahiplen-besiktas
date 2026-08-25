"use client";

import { type RefObject, useEffect, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type Vector = {
  dx: number;
  dy: number;
};

export function useMouseVector(
  containerRef?: RefObject<HTMLElement | SVGElement | null>,
) {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [vector, setVector] = useState<Vector>({ dx: 0, dy: 0 });

  useEffect(() => {
    let lastPosition: Point = { x: 0, y: 0 };

    const updatePosition = (clientX: number, clientY: number) => {
      const bounds = containerRef?.current?.getBoundingClientRect();
      const nextPosition = {
        x: bounds ? clientX - bounds.left : clientX,
        y: bounds ? clientY - bounds.top : clientY,
      };

      setVector({
        dx: nextPosition.x - lastPosition.x,
        dy: nextPosition.y - lastPosition.y,
      });
      setPosition(nextPosition);
      lastPosition = nextPosition;
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePosition(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return { position, vector };
}
