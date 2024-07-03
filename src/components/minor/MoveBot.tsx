"use client";
import { motion, useDragControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import Orb from "@/assets/jsons/orb1.json";
import AIChatBox from "../major/AIChatBox";

const MoveBot = () => {
  const [openChatBox, setOpenChatBox] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const moveBotRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!isDragging) {
      setOpenChatBox(true);
    }
  };

  return (
    <>
      <motion.div
        ref={moveBotRef}
        // drag
        // dragConstraints={parent}
        // dragElastic={0.3}
        // onDragStart={() => setIsDragging(true)}
        // onDragEnd={() => setIsDragging(false)}
        className="fixed_bot fixed bottom-5 right-5 z-30 md:right-7"
        // whileDrag={{ scale: 1.05 }}
        // animate={{ y: 0, x: 0 }}
      >
        <div
          className="group relative mb-2 w-[4rem] cursor-pointer rounded-full md:w-[5rem]"
          onClick={handleClick}
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/80 blur-md filter"></div>
          <Lottie
            className="rounded-full border-2 border-white/75"
            animationData={Orb}
            loop={true}
          />
          {/* <div className="absolute -bottom-9 left-0 right-0 hidden w-full justify-center rounded-lg bg-gray-50/5 py-0.5 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:flex group-hover:opacity-100">
            Chat
          </div> */}
        </div>
      </motion.div>
      <AIChatBox open={openChatBox} onClose={() => setOpenChatBox(false)} />
    </>
  );
};

export default MoveBot;
