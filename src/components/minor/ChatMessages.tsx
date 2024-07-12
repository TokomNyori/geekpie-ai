import ReactMarkDown from "react-markdown";
import Link from "next/link";
import Lottie from "lottie-react";
import Orb from "@/assets/jsons/orb1.json";
import { Message } from "ai/react";
import { cn } from "@/libs/utils";
import { Button } from "../ui/button";
import { useEffect } from "react";

type MessageProps = {
  message: Message;
  showMeetingBtn: boolean;
  showButtonInThisMessage?: boolean;
  loadMeetingModal?: boolean;
  meetingDetailsSubmitted?: boolean;
  setLoadMeetingModal: React.Dispatch<boolean>;
  scrollRef?: React.RefObject<HTMLDivElement>;
};

export default function ChatMessages({
  message: { role, id, content },
  showMeetingBtn,
  showButtonInThisMessage,
  setLoadMeetingModal,
  meetingDetailsSubmitted,
  scrollRef,
}: MessageProps) {
  const aiMessages = role === "assistant";
  const idStatus = id === "loading";

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [showButtonInThisMessage, scrollRef]);

  // console.log({
  //   aiMessages,
  //   showMeetingBtn,
  //   showButtonInThisMessage,
  // });

  return (
    <div
      className={cn(
        "mb-5 flex w-full items-start text-gray-100",
        aiMessages ? "justify-start" : "justify-end",
      )}
    >
      {aiMessages && (
        <div className="-ml-0.5 -mt-0.5 mr-1.5 w-[1.8rem] flex-none">
          {/* <div className="absolute inset-0 bg-blue-500/50 blur-[8px] filter"></div> */}
          <Lottie className="rounded-full" animationData={Orb} loop={true} />
        </div>
      )}
      <div
        className={cn(
          "overflow-x-auto rounded-lg border bg-zinc-900 px-3 py-3",
          aiMessages
            ? "mr-3 rounded-tl-none border-none text-start"
            : "ml-12 rounded-tr-none border-none text-start",
        )}
      >
        <ReactMarkDown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
                target="_blank"
                className="text-green-500 hover:underline"
              />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="mt-3 first:mt-0" />
            ),
            ul: ({ node, ...props }) => (
              <ul
                {...props}
                className="mt-3 list-inside list-disc first:mt-0"
              />
            ),
            li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          }}
        >
          {content}
        </ReactMarkDown>
        {aiMessages && showMeetingBtn && showButtonInThisMessage && (
          <Button
            className="mb-1 mt-3 animate-pulse bg-green-400 text-[1rem] text-zinc-950 hover:bg-green-400 hover:brightness-125 disabled:animate-none disabled:bg-zinc-500"
            disabled={meetingDetailsSubmitted}
            onClick={() => setLoadMeetingModal(true)}
          >
            {meetingDetailsSubmitted
              ? "Meeting details submitted!"
              : "Click to enter meeting details"}
          </Button>
        )}
      </div>
    </div>
  );
}
