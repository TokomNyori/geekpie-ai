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
        heading="Chatbots that radiate with dynamic intelligence."
        paragraph="AI-Powered Chatbots: Disrupt and Capture the Market, Propelling Your Business Forward."
        buttonText="Try Now!"
        imageSrc="/images/geekpieaihero.jpg"
        imageSrcMobile="/images/trialsm.jpg"
        alt="Hero Image"
      />
      <Features />
      <Showcase />
      <Integration />
      <CallToAction />
    </div>
  );
}
