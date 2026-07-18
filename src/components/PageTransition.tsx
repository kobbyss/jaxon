import { useEffect, useRef, useState, type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  /** A key that changes when the page changes, triggering the transition */
  pageKey: string;
}

export default function PageTransition({ children, pageKey }: PageTransitionProps) {
  const [displayNode, setDisplayNode] = useState(children);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const prevKey = useRef(pageKey);

  useEffect(() => {
    if (pageKey !== prevKey.current) {
      setPhase("out");
      const t = setTimeout(() => {
        setDisplayNode(children);
        prevKey.current = pageKey;
        setPhase("in");
        window.scrollTo({ top: 0, behavior: "auto" });
      }, 250);
      return () => clearTimeout(t);
    }
    setDisplayNode(children);
  }, [pageKey, children]);

  return (
    <div
      className={`transition-all duration-300 ${
        phase === "in"
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
      }`}
    >
      {displayNode}
    </div>
  );
}
