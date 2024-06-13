import CallToAction from "@/components/major/CallToAction";
import Features from "@/components/major/Features";
import Hero from "@/components/major/Hero";
import Integration from "@/components/major/Integration";
import Showcase from "@/components/major/Showcase";
import Image from "next/image";


export default function Home() {
  return (
    <div className="w-full">
      <Hero
        heading="Designs that shine with dynamic intelligence."
        paragraph="The AI features you need to transport your business from the little leagues to the big time."
        buttonText="Download Now"
        imageSrc="/images/hero-image.png"
        alt="Hero Image"
      />
      <Features />
      <Showcase />
      <Integration />
      <CallToAction />
    </div>
  );
}
