"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ShortlistCtx = {
  slugs: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
  count: number;
};

const ShortlistContext = createContext<ShortlistCtx>({
  slugs: [],
  add: () => {},
  remove: () => {},
  has: () => false,
  clear: () => {},
  count: 0,
});

const STORAGE_KEY = "t3_shortlist";

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // ignore
    }
  }, [slugs]);

  const add = useCallback((slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const has = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs]
  );

  const clear = useCallback(() => setSlugs([]), []);

  return (
    <ShortlistContext.Provider
      value={{ slugs, add, remove, has, clear, count: slugs.length }}
    >
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  return useContext(ShortlistContext);
}
