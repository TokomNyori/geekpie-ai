import React from "react";
import { IconType } from "react-icons";
import StylizedLogoMark from "./StylizedLogoMark";
import clsx from "clsx";

type IconXAnimationsProps = {
    icons: {
        icon: IconType | string;
        type: string;
    }[];
};

const IconXAnimations = ({ icons }: IconXAnimationsProps) => {
    return (
        <div className="mt-20 flex flex-col items-center md:flex-row">
            {icons.map((Icon, index) => (
                <React.Fragment key={index}>
                    {index !== Math.floor(icons.length / 2) ? (
                        <>
                            <div className="pulsing-icon opacacity-40 flex aspect-square shrink-0 items-center justify-center rounded-full 
                            border border-blue-50/30 bg-blue-50/25 p-4 text-3xl text-blue-100 md:text-4xl lg:text-5xl"
                            >
                                <Icon.icon />
                            </div>
                            {
                                index !== icons.length - 1 && (
                                    <div className={
                                        clsx(`signal-line bg-transparent-to-t rotate-180`,
                                            index >= Math.floor(icons.length / 2) ? `rotate-180` : `rotate-0`
                                        )
                                    }
                                    />
                                )
                            }
                        </>
                    ) : (
                        <>
                            <StylizedLogoMark />
                            <div className="signal-line bg-transparent-to-t rotate-180" />
                        </>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default IconXAnimations;
