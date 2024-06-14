import { SiNextdotjs } from "react-icons/si";
import { SiVercel } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiAmazonaws } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiOpenai } from "react-icons/si";
import { SiTensorflow } from "react-icons/si";
import GeekPieIcon from "/images/icon.png";
import Bounded from "../minor/Bounded";
import StarBackground from "../svg-components/StarBackground";
import Image from "next/image";
import IconXAnimations from "../animations/IconXAnimations";

const icons = [
    {
        icon: <SiVercel />,
        type: "IconType",
    },
    {
        icon: <SiTensorflow />,
        type: "IconType",
    },
    {
        icon: <SiNextdotjs />,
        type: "IconType",
    },
    {
        icon: '/images/icon.png',
        type: "Image",
    },
    {
        icon: <SiReact />,
        type: "IconType",
    },
    {
        icon: <SiAmazonaws />,
        type: "IconType",
    },
    {
        icon: <SiOpenai />,
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
                    Tech Integration.
                </h1>
                <p className="mx-auto mt-6 max-w-md text-balance text-slate-300">
                    Leveraging the latest technologies to craft innovative and effective
                    solutions tailored to your business needs.
                </p>
                <IconXAnimations icons={icons} />
            </div>
        </Bounded>
    );
};

export default Integration;
