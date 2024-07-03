"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/libs/utils";
import { useChat, Message } from "ai/react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { LuMinusCircle } from "react-icons/lu";
import Lottie from "lottie-react";
import Orb from "@/assets/jsons/orb1.json";
import TypingAni from "@/assets/jsons/typing.json";
import { IoCogOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { createMockFormEvent, createMockMouseEvent } from "@/fakers/fakers";
import ChatMessages from "../minor/ChatMessages";
import { isInputEmpty } from "@/helpers/isInputEmptyORwhiteSpace";
import { HeroProps } from "./Hero";

type AIChatBoxProps = {
  open: boolean;
  onClose: () => void;
};

const noScroll = `
    .no-scroll {
        overflow: hidden;
    }
`;

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
    api: "/api/langai",
  });

  const [isMobileView, setIsMobileView] = useState<Boolean>();
  const [demoPrompt, setDemoPrompt] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const aiChatBoxRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = noScroll;
    document.head.appendChild(style);

    if (open) {
      // Add no-scroll class to body to prevent scrolling
      document.body.classList.add("no-scroll");
    } else {
      // Remove no-scroll class from body
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
      document.head.removeChild(style);
    };
  }, [open]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const width = window.innerWidth;
    //console.log(height)
    if (width < 641) {
      setIsMobileView(true);
      console.log(`First Window width: ${width}, Mobile view: ${width < 641}`);
    } else {
      setIsMobileView(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    function handleResize() {
      const width = window.innerWidth;
      if (width < 641) {
        setIsMobileView(true);
        console.log(`Window width: ${width}, Mobile view: ${width < 641}`);
      } else {
        setIsMobileView(false);
      }
    }
    // Add the event listener
    window.addEventListener("resize", handleResize);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const container = useRef(null);
  gsap.registerPlugin(useGSAP);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      if (open && !isClosing) {
        tl.fromTo(
          ".geekpie_bot",
          { y: 600, opacity: 1 },
          { y: 0, opacity: 1, duration: 1.3 },
        );

        tl.fromTo(
          ".geekpie_button",
          { scale: 0 },
          { scale: 1, opacity: 1, duration: 0.5 },
        );
      } else if (isClosing) {
        tl.fromTo(
          ".geekpie_button",
          { scale: 1 },
          { scale: 0, opacity: 0, duration: 0.3 },
        );

        tl.fromTo(
          ".geekpie_bot",
          { y: 0 },
          {
            y: 620,
            duration: 1.3,
            onComplete: () => {
              onClose();
              setIsClosing(false);
            },
          },
        );
      }
    },
    { scope: container, dependencies: [open, isClosing] },
  );

  function handleIsclosing() {
    setIsClosing(true);
  }

  const isLastMessageByUser = messages[messages.length - 1]?.role === "user";

  console.log(messages);
  console.log(input);

  return (
    <div
      ref={container}
      className={cn(
        "bottom-0 right-0 z-50 flex h-full w-full items-end justify-end backdrop-blur-sm",
        open ? "fixed" : "hidden",
      )}
    >
      <div
        className={cn(
          "geekpie_bot w-full pb-0.5 md:max-w-[38.25rem] md:p-1 lg:max-w-[34.25rem] xl:-translate-x-40",
        )}
      >
        <button
          className="geekpie_button mb-2 mr-1 ms-auto block rounded-full text-[2.7rem] backdrop-blur-[12px] transition-colors duration-300 ease-in-out hover:text-red-500 xl:mb-0 xl:mr-0 xl:translate-x-12 xl:translate-y-12"
          onClick={handleIsclosing}
        >
          <LuMinusCircle />
        </button>
        <div className="relative flex h-[80vh] flex-col rounded-2xl border border-gray-500/50 bg-black backdrop-blur-[24px] md:h-[45.5rem] lg:h-[37.5rem]">
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
                <div className="-ml-0.5 -mt-0.5 mr-1.5 w-[1.8rem] flex-none">
                  {/* <div className="absolute inset-0 bg-blue-500/50 blur-[8px] filter"></div> */}
                  <Lottie
                    className="rounded-full"
                    animationData={Orb}
                    loop={true}
                  />
                </div>
                <div
                  className={cn(
                    "relative mr-7 flex items-center overflow-x-auto rounded-lg rounded-tl-none border-none bg-zinc-900 px-3 py-2 pr-10 text-start",
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
                  <div className="absolute inset-0 -z-10 rounded-full bg-blue-500/50 blur-2xl filter"></div>
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
                    <IoCogOutline className="mb-2 text-[1.75rem] text-yellow-400 md:text-[1.4rem]" />
                    What are the services offered by GeekPie AI?
                  </div>
                  <div
                    className="w-1/2 cursor-pointer rounded-xl border border-gray-500/50 p-3 transition-all duration-150 ease-in-out hover:bg-gray-400/15"
                    onClick={(event) => {
                      setInput(
                        "Can you arrange a meeting with the GeekPie team?",
                      );
                      setDemoPrompt(true);
                    }}
                  >
                    <IoCalendarOutline className="mb-2 text-[1.5rem] text-blue-400 md:text-[1.25rem]" />
                    Can you arrange a meeting with the GeekPie team?
                  </div>
                </div>
              </div>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className="m-3 mb-5 mt-0 flex gap-1 rounded-3xl border border-gray-400/70 bg-transparent px-2.5 py-3"
          >
            <button
              type="button"
              className="flex flex-none items-center justify-center text-3xl disabled:opacity-50 md:text-2xl"
              title="Clear Chat"
              disabled={messages.length === 0 || isLoading}
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
                if (
                  event.key === "Enter" &&
                  !isInputEmpty(input) &&
                  !isMobileView
                ) {
                  event.preventDefault();
                  handleSubmit(createMockFormEvent());
                  // if (inputRef && inputRef.current && isMobileView) {
                  //   inputRef.current.blur(); // This will close the virtual keyboard
                  // }
                } else if (
                  event.key === "Enter" &&
                  !isInputEmpty(input) &&
                  isMobileView
                ) {
                  event.preventDefault();
                }
              }}
            />
            <button
              type={isLoading ? "button" : "submit"}
              className="flex flex-none items-center justify-center text-3xl disabled:opacity-50 md:text-2xl"
              title="Send message"
              disabled={isInputEmpty(input) && !isLoading}
              onClick={() => isLoading && stop()}
            >
              {!isLoading ? (
                <FaCircleArrowUp className="" />
              ) : (
                <FaCircleStop className="" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatBox;
