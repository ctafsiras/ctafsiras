"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useScroll } from "framer-motion";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.map((word) => word.text.split(""));
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 0.1,
        delay: stagger(0.1),
      }
    );
  }, [animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        <motion.div style={{ scaleX: scrollYProgress }} />
        {wordsArray.map((word, wordIndex) => {
          return (
            <span key={`word-${wordIndex}`} className="inline-block">
              {word.map((letter, letterIndex) => (
                <motion.span
                  key={`letter-${letterIndex}`}
                  className={`opacity-0 ${words[wordIndex].className}`}
                >
                  {letter}
                </motion.span>
              ))}
              &nbsp;
            </span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={`${className} items-center flex justify-center`}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
        className={`inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-primary ${cursorClassName}`}
      ></motion.span>
    </div>
  );
};
