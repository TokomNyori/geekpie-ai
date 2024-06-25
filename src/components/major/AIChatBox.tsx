import { cn } from "@/libs/utils";
import { useChat, Message } from "ai/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoDependabot } from "react-icons/go";
import ReactMarkDown from "react-markdown";
import Link from "next/link";
import Lottie from "lottie-react";
import SiriOrb from "@/assets/jsons/siri-orb.json";
import { IoCogOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaCircleArrowUp } from "react-icons/fa6";
import { use, useEffect, useRef } from "react";

type AIChatBoxProps = {
  open: boolean;
  onClose: () => void;
};

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const {
    input,
    messages,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   if (open) {
  //     inputRef.current?.focus();
  //   }
  // }, [open]);

  const isLastMessageByUser = messages[messages.length - 1]?.role === "user";

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-50 w-full max-w-[31.25rem] p-1 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <button
        className="mb-1 ms-auto block rounded-full text-5xl backdrop-blur-[8px] transition-colors duration-300 ease-in-out hover:text-red-500 xl:translate-x-12 xl:translate-y-14"
        onClick={onClose}
      >
        <IoCloseCircleOutline />
      </button>
      <div className="relative flex h-[80vh] flex-col rounded-2xl border border-gray-500/50 bg-black/75 backdrop-blur-[12px] md:h-[37.5rem]">
        <div className="absolute inset-0 top-16 -z-10 aspect-square rounded-full bg-blue-400/25 blur-3xl filter"></div>
        <div
          className="mt-4 h-full w-full overflow-y-auto px-4"
          ref={scrollRef}
        >
          {messages.map((message, index) => (
            <ChatMessages key={index} message={message} />
          ))}

          {isLoading && isLastMessageByUser && (
            <ChatMessages
              message={{
                id: "loading",
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}

          {error && (
            <ChatMessages
              message={{
                id: "error",
                role: "assistant",
                content: "Something went wrong. Please try again!",
              }}
            />
          )}

          {!error && messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="">
                <Lottie
                  className="w-[10rem] rounded-full"
                  animationData={SiriOrb}
                  loop={true}
                />
              </div>
              <p className="text-center text-white">
                <span className="text-lg font-semibold">
                  Welcome to GeekPie AI.
                </span>{" "}
                <br />I am your assistant. How may I help you today?
              </p>
              <div className="mt-7 flex items-center justify-center gap-3 text-start">
                <div className="w-1/2 cursor-pointer rounded-xl border border-gray-500/50 p-3 transition-all duration-150 ease-in-out hover:bg-gray-400/15">
                  <IoCogOutline className="mb-2 text-xl text-yellow-400" />
                  Services offered by GeekPie AI?
                </div>
                <div className="w-1/2 cursor-pointer rounded-xl border border-gray-500/50 p-3 transition-all duration-150 ease-in-out hover:bg-gray-400/15">
                  <GoDependabot className="mb-2 text-xl text-blue-400" />
                  Tell me more about GeekPie AI.
                </div>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="m-3 mb-5 flex gap-1 rounded-3xl border border-gray-500/50 bg-transparent px-2.5 py-3"
        >
          <button
            type="submit"
            className="flex flex-none items-center justify-center text-3xl md:text-2xl disabled:opacity-50"
            title="Clear Chat"
            disabled={messages.length === 0}
            onClick={() => setMessages([])}
          >
            <MdDeleteOutline className="" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Message GeekPie AI"
            className="grow bg-transparent px-1 focus:outline-none"
          />
          <button
            type="submit"
            className="flex flex-none items-center justify-center text-3xl md:text-2xl disabled:opacity-50"
            title="Send message"
            disabled={!input || isLoading}
            onClick={() => setMessages([])}
          >
            <FaCircleArrowUp className="" />
          </button>
        </form>
      </div>
    </div>
  );
};

type MessageProps = {
  message: Message;
};

function ChatMessages({ message: { role, content } }: MessageProps) {
  const aiMessages = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-start",
        aiMessages ? "justify-start" : "justify-end",
      )}
    >
      {aiMessages && (
        <Lottie
          className="-ml-2 w-[2rem] rounded-full"
          animationData={SiriOrb}
          loop={true}
        />
      )}
      <div
        className={cn(
          "rounded-lg border px-3 py-2",
          aiMessages
            ? "rounded-tl-none border-blue-400/25 text-start"
            : "rounded-tr-none border-gray-500/50 text-end",
        )}
      >
        <ReactMarkDown
          components={{
            a: ({ node, ref, ...props }) => (
              <Link
                {...props}
                href={props.href ?? ""}
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

export default AIChatBox;
