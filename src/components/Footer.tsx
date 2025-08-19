import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="w-[90%] mx-auto max-w-[1600px] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Get Started */}
          <div>
            <h3 className="text-white text-xl font-semibold">Get Started Today</h3>
            <div className="mt-4 space-y-2 text-white/75 text-sm">
              <div>Speak to Us</div>
              <a href="mailto:hello@triggerx.network" className="hover:text-white transition-colors">hello@triggerx.network</a>
            </div>
            <div className="mt-6">
              <Link href="#" className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-black bg-[#FBF197] hover:bg-[#f7e97b] transition-colors">Dev Hub</Link>
            </div>
          </div>

          {/* Column 2: Connect */}
          <div>
            <h3 className="text-white text-xl font-semibold">Connect</h3>
            <div className="mt-4 space-y-2 text-white/75 text-sm">
              <div>Follow us on X</div>
              <div>Discover</div>
            </div>
            <ul className="mt-4 space-y-2 text-white/80 text-sm">
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TriggerX on GitHub</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TriggerX on Twitter</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TriggerX on Telegram</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TriggerX on GitBook</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TriggerX on Mirror</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TriggerX on Medium</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TriggerX on YouTube</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold">Status</h3>
            <ul className="mt-4 space-y-2 text-white/80 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Build</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Docs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Dev Hub</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Join As Keeper</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Term of Use</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Credits */}
          <div className="flex flex-col justify-between">
            <div className="text-white/70 text-sm">© 2025 TriggerX. All rights reserved.</div>
            <div className="mt-6 text-white/80 text-sm">
              <div>Build with ❤️ by</div>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-90">Lampros Tech</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


