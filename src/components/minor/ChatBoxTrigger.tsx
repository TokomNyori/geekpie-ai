"use client";
import ButtonLink from "./ButtonLink";
import { GoDependabot } from "react-icons/go";
import { cn } from "@/libs/utils";
import AIChatBox from "../major/AIChatBox";
import { useState } from "react";

type ChatBoxTriggerProps = {
  buttonText: string;
  className?: string;
};

const ChatBoxTrigger = ({ buttonText, className }: ChatBoxTriggerProps) => {
  const [openChatBox, setOpenChatBox] = useState(false);
  return (
    <>
      <ButtonLink className={cn(className)} onClick={() => setOpenChatBox(true)}>
        <div className="flex items-center justify-center gap-3">
          <GoDependabot className="text-xl" />
          {buttonText}
        </div>
      </ButtonLink>
      <AIChatBox open={openChatBox} onClose={() => setOpenChatBox(false)} />
    </>
  );
};

export default ChatBoxTrigger;
