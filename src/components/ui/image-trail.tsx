"use client";

import {
  Children,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  type AnimationSequence,
  motion,
  type Target,
  type Transition,
  useAnimate,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { v4 as uuidv4 } from "uuid";

import { useMouseVector } from "@/components/hooks/use-mouse-vector";

type TrailSegment = [Target, Transition];
type TrailAnimationSequence = TrailSegment[];

type ImageTrailProps = {
  children: ReactNode;
  containerRef?: RefObject<HTMLElement | null>;
  newOnTop?: boolean;
  rotationRange?: number;
  animationSequence?: TrailAnimationSequence;
  interval?: number;
  velocityDependentSpawn?: boolean;
  className?: string;
};

type TrailItemData = {
  id: string;
  x: number;
  y: number;
  rotation: number;
  animationSequence: TrailAnimationSequence;
  child: ReactNode;
};

const defaultAnimationSequence: TrailAnimationSequence = [
  [{ scale: 1.2 }, { duration: 0.1, ease: "circOut" }],
  [{ scale: 0 }, { duration: 0.5, ease: "circIn" }],
];

function ImageTrail({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  animationSequence = defaultAnimationSequence,
  interval = 100,
  className = "",
}: ImageTrailProps) {
  const [trailItems, setTrailItems] = useState<TrailItemData[]>([]);
  const lastAddedTimeRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const currentIndexRef = useRef(0);
  const hasPointerMovedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const { position: mousePosition } = useMouseVector(containerRef);

  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  const addToTrail = useCallback(
    (position: { x: number; y: number }) => {
      if (!childrenArray.length) return;

      const newItem: TrailItemData = {
        id: uuidv4(),
        x: position.x,
        y: position.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        child: childrenArray[currentIndexRef.current],
      };

      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length;

      setTrailItems((items) =>
        newOnTop ? [...items, newItem] : [newItem, ...items],
      );
    },
    [animationSequence, childrenArray, newOnTop, rotationRange],
  );

  const removeFromTrail = useCallback((itemId: string) => {
    setTrailItems((items) => items.filter((item) => item.id !== itemId));
  }, []);

  useAnimationFrame((time) => {
    if (shouldReduceMotion) return;

    const pointerHasChanged =
      lastMousePositionRef.current.x !== mousePosition.x ||
      lastMousePositionRef.current.y !== mousePosition.y;

    if (!pointerHasChanged) return;

    lastMousePositionRef.current = mousePosition;
    hasPointerMovedRef.current = true;

    if (
      !hasPointerMovedRef.current ||
      time - lastAddedTimeRef.current < interval
    ) {
      return;
    }

    lastAddedTimeRef.current = time;
    addToTrail(mousePosition);
  });

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full pointer-events-none ${className}`.trim()}
    >
      {trailItems.map((item) => (
        <TrailItem
          item={item}
          key={item.id}
          onComplete={removeFromTrail}
        />
      ))}
    </div>
  );
}

type TrailItemProps = {
  item: TrailItemData;
  onComplete: (id: string) => void;
};

function TrailItem({ item, onComplete }: TrailItemProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    let isMounted = true;
    const sequence = item.animationSequence.map((segment: TrailSegment) => [
      scope.current,
      ...segment,
    ]);
    const controls = animate(sequence as AnimationSequence);

    controls.then(() => {
      if (isMounted) onComplete(item.id);
    });

    return () => {
      isMounted = false;
      controls.stop();
    };
  }, [animate, item.animationSequence, item.id, onComplete, scope]);

  return (
    <motion.div
      className="absolute will-change-transform"
      data-image-trail-item=""
      ref={scope}
      style={{
        left: item.x,
        top: item.y,
        x: "-50%",
        y: "-50%",
        rotate: item.rotation,
      }}
    >
      {item.child}
    </motion.div>
  );
}

export { ImageTrail };
