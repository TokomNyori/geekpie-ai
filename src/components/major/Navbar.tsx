"use client";
import Link from "next/link";
import ButtonLink from "../minor/ButtonLink";
import LogoMark from "../minor/PlainLogo";
import { MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import InputDrawer from "../modals/InputDrawer";
import { scrollToSection } from "@/helpers/helperFun";
import { setTimeout } from "timers";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function combineSetOpenNSectionScroll() {
    setOpen(false);
    setTimeout(() => {
      scrollToSection("features");
    }, 500);
  }

  return (
    <nav aria-label="Main" className="p-4 md:p-4">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className="z-50 flex items-center justify-start gap-3"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="w-[2.35rem]" />
            <span className="text-3xl">
              GeekPie
              <sup className="ml-1 text-lg italic text-yellow-400">ai</sup>
            </span>
            <span className="sr-only">GeekPie Home Page</span>
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={clsx(
            `fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden`,
            open ? `translate-x-0` : `translate-x-[100%]`,
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-6 mb-4 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            <Link
              href={`#features`}
              className="block px-3 text-3xl first:mt-10"
              onClick={combineSetOpenNSectionScroll}
            >
              Features
            </Link>
            <InputDrawer
              drawerTitle="Get Started"
              servicesOpt={{
                serviceOne: "Customer Service Chatbot",
                serviceTwo: "Chatbot UI Only",
                serviceThree: "AI-based Microservices",
              }}
            >
              <ButtonLink onClick={() => setOpen(false)}>
                Get Started
              </ButtonLink>
            </InputDrawer>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden gap-6 md:flex">
          <li>
            <Link
              href={`#features`}
              onClick={() => scrollToSection("features")}
              className="inline-flex min-h-11 items-center"
            >
              Features
            </Link>
          </li>
          <li>
            <InputDrawer
              drawerTitle="Get Started"
              servicesOpt={{
                serviceOne: "Customer Service Chatbot",
                serviceTwo: "Chatbot UI Only",
                serviceThree: "AI-based Microservices",
              }}
            >
              <ButtonLink>Get Started</ButtonLink>
            </InputDrawer>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
