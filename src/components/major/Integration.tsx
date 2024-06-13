import { SiNextdotjs } from "react-icons/si";
import { SiVercel } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiAmazonaws } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiOpenai } from "react-icons/si";
import GeekPieIcon from "/images/icon.png";
import Bounded from "../minor/Bounded";
import StarBackground from "../minor/StarBackground";
import Image from "next/image";
import IconXAnimations from "../minor/IconXAnimations";

const icons = [
    {
        icon: SiVercel,
        type: "IconType",
    },
    {
        icon: SiAmazonaws,
        type: "IconType",
    },
    {
        icon: SiNextdotjs,
        type: "IconType",
    },
    {
        icon: '/images/icon.png',
        type: "Image",
    },
    {
        icon: SiReact,
        type: "IconType",
    },
    {
        icon: SiTypescript,
        type: "IconType",
    },
    {
        icon: SiOpenai,
        type: "IconType",
    },
];

const Integration = () => {
    return (
        <Bounded className="relative overflow-hidden text-center">
            <Image
                src={`/images/integration-background.jpg`}
                fill
                className="object-cover"
                alt=""
                quality={90}
            />
            <StarBackground />
            <div className="relative">
                <h1 className="text-balance text-center text-5xl font-medium md:text-7xl">
                    Integrations galore.
                </h1>
                <p className="mx-auto mt-6 max-w-md text-balance text-slate-300">
                    The integrations your team needs to be productive at scale with no
                    impact on your burn rate.
                </p>
                <IconXAnimations icons={icons} />
            </div>
        </Bounded>
    );
};

export default Integration;
