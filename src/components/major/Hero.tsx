import ButtonLink from "../minor/ButtonLink";
import Image from "next/image";
import Bounded from "../minor/Bounded";
import StarGrid from "../minor/StarGrid";

type HeroProps = {
    heading: string;
    paragraph: string;
    buttonText?: string;
    imageSrc?: string;
    alt?: string;
};

const Hero = ({ ...props }: HeroProps) => {
    return (
        <Bounded className="text-center">
            <div className="relative">
                <StarGrid />
                <h1 className="text-balance text-center text-5xl font-medium md:text-7xl">
                    {props.heading}
                </h1>
                <p className="mx-auto mt-6 max-w-md text-balance text-slate-300">
                    {props.paragraph}
                </p>
                <ButtonLink className="mt-8" children={`${props.buttonText}`} />
                <div className="glass-container mt-16 w-fit">
                    <div className="absolute inset-0 -z-10 bg-blue-500/30 blur-2xl filter" />
                    <Image
                        src={`${props.imageSrc}`}
                        className="rounded-lg"
                        width={1400}
                        height={1400}
                        alt={`${props.alt}`}
                    />
                </div>
            </div>
        </Bounded>
    );
};

export default Hero;
