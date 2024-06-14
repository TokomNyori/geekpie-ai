import Link from "next/link"
import WordMark from "../minor/WordMark"
import LogoMark from "../minor/PlainLogo"

const Footer = () => {
    return (
        <footer className='flex flex-col items-center justify-between gap-6 border-t border-slate-600 px-8 py-7 md:flex-row'>
            <Link href={"/"} className="flex items-center justify-start gap-3">
                <LogoMark className="w-[2.35rem]" />
                <span className="text-3xl">
                    GeekPie
                    <sup className="ml-1 text-lg italic text-yellow-400">ai</sup>
                </span>
                <span className="sr-only">GeekPie Home Page</span>
            </Link>
            <nav aria-label="Footer">
                <ul className="flex gap-6">
                    <li>
                        <Link href={`#`} className="inline-flex min-h-11 items-center">Features</Link>
                    </li>
                    <li>
                        <Link href={`#`} className="inline-flex min-h-11 items-center">Get Started</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default Footer