import React from "react";
import Bounded from "../minor/Bounded";
import LogoMark from "../minor/PlainLogo";
import ButtonLink from "../minor/ButtonLink";

const CallToAction = () => {
    return (
        <Bounded className="relative py-32 text-center font-medium md:py-40">
            <div className="glow absolute -z-10 aspect-square w-full max-w-sm rounded-full bg-blue-500/50 blur-[160px] filter"></div>
            <div className="glass-container from-slate-800 rounded-lg bg-gradient-to-b to-slate-900 p-4 md:rounded-xl">
                <LogoMark />
            </div>
            <h2 className="mt-8 max-w-xl text-5xl text-balance">AI-Powered Customer service for entreprenuers.</h2>
            <ButtonLink className="mt-6" >
                Start Now
            </ButtonLink>
        </Bounded>
    );
};

export default CallToAction;
