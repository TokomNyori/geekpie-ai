import Image from "next/image";
import Bounded from "../minor/Bounded";
import ButtonLink from "../minor/ButtonLink";
import clsx from "clsx";
import { PiGear } from "react-icons/pi";
import { PiArrowClockwise } from "react-icons/pi";

const Showcase = () => {
    return (
        <Bounded className="relative">
            <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/25 blur-3xl filter" />
            <h1 className="text-balance text-center text-4xl font-medium md:text-7xl">
                Your Geekpie. <br />
                Your workflow.
            </h1>
            <div className="mt-16 grid items-center rounded-xl border border-blue-50/20 bg-gradient-to-b 
                from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:py-12 gap-8 lg:gap-0">
                <div>
                    <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-3xl">
                        <PiGear className="" />
                    </div>
                    <h3 className="mt-6 text-2xl font-normal">
                    Disrupt the Competition.
                    </h3>
                    <p className="prose prose-invert mt-4 max-w-xl">
                    Disrupt the competitive landscape with GeekPie AI.
                    Integrate our advanced AI technologies to revolutionize your business approach, leaving 
                    competitors struggling to keep up. With GeekPie AI, you&apos;re not just competing; you&apos;re dominating.
                    Setting you apart as a leader.
                    </p>
                    <ButtonLink className="mt-6">
                        Get Started
                    </ButtonLink>
                </div>
                <Image
                    src="/images/showcase-image.png"
                    width={700}
                    height={700}
                    alt="showcase"
                    className={clsx(
                        `opacity-90 shadow-2xl lg:col-span-2 lg:pt-0`,
                        `lg:-order-1 lg:translate-x-[-15%]`,
                    )}
                />
            </div>
        </Bounded>
    );
};

export default Showcase;
