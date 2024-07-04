import Image from "next/image";
import Bounded from "../minor/Bounded";
import ButtonLink from "../minor/ButtonLink";
import clsx from "clsx";
import { PiGear } from "react-icons/pi";
import TextPopOutAnimation from "../animations/TextPopOutAnimation";
import InputDrawer from "../modals/InputDrawer";

const Showcase = () => {
  return (
    <Bounded className="relative">
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/25 blur-3xl filter" />
      <TextPopOutAnimation>
        <h1 className="text-balance text-center text-4xl font-medium md:text-7xl">
          Your Geekpie. <br />
          Your workflow.
        </h1>
      </TextPopOutAnimation>
      <div className="mt-16 grid items-center gap-8 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 py-8 backdrop-blur-sm md:px-8 lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div className="px-6 md:px-0">
          <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-3xl">
            <PiGear className="" />
          </div>
          <h3 className="mt-6 text-2xl font-normal">
            Disrupt the Competition.
          </h3>
          <p className="prose prose-invert mt-4 max-w-xl">
            Disrupt the competitive landscape with GeekPie AI. Integrate our
            advanced AI technologies to revolutionize your business approach,
            leaving competitors struggling to keep up. With GeekPie AI,
            you&apos;re not just competing; you&apos;re dominating. Setting you
            apart as a leader.
          </p>
          <InputDrawer
            drawerTitle="Get Started"
            servicesOpt={{
              serviceOne: "Customer Service Chatbot",
              serviceTwo: "Chatbot UI Only",
              serviceThree: "AI-based Microservices",
            }}
          >
            <ButtonLink className="mt-6">Get Started</ButtonLink>
          </InputDrawer>
        </div>
        <div className="px-2 md:px-0 lg:-order-1 lg:translate-x-[-14.5%] lg:col-span-2 lg:pt-0 opacity-90 ">
          <Image
            src="/images/showcase-image1.png"
            width={700}
            height={700}
            alt="showcase"
            className={clsx(
              `shadow-2xl`,
              `rounded-lg border border-gray-50/15 `,
            )}
          />
        </div>
      </div>
    </Bounded>
  );
};

export default Showcase;
