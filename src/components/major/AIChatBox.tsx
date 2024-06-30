import { cn } from "@/libs/utils";
import { useChat, Message } from "ai/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { GoDependabot } from "react-icons/go";
import ReactMarkDown from "react-markdown";
import Link from "next/link";
import Lottie from "lottie-react";
import SiriOrb from "@/assets/jsons/siri-orb.json";
import Orb from "@/assets/jsons/orb1.json";
import ThinkingAni from "@/assets/jsons/thinking.json";
import TypingAni from "@/assets/jsons/typing.json";
import { IoCogOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { use, useEffect, useRef, useState } from "react";
import { createMockFormEvent } from "@/fakers/fakers";

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
    stop,
    setInput,
  } = useChat({
    api: "/api/genai",
  });

  const [demoPrompt, setDemoPrompt] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (input && demoPrompt) {
      handleSubmit(createMockFormEvent());
      setDemoPrompt(false);
    }
  }, [input, demoPrompt, handleSubmit]);

  // useEffect(() => {
  //   if (open) {
  //     inputRef.current?.focus();
  //   }
  // }, [open]);

  const isLastMessageByUser = messages[messages.length - 1]?.role === "user";

  console.log(messages);

  // async function sendDemoPrompts(event: any) {
  //   handleSubmit(createMockFormEvent(), {
  //     data: {
  //       prompt: input,
  //     },
  //   });
  // }

  return (
    <div
      className={cn(
        "bottom-0 right-0 z-50 w-full max-w-[34.25rem] p-1 xl:right-36",
        open ? "fixed" : "hidden",
      )}
    >
      <button
        className="mb-1 ms-auto block rounded-full text-5xl backdrop-blur-[12px] transition-colors duration-300 ease-in-out hover:text-red-500 xl:translate-x-12 xl:translate-y-14"
        onClick={onClose}
      >
        <IoCloseCircleOutline />
      </button>
      <div className="relative flex h-[80vh] flex-col rounded-2xl border border-gray-500/50 bg-gray-900/10 backdrop-blur-[24px] md:h-[37.5rem]">
        {/* <div className="absolute inset-0 top-16 -z-10 aspect-square rounded-full bg-blue-400/25 blur-3xl filter"></div> */}
        <div
          className="mt-6 h-full w-full overflow-y-auto px-4"
          ref={scrollRef}
        >
          {messages.map((message, index) => (
            <ChatMessages key={index} message={message} />
          ))}

          {isLoading && isLastMessageByUser && (
            <div className="mb-3 flex w-full items-start justify-start text-gray-100">
              <div className="relative -ml-1 -mt-0.5 mr-1.5 w-[1.6rem] flex-none">
                <div className="absolute inset-0 bg-blue-500/50 blur-[8px] filter"></div>
                <Lottie
                  className="rounded-full"
                  animationData={Orb}
                  loop={true}
                />
              </div>
              <div
                className={cn(
                  "relative mr-7 flex items-center overflow-x-auto rounded-lg rounded-tl-none border border-blue-400/40 bg-black px-3 py-2 pr-10 text-start",
                )}
              >
                Thinking
                <div className="absolute right-2.5 top-0 mt-2.5 w-[1.5rem]">
                  <Lottie
                    className="rounded-full"
                    animationData={TypingAni}
                    loop={true}
                  />
                </div>
              </div>
            </div>
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
              <div className="relative mb-4 w-[7rem]">
                <div className="absolute inset-0 rounded-full bg-blue-500/50 blur-2xl filter"></div>
                <Lottie
                  className="rounded-full"
                  animationData={Orb}
                  loop={true}
                />
              </div>
              <p className="text-center text-white">
                <span className="text-xl font-semibold leading-relaxed">
                  GeekPie AI
                </span>{" "}
                <br />
                <span className="">How may I help you today?</span>
              </p>
              <div className="mt-7 flex items-stretch justify-center gap-3 text-start">
                <div
                  className="w-1/2 cursor-pointer rounded-xl border border-gray-500/50 p-3 transition-all duration-150 ease-in-out hover:bg-gray-400/15"
                  onClick={(event) => {
                    setInput("What are the services offered by GeekPie AI?");
                    setDemoPrompt(true);
                  }}
                >
                  <IoCogOutline className="mb-2 text-2xl text-yellow-400 md:text-xl" />
                  What are the services offered by GeekPie AI?
                </div>
                <div
                  className="w-1/2 cursor-pointer rounded-xl border border-gray-500/50 p-3 transition-all duration-150 ease-in-out hover:bg-gray-400/15"
                  onClick={(event) => {
                    setInput("Can you tell me more about GeekPie AI?");
                    setDemoPrompt(true);
                  }}
                >
                  <GoDependabot className="mb-2 text-2xl text-blue-400 md:text-xl" />
                  Can you tell me more about GeekPie AI?
                </div>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="m-3 mb-5 mt-0 flex gap-1 rounded-3xl border border-gray-100/80 bg-transparent px-2.5 py-3"
        >
          <button
            type="submit"
            className="flex flex-none items-center justify-center text-3xl text-red-500 disabled:text-gray-100/80 md:text-2xl"
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
            onKeyDown={(event) => {
              if (event.key === "Enter" && input) {
                event.preventDefault();
                handleSubmit(createMockFormEvent());
                if (inputRef && inputRef.current) {
                  inputRef.current.blur(); // This will close the virtual keyboard
                }
              }
            }}
          />
          <button
            type={isLoading ? "button" : "submit"}
            className="flex flex-none items-center justify-center text-3xl text-green-500 disabled:text-gray-100/80 md:text-2xl"
            title="Send message"
            disabled={!input && !isLoading}
            onClick={() => isLoading && stop()}
          >
            {!isLoading ? (
              <FaCircleArrowUp className="" />
            ) : (
              <FaCircleStop className="text-red-500" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

type MessageProps = {
  message: Message;
};

function ChatMessages({ message: { role, content, id } }: MessageProps) {
  const aiMessages = role === "assistant";
  const idStatus = id === "loading";

  return (
    <div
      className={cn(
        "mb-3 flex w-full items-start text-gray-100",
        aiMessages ? "justify-start" : "justify-end",
      )}
    >
      {aiMessages && (
        <div className="relative -ml-1 -mt-0.5 mr-1.5 w-[1.6rem] flex-none">
          <div className="absolute inset-0 bg-blue-500/50 blur-[8px] filter"></div>
          <Lottie className="rounded-full" animationData={Orb} loop={true} />
        </div>
      )}
      <div
        className={cn(
          "overflow-x-auto rounded-lg border bg-black px-3 py-2",
          aiMessages
            ? "mr-3 rounded-tl-none border-blue-400/40 text-start"
            : "ml-12 rounded-tr-none border-yellow-400/40 text-start",
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

export default AIChatBox;
