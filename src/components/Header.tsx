import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/Logo.svg";

export default function Header() {
  return (
    <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between opacity-0 animate-hero-fade-in delay-1500">
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <Image
            src="/letters/t.png"
            alt="T"
            width={24}
            height={24}
            className="animate-fade-in"
          />
          <Image
            src="/letters/r.png"
            alt="R"
            width={24}
            height={24}
            className="animate-fade-in delay-100"
          />
          <Image
            src="/letters/i.png"
            alt="I"
            width={24}
            height={24}
            className="animate-fade-in delay-200"
          />
          <Image
            src="/letters/g.png"
            alt="G"
            width={24}
            height={24}
            className="animate-fade-in delay-300"
          />
          <Image
            src="/letters/g.png"
            alt="G"
            width={24}
            height={24}
            className="animate-fade-in delay-400"
          />
          <Image
            src="/letters/e.png"
            alt="E"
            width={24}
            height={24}
            className="animate-fade-in delay-500"
          />
          <Image
            src="/letters/r.png"
            alt="R"
            width={24}
            height={24}
            className="animate-fade-in delay-600"
          />
          <Image
            src="/letters/x.png"
            alt="X"
            width={24}
            height={24}
            className="animate-fade-in delay-700"
          />
        </div>
      </Link>

      <div className="flex items-center gap-8">
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]">
          <Link
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Developer
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Automation
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-colors text-sm"
          >
            VIEW TRIGGERX WEB
          </Link>
        </div>
      </div>
    </header>
  );
}
