"use client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { IconType } from "react-icons";
import StylizedLogoMark from "../svg-components/StylizedLogoMark";
import clsx from "clsx";

type IconXAnimationsProps = {
  icons: {
    icon: React.ReactNode | string;
    type: string;
  }[];
};

const IconXAnimations = ({ icons }: IconXAnimationsProps) => {
  const container = useRef(null);
  gsap.registerPlugin(useGSAP, ScrollTrigger);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: {
          ease: "power2.inOut",
        },
      });

      tl.to(".pulsing-logo", {
        keyframes: [
          {
            filter: "brightness(2)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(1)",
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      });

      tl.to(
        ".signal-line",
        {
          keyframes: [
            {
              backgroundPosition: "0% 0%",
            },
            {
              backgroundPosition: "100% 100%",
              duration: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
            },
          ],
        },
        "-=1.4",
      );

      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              opacity: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
            },
          ],
        },
        "-=2",
      );
    },
    { scope: container },
  );

  return (
    <div
      className="mt-20 flex flex-col items-center md:flex-row"
      ref={container}
    >
      {icons.map((Icon, index) => (
        <React.Fragment key={index}>
          {index === Math.floor(icons.length / 2) ? (
            <>
              <StylizedLogoMark />
              <div className="signal-line bg-transparent-to-t rotate-180" />
            </>
          ) : (
            <>
              <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50/30 bg-blue-50/25 p-4 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
                {Icon.icon}
              </div>
              {index !== icons.length - 1 && (
                <div
                  className={clsx(
                    `signal-line`,
                    index >= Math.floor(icons.length / 2)
                      ? `rotate-180`
                      : `rotate-0`,
                  )}
                />
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default IconXAnimations;
