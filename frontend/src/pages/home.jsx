import { Link } from "react-router-dom";
import { FaWater, FaMapMarkedAlt, FaShieldAlt, FaLeaf } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt />,
    title: "CPCB Standards",
    desc: "Accurate classification based on official water quality rules.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Government Data",
    desc: "Live data from 1500+ monitoring stations across India.",
  },
  {
    icon: <FaWater />,
    title: "Multiple Uses",
    desc: "Check suitability for drinking, irrigation, and more.",
  },
  {
    icon: <FaLeaf />,
    title: "AI Insights",
    desc: "Smart recommendations for safety and treatment.",
  },
];

function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-primary-50 to-white rounded-3xl shadow-md p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        
        {/* LEFT CONTENT */}
        <div className="flex-1">
          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            Dashboard
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Check Your River Water Quality Instantly
          </h1>

          <p className="text-gray-600 max-w-lg mb-6">
            Real-time data, AI insights, and CPCB-based classification to help you make safer water decisions.
          </p>

          <Link
            to="/check"
            className="inline-flex items-center gap-2 bg-primary-800 text-white font-medium px-8 py-3 rounded-full hover:bg-primary-900 transition-all shadow hover:shadow-lg"
          >
            Check Water Quality →
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1">
          <img
  src="https://images.unsplash.com/photo-1505765050516-f72dcac9c60f"
  alt="River"
  className="rounded-2xl shadow-md w-full object-cover h-[260px] md:h-[320px] hover:scale-105 transition duration-500"
/>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "1500+", label: "Monitoring Stations" },
          { value: "28", label: "States Covered" },
          { value: "Real-time", label: "Live Data" },
          { value: "AI", label: "Smart Insights" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 text-center shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold text-primary-800">{item.value}</h2>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* FEATURE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-800 text-lg">
              {f.icon}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EXTRA CTA */}
      <div className="bg-primary-800 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">
            Start analyzing your nearby river now
          </h3>
          <p className="text-sm text-primary-100">
            Get instant insights and safety recommendations
          </p>
        </div>

        <Link
          to="/check"
          className="bg-white text-primary-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}

export default Home;