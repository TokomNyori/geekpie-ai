import ReactMarkDown from "react-markdown";
import Link from "next/link";
import Lottie from "lottie-react";
import Orb from "@/assets/jsons/orb1.json";
import { Message } from "ai/react";
import { cn } from "@/libs/utils";

type MessageProps = {
  message: Message;
};

export default function ChatMessages({
  message: { role, content, id },
}: MessageProps) {
  const aiMessages = role === "assistant";
  const idStatus = id === "loading";

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
          "overflow-x-auto rounded-lg border bg-zinc-900 px-3 py-2",
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
      </div>
    </div>
  );
}
