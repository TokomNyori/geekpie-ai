import React from "react";
import Bounded from "../minor/Bounded";
import LogoMark from "../minor/PlainLogo";
import ButtonLink from "../minor/ButtonLink";
import InputDrawer from "../modals/InputDrawer";

const CallToAction = () => {
  return (
    <Bounded className="relative py-32 text-center font-medium md:py-40">
      <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter"></div>
      <div className="glass-container rounded-lg bg-gradient-to-b from-slate-800 to-slate-900 p-4 md:rounded-xl">
        <LogoMark />
      </div>
      <h2 className="mt-8 max-w-xl text-balance text-5xl">
        AI-Powered Customer service for entreprenuers.
      </h2>
      <InputDrawer
        drawerTitle="Get Started"
        servicesOpt={{
          serviceOne: "Customer Service Chatbot",
          serviceTwo: "Chatbot UI Only",
          serviceThree: "AI-based Microservices",
        }}
      >
        <ButtonLink className="mt-6">Start Now</ButtonLink>
      </InputDrawer>
    </Bounded>
  );
};

export default CallToAction;
