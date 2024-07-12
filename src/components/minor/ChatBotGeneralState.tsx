import { cn } from "@/lib/utils";
import Lottie from "lottie-react";

type ChatBotGeneralStateProps = {
  textMessage: string;
  lottieJsonOrb: any;
  lottieJsonOptional?: any;
};

const ChatBotGeneralState = ({
  textMessage,
  lottieJsonOrb,
  lottieJsonOptional,
}: ChatBotGeneralStateProps) => {
  return (
    <div className="mb-4 flex w-full items-start justify-start text-gray-100">
      <div className="-ml-0.5 -mt-0.5 mr-1.5 w-[1.8rem] flex-none">
        {/* <div className="absolute inset-0 bg-blue-500/50 blur-[8px] filter"></div> */}
        <Lottie
          className="rounded-full"
          animationData={lottieJsonOrb}
          loop={true}
        />
      </div>
      <div
        className={cn(
          "relative mr-7 flex items-center overflow-x-auto rounded-lg rounded-tl-none border-none bg-zinc-900 px-3 py-3 pr-10 text-start",
        )}
      >
        {textMessage}
        <div className="absolute right-2.5 top-0 mt-3.5 w-[1.5rem]">
          <Lottie
            className="rounded-full"
            animationData={lottieJsonOptional}
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBotGeneralState;
