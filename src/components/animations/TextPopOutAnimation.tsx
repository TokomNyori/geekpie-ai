'use client'
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type TextPopOutAnimationProps = {
    children: React.ReactNode;
};

const TextPopOutAnimation = ({ children }: TextPopOutAnimationProps) => {
    const container = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    useGSAP(() => {
        if (prefersReducedMotion) {
            gsap.set(container.current, { y: 0 });
            return;
        }

        gsap.fromTo(
            container.current,
            { y: 100 },
            {
                y: 0,
                ease: "power2.inOut",
                duration: 1,
                scrollTrigger: {
                    trigger: container.current,
                    start: "top bottom-=40%",
                    toggleActions: "play pause resume reverse",
                }
            }
        )
    }, { scope: container })

    return (
        <div ref={container}>
            {children}
        </div>
    )
}

export default TextPopOutAnimation