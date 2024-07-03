"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ButtonLink from "../minor/ButtonLink";
import Image from "next/image";
import { HeroProps } from "../major/Hero";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import StarGrid from "../svg-components/StarGrid";
import ChatBoxTrigger from "../minor/ChatBoxTrigger";
import MoveBot from "../minor/MoveBot";

type GsapAnimatedContentProps = {
  props: HeroProps;
};

const GsapAnimatedContent = ({ props }: GsapAnimatedContentProps) => {
  const container = useRef(null);
  gsap.registerPlugin(useGSAP);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set(
          ".hero__heading, .hero__body, .hero__button, .hero__image, .hero__glow",
          { opacity: 1 },
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      // targeting the hero__heading
      tl.fromTo(
        ".hero__heading",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.4 },
      );

      // targeting the hero__body
      tl.fromTo(
        ".hero__body",
        { y: 20 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.7",
      );

      // targeting the hero__button
      tl.fromTo(
        ".hero__button",
        { scale: 1.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.8",
      );

      // targeting the hero__image
      tl.fromTo(
        ".hero__image",
        { y: 100 },
        { y: 0, opacity: 1, duration: 1.3 },
      );

      // targeting the hero__glow
      tl.fromTo(
        ".hero__glow",
        { scale: 0.5 },
        { scale: 1, opacity: 1, duration: 1.3 },
        "-=0.7",
      );

      // targeting the hero__heading
      tl.fromTo(
        ".fixed_bot",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
      );
    },
    { scope: container },
  );

  return (
    <div className="relative" ref={container}>
      <StarGrid className="hidden md:block" />
      <StarGrid
        viewBox="150 0 405 450"
        staggerFrom="end"
        className="block md:hidden"
      />

      <h1 className="hero__heading text-balance text-center text-5xl font-medium opacity-0 md:text-7xl">
        {props.heading}
      </h1>
      <p className="hero__body mx-auto mt-6 max-w-md text-balance text-slate-300 opacity-0">
        {props.paragraph}
      </p>
      <ChatBoxTrigger
        buttonText={`${props.buttonText}`}
        className="hero__button mt-8 opacity-0"
      />
      <div className="hero__image glass-container mt-16 w-fit opacity-0">
        <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 opacity-0 blur-2xl filter" />
        <Image
          src={`${props.imageSrc}`}
          className="hidden rounded-lg md:block"
          width={1400}
          height={1400}
          alt={`${props.alt}`}
        />
        <Image
          src={`${props.imageSrcMobile}`}
          className="block rounded-lg md:hidden"
          width={1400}
          height={1400}
          alt={`${props.alt}`}
        />
      </div>
      <MoveBot />
    </div>
  );
};

export default GsapAnimatedContent;
