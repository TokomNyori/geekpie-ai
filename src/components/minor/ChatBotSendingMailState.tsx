import { cn } from "@/lib/utils";
import Lottie from "lottie-react";

type ChatBotSendingMailStateProps = {
  lottieJson1: any;
  lottieJson2?: any;
};

const ChatBotSendingMailState = ({
  lottieJson1,
  lottieJson2,
}: ChatBotSendingMailStateProps) => {
  return (
    <div className="mb-4 flex w-full items-start justify-start text-gray-100">
      <div className="-ml-0.5 -mt-0.5 mr-1.5 w-[1.8rem] flex-none">
        {/* <div className="absolute inset-0 bg-blue-500/50 blur-[8px] filter"></div> */}
        <Lottie
          className="rounded-full"
          animationData={lottieJson1}
          loop={true}
        />
      </div>
      <div
        className={cn(
          "relative mr-7 flex items-center overflow-x-auto rounded-lg rounded-tl-none border-none bg-zinc-900 px-3 py-3 pr-12 text-start",
        )}
      >
        Scheduling meeting
        <div className="absolute right-2.5 top-0 mt-3 w-[1.5rem]">
          <Lottie
            className="rounded-full"
            animationData={lottieJson2}
            loop={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBotSendingMailState;
