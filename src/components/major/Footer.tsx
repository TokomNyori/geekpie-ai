import Link from "next/link";
import WordMark from "../svg-components/WordMark";
import LogoMark from "../minor/PlainLogo";
import {
  IoCallOutline,
  IoLogoInstagram,
  IoLogoWhatsapp,
  IoMailOutline,
} from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center gap-4 border-t border-slate-600 px-8 py-10 pb-32">
      <Link href={"/"} className="flex items-center justify-start gap-3">
        <LogoMark className="w-[2.35rem]" />
        <span className="text-3xl">
          GeekPie
          <sup className="ml-1 text-lg italic text-yellow-400">ai</sup>
        </span>
        <span className="sr-only">GeekPie Home Page</span>
      </Link>
      <nav aria-label="Footer">
        <ul className="flex gap-3">
          <li>
            <Link
              href="https://www.instagram.com/geekpie.in?igsh=MXUzbWhwbWM5cTNxdw=="
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center text-gray-400 hover:text-gray-100 hover:brightness-125"
            >
              <IoLogoInstagram className="mr-2 inline text-2xl" />
            </Link>
          </li>
          <li>
            <Link
              href={`https://wa.me/918837428457`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center text-gray-400 hover:text-gray-100 hover:brightness-125"
            >
              <IoLogoWhatsapp className="mr-2 inline text-2xl" />
            </Link>
          </li>
          <li>
            <Link
              href={`mailto:contact@xvariate.com`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center text-gray-400 hover:text-gray-100 hover:brightness-125"
            >
              <IoMailOutline className="mr-2 inline text-2xl" />
            </Link>
          </li>
          <li>
            <Link
              href="tel:+918837428457"
              rel="noreferrer"
              className="inline-flex min-h-11 cursor-pointer items-center text-gray-400 hover:text-gray-100 hover:brightness-125"
            >
              <IoCallOutline className="mr-2 inline text-[1.35rem]" />
            </Link>
          </li>
        </ul>
      </nav>
      <p className="text-sm text-neutral-400">
        A Side Project by Xvariate Software Company
      </p>
      <p className="text-sm text-neutral-400">
        Developed and maintained by &nbsp;
        <Link
          href="https://xvariate.com"
          className="text-neutral-50 transition-all duration-300 ease-in-out hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          Xvariate
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
