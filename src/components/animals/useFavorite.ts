"use client";

import { useSyncExternalStore } from "react";
import { parseFavoriteIds } from "@/lib/favorites";

const storageKey = "sahiplen-besiktas:favorites:v1";
const changeEvent = "sahiplen-favorites-change";
let memorySnapshot = "[]";
let useMemory = false;

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

function snapshot() {
  if (useMemory) return memorySnapshot;
  try {
    return localStorage.getItem(storageKey) ?? "[]";
  } catch {
    return memorySnapshot;
  }
}

const serverSnapshot = () => "[]";

export function useFavorite(id: string) {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const selected = parseFavoriteIds(value).includes(id);
  function toggle() {
    const ids = parseFavoriteIds(snapshot());
    const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id].slice(-500);
    memorySnapshot = JSON.stringify(next);
    try { localStorage.setItem(storageKey, memorySnapshot); } catch { useMemory = true; }
    window.dispatchEvent(new Event(changeEvent));
  }
  return [selected, toggle] as const;
}
