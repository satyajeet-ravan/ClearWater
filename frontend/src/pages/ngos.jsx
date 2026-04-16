import efi1 from "../assets/efi-1.jpeg";
import efi2 from "../assets/efi-2.jpeg";
import tbs1 from "../assets/tbs-1.jpeg";
import tbs2 from "../assets/tbs-2.jpeg";
import iwf1 from "../assets/iwf-1.jpeg";
import iwf2 from "../assets/iwf-2.jpeg";
import wateraid1 from "../assets/wateraid-1.jpeg";
import wateraid2 from "../assets/wateraid-2.jpeg";

const ngosData = [
  {
    id: 1,
    name: "Environmentalist Foundation of India (EFI)",
    type: "Non-profit environmental organization",
    founded: "2007",
    location: "Chennai, India",
    mission:
      "To restore and conserve India's degraded water bodies (lakes, rivers, wetlands) through scientific and community-driven approaches.",
    activities: [
      "Lake and river restoration projects",
      "Biodiversity conservation",
      "Volunteer-driven cleanup drives",
      "Environmental awareness campaigns",
    ],
    impact: [
      "Restored 40+ water bodies across India",
      "Thousands of volunteers engaged",
      "Improved local ecosystems and groundwater levels",
    ],
    credibility: [
      "Strong on-ground execution",
      "Visible before-after transformation",
      "Consistent long-term projects",
    ],
    credibilityLabel: "Why They're Credible",
    images: [efi1, efi2],
    website: "https://indiaenvironment.org",
  },
  {
    id: 2,
    name: "Tarun Bharat Sangh (TBS)",
    type: "Community-based water conservation organization",
    founded: "1975",
    location: "Rajasthan, India",
    founder: "Rajendra Singh",
    mission:
      "To revive rivers and ensure water security using traditional water conservation techniques.",
    activities: [
      "Construction of Johads (traditional water structures)",
      "River rejuvenation projects",
      "Community mobilization",
      "Water literacy programs",
    ],
    impact: [
      "Revived 10+ rivers",
      "Transformed drought-prone regions into water-secure zones",
      "Empowered rural communities",
    ],
    credibility: [
      "Proven large-scale environmental impact",
      "Community-led sustainable model",
      "Recognized globally",
    ],
    credibilityLabel: "Why They're Credible",
    images: [tbs1, tbs2],
    website: "https://tarunbharatsangh.in/",
  },
  {
    id: 3,
    name: "India Water Foundation",
    type: "Policy & awareness organization",
    founded: "2008",
    location: "India",
    mission:
      "To promote sustainable water management through awareness, policy advocacy, and research.",
    activities: [
      "Organizing conferences & seminars",
      "Water policy advocacy",
      "Research publications",
      "Awareness campaigns",
    ],
    impact: [
      "Collaboration with global organizations",
      "Influenced water-related discussions at policy level",
    ],
    credibility: [
      "Strong in awareness & policy",
      "Limited direct ground restoration work",
    ],
    credibilityLabel: "Reality Check",
    images: [iwf1, iwf2],
    website: "https://www.indiawaterfoundation.org/",
  },
  {
    id: 4,
    name: "WaterAid India",
    type: "International development organization",
    founded: "1986 (in India)",
    location: "India",
    parentOrg: "WaterAid",
    mission:
      "To ensure access to safe water, sanitation, and hygiene for underserved communities.",
    activities: [
      "Clean drinking water projects",
      "Sanitation infrastructure",
      "Hygiene awareness campaigns",
      "Community engagement",
    ],
    impact: [
      "Millions benefited across India",
      "Improved public health in rural areas",
    ],
    credibility: [
      "Not specifically river-focused",
      "Broader WASH (Water, Sanitation, Hygiene) focus",
    ],
    credibilityLabel: "Reality Check",
    images: [wateraid1, wateraid2],
    website: "https://www.wateraid.org/in/",
  },
];

function NgoCard({ ngo }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Image row */}
      <div className="grid grid-cols-2 gap-0.5 h-48">
        {ngo.images.map((img, idx) => (
          <div key={idx} className="overflow-hidden">
            {img ? (
              <img src={img} alt={`${ngo.name} ${idx + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{ngo.name}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">{ngo.type}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">Est. {ngo.founded}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{ngo.location}</span>
            {ngo.founder && <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{ngo.founder}</span>}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Mission</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{ngo.mission}</p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Key Activities</h3>
          <ul className="text-sm text-gray-600 list-disc ml-4 space-y-0.5">
            {ngo.activities.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Impact</h3>
          <ul className="text-sm text-gray-600 list-disc ml-4 space-y-0.5">
            {ngo.impact.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <div className={`p-3 rounded-xl ${ngo.credibilityLabel === "Why They're Credible" ? "bg-emerald-50" : "bg-amber-50"}`}>
          <h3 className={`text-xs font-bold uppercase tracking-wide mb-1 ${ngo.credibilityLabel === "Why They're Credible" ? "text-emerald-700" : "text-amber-700"}`}>
            {ngo.credibilityLabel}
          </h3>
          <ul className={`text-sm list-disc ml-4 space-y-0.5 ${ngo.credibilityLabel === "Why They're Credible" ? "text-emerald-700" : "text-amber-700"}`}>
            {ngo.credibility.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <a
          href={ngo.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 rounded-full bg-emerald-600 text-white font-medium text-sm text-center no-underline hover:bg-emerald-700 transition-colors"
        >
          Visit Website &rarr;
        </a>
      </div>
    </div>
  );
}

function Ngos() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
          Partners
        </span>
        <h1 className="text-3xl font-bold text-gray-900">NGOs Working for Water Conservation</h1>
        <p className="text-gray-500 mt-2 max-w-xl">
          Discover organizations making a real difference in protecting and
          restoring India's water resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ngosData.map((ngo) => (
          <NgoCard key={ngo.id} ngo={ngo} />
        ))}
      </div>
    </div>
  );
}

export default Ngos;
