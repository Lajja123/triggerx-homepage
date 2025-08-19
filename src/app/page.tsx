// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[90%] mx-auto max-w-[1600px] overflow-hidden">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-20 pb-24">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-xs sm:text-sm text-white/70">
            <span className="inline-block size-1.5 rounded-full bg-emerald-300/80" />
            powered by eigenlayer
          </div>

          <div className="max-w-[780px]">
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-[-0.02em] text-white">
              Effortless Blockchain Automation,
              <br className="hidden sm:block" />
              <span className="text-white/90">Limitless Potential</span>
            </h1>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm sm:text-base font-semibold text-black bg-[#FBF197] hover:bg-[#f7e97b] transition-colors shadow-[0_8px_24px_rgba(251,241,151,0.16)]"
            >
              Start Building
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm sm:text-base font-medium text-white border border-white/20 hover:border-white/35 transition-colors"
            >
              Dev Hub
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[5/4] rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 60% 40%, rgba(255,255,255,0.10), rgba(255,255,255,0))" }} />
          </div>
        </div>
      </section>

      {/* What TriggerX Offers */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <section className="w-full mt-16 sm:mt-20 pb-16">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-white/60">What TriggerX Offers</div>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-white">
            Build, secure, and scale your on-chain automation
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Comprehensive Automation */}
          <article className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-6">
            <h3 className="text-white text-xl font-semibold leading-tight">
              Comprehensive<br className="hidden sm:block" /> Automation
            </h3>
            <ul className="mt-4 space-y-3 text-white/80 text-sm leading-relaxed">
              <li className="flex gap-3"><span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/40" /><span><span className="text-white">Time-Based Automation:</span> Schedule tasks at any interval or timestamp.</span></li>
              <li className="flex gap-3"><span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/40" /><span><span className="text-white">Event-Based Automation:</span> Trigger actions based on on-chain events.</span></li>
              <li className="flex gap-3"><span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/40" /><span><span className="text-white">Condition-Based Automation:</span> Automate responses when conditions are met.</span></li>
            </ul>
          </article>

          {/* Crypto-Economic Security */}
          <article className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-6">
            <h3 className="text-white text-xl font-semibold leading-tight">Crypto-Economic Security</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Relax, your automation tasks are in safe hands. TriggerX&#39;s integration with EigenLayer and its innovative AVS system ensures that keepers are incentivized to act honestly, protecting you from any malicious activity.
            </p>
          </article>

          {/* Scale Across Chains */}
          <article className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-6">
            <h3 className="text-white text-xl font-semibold leading-tight">Scale Across Chains</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              TriggerX&#39;s multi-chain architecture allows you to seamlessly scale to new networks. Integrate with emerging L2 chains and expand your automation capabilities as the Web3 landscape evolves.
            </p>
          </article>

          {/* Power of the Decentralized Network */}
          <article className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-6">
            <h3 className="text-white text-xl font-semibold leading-tight">Power of the Decentralized Network</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              TriggerX taps into a network of independent keepers, creating a robust and tamper-proof automation infrastructure for your Web3 projects.
            </p>
          </article>
        </div>
      </section>
      {/* Why TriggerX */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <section className="w-full mt-12 sm:mt-16 pb-14">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-white/60">Why TriggerX</div>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-white">
            Built for automation at Superchain scale
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* 1 */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-4">
            <h3 className="text-white text-lg font-medium">Automation Across the Superchain</h3>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">
              Automate tasks effortlessly across the rapidly growing Superchain ecosystem, from core protocols to the newest innovations within the network.
            </p>
          </div>
          {/* 2 */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-4">
            <h3 className="text-white text-lg font-medium">Own your Automation-Trigger tasks on your terms</h3>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">
              Schedule them, set conditions, or react to events in real-time.
            </p>
          </div>
          {/* 3 */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-4">
            <h3 className="text-white text-lg font-medium">Ironclad Security</h3>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">
              Powered by EigenLayer&#39;s cutting-edge AVS technology, to provide unparalleled security and tamper-proof reliability.
            </p>
          </div>
          {/* 4 */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-4">
            <h3 className="text-white text-lg font-medium">Decentralized Keeper Network</h3>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">
              Robust keeper network operates independently, ensuring resilience and censorship resistance for your mission-critical tasks.
            </p>
          </div>
          {/* 5 */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-4">
            <h3 className="text-white text-lg font-medium">Built to Grow With You</h3>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">
              Scale your automation effortlessly. Expand to new blockchains instantly with minimal configuration.
            </p>
          </div>
          {/* 6 */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-4">
            <h3 className="text-white text-lg font-medium">Aggregate with BLS</h3>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">
              Advanced BLS signature aggregation streamlines task execution, to maximize efficiency and minimize costs.
            </p>
          </div>
          {/* 7 */}
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors lg:col-span-12">
            <h3 className="text-white text-lg font-medium">Total Control, Total Visibility</h3>
            <p className="mt-2 text-white/75 text-sm leading-relaxed">
              Intuitive dashboards that provide complete control and real-time visibility into your automation tasks, keeper performance, and overall progress.
            </p>
          </div>
        </div>
      </section>

      {/* Who is TriggerX For? */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <section className="w-full mt-16 sm:mt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-[-0.02em] text-white">
              Who is
              <br className="hidden sm:block" />
              TriggerX For?
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Whether you&#39;re a dApp developer, DeFi protocol creator, or enterprise innovator, TriggerX empowers you to automate tasks with ease and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Use cases include */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <section className="w-full mt-12 sm:mt-16 pb-16">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-white">
            Use cases include
          </h2>
        </div>

        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <li className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors flex items-center gap-4">
            <span className="w-1.5 h-6 shrink-0 rounded-full bg-gradient-to-b from-white/60 to-white/20" />
            <span className="text-white text-base">Automated API calls</span>
          </li>
          <li className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors flex items-center gap-4">
            <span className="w-1.5 h-6 shrink-0 rounded-full bg-gradient-to-b from-white/60 to-white/20" />
            <span className="text-white text-base">Governance actions</span>
          </li>
          <li className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors flex items-center gap-4">
            <span className="w-1.5 h-6 shrink-0 rounded-full bg-gradient-to-b from-white/60 to-white/20" />
            <span className="text-white text-base">Liquidity management</span>
          </li>
          <li className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors flex items-center gap-4">
            <span className="w-1.5 h-6 shrink-0 rounded-full bg-gradient-to-b from-white/60 to-white/20" />
            <span className="text-white text-base">Token burns or mints</span>
          </li>
          <li className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.07] transition-colors flex items-center gap-4 md:col-span-2 lg:col-span-3">
            <span className="w-1.5 h-6 shrink-0 rounded-full bg-gradient-to-b from-white/60 to-white/20" />
            <span className="text-white text-base">User notifications and more!</span>
          </li>
        </ul>
      </section>
    </div>
  );
}