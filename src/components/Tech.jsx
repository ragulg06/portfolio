import React from "react";
import { motion } from "framer-motion";
import { styles } from "@/styles";
import { SectionWrapper } from "@/hoc";
import { technologies } from "@/constants";
import { textVariant } from "@/utils/motion";
import { BallCanvas } from "./canvas";

const Tech = () => {
  // Generate a unique color for each technology
  const getColor = (index) => {
    const colors = [
      "#6366f1", // Indigo
      "#8b5cf6", // Violet
      "#ec4899", // Pink
      "#f43f5e", // Rose
      "#0ea5e9", // Sky
      "#10b981", // Emerald
      "#f59e0b", // Amber
      "#ef4444", // Red
      "#3b82f6", // Blue
      "#14b8a6", // Teal
      "#f97316", // Orange
      "#a855f7", // Purple
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My Core Competencies
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          AI & Data Science Stack.
        </h2>
      </motion.div>
      
      <div className="mt-20 flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology, index) => (
          <div className="w-28 h-28 flex flex-col items-center" key={technology.name}>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0">
                <BallCanvas color={getColor(index)} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
                  <img
                    src={technology.icon}
                    alt={technology.name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-plain.svg";
                    }}
                  />
                </div>
              </div>
            </div>
            <p className="text-center text-secondary-foreground mt-2 text-sm font-medium">
              {technology.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "tech");