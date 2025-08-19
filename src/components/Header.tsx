import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.svg";

export default function Header() {
  return (
    <header className="w-[90%] mx-auto max-w-[1600px] bg-black rounded-lg my-6 py-8 px-8 flex items-center justify-between">
      <Link href="/" className="w-[200px] h-max">
        <Image
          src={Logo}
          alt="TriggerX"
          width={182}
          height={21}
          priority
          className="w-full"
        />
      </Link>
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-12 text-lg text-white">
          <Link href="#" className="hover:text-white transition-colors">
            Dev Hub
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Leaderboard
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Join as Keeper
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Contact Us
          </Link>
        </nav>

        <div className="">
          <Link
            href="#"
            className="rounded-lg px-5 py-3 text-nowrap text-black bg-yellow-300 hover:bg-white/90 active:bg-white/80 transition-colors shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_6px_20px_rgba(255,255,255,0.08)]"
          >
            Start Building
          </Link>
        </div>
      </div>
    </header>
  );
}
