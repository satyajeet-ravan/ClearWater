import { Link } from "react-router-dom";
import { FaWater, FaMapMarkedAlt, FaShieldAlt, FaLeaf } from "react-icons/fa";

const features = [
  { icon: <FaShieldAlt />, title: "E(P) Rules 1986", desc: "Classification based on official CPCB standards for water quality assessment." },
  { icon: <FaMapMarkedAlt />, title: "Government Data", desc: "Real monitoring data from 1,500+ CPCB stations across 28 states." },
  { icon: <FaWater />, title: "Multiple Uses", desc: "Check suitability for drinking, bathing, irrigation, wildlife, and industrial use." },
  { icon: <FaLeaf />, title: "AI Precautions", desc: "Get AI-powered health risks, treatment steps, and safety recommendations." },
];

function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
              Dashboard
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Know Your River Water Condition
            </h1>
            <p className="text-gray-500 max-w-lg">
              Check if your local river water is safe for your needs and discover
              NGOs working for the welfare of India's rivers.
            </p>
          </div>
          <Link
            to="/check"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-medium px-7 py-3 rounded-full hover:bg-emerald-700 transition-colors text-sm no-underline shrink-0"
          >
            Check Water Quality &rarr;
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 text-lg shrink-0">
              {f.icon}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
