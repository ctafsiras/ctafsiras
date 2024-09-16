// import { motion } from "framer-motion"

// React Server Components
import * as motion from "framer-motion/client";

export default function Home() {
  return (
    <div>
      <motion.div
        className="bordefr"
        // initial={ { text: "C Tafsir A S" }}
        // whileHover={{ text: "Chy Tafsir Ahm Sid" }}
        // transition={{ duration: 0.3 }}
      >
        Hi Ki obostha
        {/* {(props) => <p>{props.text}</p>} */}
      </motion.div>
    </div>
  );
}
