"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Grid Background Overlay */}
      <div data-animate="background" className="absolute  z-0 opacity-20">
        <div
          className="w-full h-full grid-pattern"
          style={{
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Hero Section - MetaMask Style */}
      <section
        data-section="hero"
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 z-10"
      >
        {/* Main Headline */}
        <div data-animate="headline" className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight tracking-tight">
            <span className="block">Effortless Blockchain Automation</span>
            <span className="block">.Limitless Potential.</span>
          </h1>
        </div>

        {/* CTA Button */}
        <div data-animate="cta">
          <Link
            href="#"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            VIEW TRIGGERX WEB
          </Link>
        </div>
      </section>

      {/* Geometric Shapes at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-10">
        <div className="relative w-full h-full">
          {/* Purple Triangle */}
          <div
            data-animate="shapes"
            className="absolute bottom-0 left-1/4 w-0 h-0 border-l-[50px] border-r-[50px] border-b-[80px] border-l-transparent border-r-transparent border-b-purple-500"
          ></div>

          {/* Dark Purple Rectangle */}
          <div
            data-animate="shapes"
            className="absolute bottom-0 left-1/3 w-20 h-16 bg-purple-600 transform rotate-12"
          ></div>

          {/* Purple Square */}
          <div
            data-animate="shapes"
            className="absolute bottom-0 right-1/3 w-16 h-16 bg-purple-500 transform -rotate-12"
          ></div>

          {/* Dark Purple Triangle */}
          <div
            data-animate="shapes"
            className="absolute bottom-0 right-1/4 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[60px] border-l-transparent border-r-transparent border-b-purple-700"
          ></div>

          {/* Small Purple Circle */}
          <div
            data-animate="shapes"
            className="absolute bottom-4 left-1/2 w-8 h-8 bg-purple-400 rounded-full"
          ></div>
        </div>
      </div>

      {/* Side Elements */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
        {/* Exclamation Icon */}
        <div
          data-animate="side-elements"
          className="w-8 h-8 bg-[var(--text-primary)] rounded-full flex items-center justify-center"
        >
          <span className="text-[var(--bg-primary)] text-sm font-bold">!</span>
        </div>

        {/* Dots */}
        <div className="flex flex-col space-y-1">
          <div
            data-animate="side-elements"
            className="w-2 h-2 bg-[var(--text-primary)] rounded-full"
          ></div>
          <div
            data-animate="side-elements"
            className="w-2 h-2 bg-[var(--text-primary)] rounded-full"
          ></div>
          <div
            data-animate="side-elements"
            className="w-2 h-2 bg-[var(--text-primary)] rounded-full"
          ></div>
        </div>
      </div>

      {/* Additional sections for scroll testing */}
      <section
        data-section="content"
        className="min-h-screen bg-gradient-to-b from-transparent to-purple-900/20 flex items-center justify-center"
      >
        <div className="text-center">
          <h2
            data-animate="title"
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Scroll Down to Explore
          </h2>
          <p
            data-animate="description"
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Experience the power of blockchain automation with TriggerX
          </p>
        </div>
      </section>

      <section
        data-section="content"
        className="min-h-screen bg-gradient-to-b from-purple-900/20 to-blue-900/20 flex items-center justify-center"
      >
        <div className="text-center">
          <h2
            data-animate="title"
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Features Section
          </h2>
          <p
            data-animate="description"
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Discover what makes TriggerX the ultimate blockchain automation
            platform
          </p>

          {/* Feature items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div
              data-animate="content-item"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Smart Automation
              </h3>
              <p className="text-gray-300">
                Automate complex blockchain workflows with ease
              </p>
            </div>
            <div
              data-animate="content-item"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Real-time Monitoring
              </h3>
              <p className="text-gray-300">
                Track your automation performance in real-time
              </p>
            </div>
            <div
              data-animate="content-item"
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Multi-chain Support
              </h3>
              <p className="text-gray-300">
                Work across multiple blockchain networks seamlessly
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        data-section="content"
        className="min-h-screen bg-gradient-to-b from-blue-900/20 to-transparent flex items-center justify-center"
      >
        <div className="text-center">
          <h2
            data-animate="title"
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            Get Started Today
          </h2>
          <p
            data-animate="description"
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Join thousands of users who trust TriggerX for their blockchain
            needs
          </p>
          <div data-animate="content-item">
            <Link
              href="#"
              className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Floating decorative elements */}
      <div
        data-animate="float"
        className="absolute top-1/4 left-10 w-4 h-4 bg-purple-400 rounded-full opacity-60"
      ></div>
      <div
        data-animate="float"
        className="absolute top-3/4 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-40"
      ></div>
      <div
        data-animate="float"
        className="absolute top-1/2 left-1/4 w-3 h-3 bg-purple-300 rounded-full opacity-50"
      ></div>
    </div>
  );
}
