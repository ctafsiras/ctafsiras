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
      smartBackspace: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="App">
      <span ref={el} />
    </div>
  );
}
