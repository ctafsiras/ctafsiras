"use client";
import React from "react";
import Typed from "typed.js";

export default function TypewriterEffect({
  sentences,
}: {
  sentences: string[];
}) {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: sentences,
      typeSpeed: 50,
      backSpeed: 30,
      smartBackspace: true,
      loop: true,
      loopCount: Infinity,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={el} />;
}
