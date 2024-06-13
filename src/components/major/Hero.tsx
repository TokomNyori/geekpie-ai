import Bounded from "../minor/Bounded";
import GsapAnimatedContent from "../minor/GsapAnimatedContent";

export type HeroProps = {
    heading: string;
    paragraph: string;
    buttonText?: string;
    imageSrc?: string;
    imageSrcMobile?: string;
    alt?: string;
};

const Hero = ({ ...props }: HeroProps) => {
    return (
        <Bounded className="text-center">
            <GsapAnimatedContent props={props} />
        </Bounded>
    );
};

export default Hero;
