"use client";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import clsx from "clsx";

type StarGridProps = {
    viewBox?: string;
    className?: string;
    staggerFrom?: string;
};

export default function StarGrid({ viewBox = "0 0 935 425", staggerFrom = "center", className }: StarGridProps) {
    const container = useRef(null);
    gsap.registerPlugin(useGSAP);
    const prefersReducedMotion = usePrefersReducedMotion();
    const grid = [14, 30] as const;

    useGSAP(() => {
        if (prefersReducedMotion) {
            gsap.set(container.current, { opacity: 1 });
            gsap.set(".star-grid-item", {
                opacity: 0.2,
                scale: 1,
            });
            return;
        }

        gsap.set(".star-grid-item",
            {
                opacity: 0,
                transformOrigin: "center",
                color: "#fff",
            },
        )
        gsap.set(container.current, { opacity: 1 })

        const tl = gsap.timeline()

        // Entrance animation
        tl.to(".star-grid-item", {
            keyframes: [
                {
                    opacity: 0,
                    duration: 0
                },
                {
                    opacity: 0.4,
                    rotate: "+=180",
                    duration: 0.6,
                    scale: 3,
                    color: "#ffd057",
                    stagger: {
                        amount: 2,
                        grid: grid,
                        from: staggerFrom
                    }
                },
                {
                    opacity: 0.2,
                    rotate: "+=180",
                    duration: 0.6,
                    scale: 1,
                    color: "#fff",
                    delay: -2,
                    stagger: {
                        amount: 3,
                        grid: grid,
                        from: staggerFrom
                    }
                }
            ]
        })


        // Loop animation
        tl.to(".star-grid-item", {
            delay: 1,
            repeat: -1,
            repeatDelay: 1,
            keyframes: [
                {
                    opacity: 0.4,
                    rotate: "+=180",
                    duration: 0.6,
                    scale: 3,
                    color: "#ffd057",
                    stagger: {
                        amount: 2,
                        grid: grid,
                        from: staggerFrom
                    }
                },
                {
                    opacity: 0.2,
                    rotate: "+=180",
                    duration: 0.6,
                    scale: 1,
                    color: "#fff",
                    delay: -2,
                    stagger: {
                        amount: 3,
                        grid: grid,
                        from: staggerFrom
                    }
                }
            ]
        })


    }, { scope: container })

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox={viewBox}
            className={clsx(`absolute -top-14 -z-10`, className)}
            id="star-grid"
            ref={container}
            opacity={1}
            style={{
                maskImage: "linear-gradient(black, transparent)",
            }}
        >
            <g className="star-grid-group">
                {[...Array(grid[0])].map((_, i) => {
                    return [...Array(grid[1])].map((_, j) => {
                        return (
                            <path
                                key={i + j}
                                fill="currentColor"
                                opacity=".2"
                                className="star-grid-item"
                                d={`M${j * 32},${i * 32 + 10}a0.14,0.14,0,0,1,0.26,0l0.14,0.36a2.132,2.132,0,0,0,1.27,1.27l0.37,0.14a0.14,0.14,0,0,1,0,0.26l-0.37,0.14a2.132,2.132,0,0,0,-1.27,1.27l-0.14,0.37a0.14,0.14,0,0,1,-0.26,0l-0.14,-0.37a2.132,2.132,0,0,0,-1.27,-1.27l-0.36,-0.14a0.14,0.14,0,0,1,0,-0.26l0.37,-0.14a2.132,2.132,0,0,0,1.26,-1.27l0.14,-0.36z`}
                            />
                        );
                    });
                })}
            </g>
        </svg>
    );
}