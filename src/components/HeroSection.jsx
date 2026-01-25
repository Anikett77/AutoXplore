import Navbar from "../components/Navbar";
import Hero from "../assets/hero.png";

function HeroSection() {
  const handleScrollToFleet = () => {
    const fleetSection = document.getElementById("fleet");
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative mt-20 h-[calc(100vh-1rem)] w-full flex items-center justify-center bg-black pt-32">
      {/* Background Car */}
      <img
        src={Hero}
        alt="Hero"
        className="absolute transition-transform duration-200 filter brightness-50"
      />

      {/* Neon Lines */}
      <div className="absolute w-[90%] h-[50%] border-t-2 border-purple-500 rounded-full blur-md animate-pulse"></div>
      <div className="absolute w-[95%] h-[50%] border-t-2 border-purple-400 rounded-full blur-md animate-pulse delay-150"></div>
      <div className="absolute w-[100%] h-[50%] border-t-2 border-purple-300 rounded-full blur-md animate-pulse delay-300"></div>

      {/* Center Functional Box */}
      <div className="relative z-10 bg-black/10 backdrop-blur-md p-5 rounded-2xl shadow-lg text-white max-w-2xl flex items-center justify-between -mt-65">
        {/* Left Side - Text */}
        <div className="text-left mr-5">
          <h2 className="text-xs text-blue-400 uppercase tracking-widest">
            Autoxplore
          </h2>
          <h1 className="text-md font-bold mt-2">
            Next-gen fleet. Instant drive.
          </h1>
          <p className="mt-2 text-gray-300">
            Rent your dream car. Transparent pricing. Book in seconds.
          </p>
        </div>

        {/* Right Side - Button */}
        <button
          onClick={handleScrollToFleet}
          className="px-5 py-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-lg hover:scale-105 transition"
        >
          See Fleet
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
