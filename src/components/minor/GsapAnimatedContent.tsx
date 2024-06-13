'use client'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ButtonLink from "../minor/ButtonLink";
import Image from "next/image";
import StarGrid from "../minor/StarGrid";
import { HeroProps } from '../major/Hero';

type GsapAnimatedContentProps = {
    props: HeroProps
}

const GsapAnimatedContent = ({ props }: GsapAnimatedContentProps) => {

    const container = useRef(null);
    gsap.registerPlugin(useGSAP);

    useGSAP(() => {

    }, { scope: container })

    return (
        <div className="relative" ref={container}>
            <div className="relative h-full w-full overflow-x-clip">
                <StarGrid />
            </div>
            <h1 className="hero__heading text-balance text-center text-5xl font-medium md:text-7xl">
                {props.heading}
            </h1>
            <p className="hero__body mx-auto mt-6 max-w-md text-balance text-slate-300">
                {props.paragraph}
            </p>
            <ButtonLink className="hero__button mt-8">
                {props.buttonText}
            </ButtonLink>
            <div className="hero__image glass-container mt-16 w-fit">
                <div className="hero__glow absolute inset-0 -z-10 bg-blue-500/30 blur-2xl filter" />
                <Image
                    src={`${props.imageSrc}`}
                    className="rounded-lg hidden md:block"
                    width={1400}
                    height={1400}
                    alt={`${props.alt}`}
                />
                <Image
                    src={`${props.imageSrcMobile}`}
                    className="rounded-lg block md:hidden"
                    width={1400}
                    height={1400}
                    alt={`${props.alt}`}
                />
            </div>
        </div>
    )
}

export default GsapAnimatedContent