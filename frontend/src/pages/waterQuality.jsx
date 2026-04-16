import { useState } from "react";
import MapView from "../components/mapview";
import ResultCard from "../components/ResultCard";
import Dropdown from "../components/dropdown";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const USAGE_LABELS = {
  A: "Drinking Water (without treatment)",
  B: "Outdoor Bathing",
  C: "Drinking Water (after treatment)",
  D: "Wildlife & Fisheries",
  E: "Irrigation / Industrial / Waste Disposal",
};

function WaterQuality() {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState("");

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [river, setRiver] = useState("");

  const handleCheckQuality = async () => {
    if (!state || !district || !river) {
      setError("Please select a state, district, and monitoring location.");
      return;
    }
    if (!usage) {
      setError("Please select a usage type.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const params = new URLSearchParams({ state, district, river, usage });
      const res = await fetch(`/api/quality?${params}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to fetch water quality data.");
        return;
      }

      setResult(data);

      // Save to search history (fire and forget)
      if (user) {
        supabase.from("search_history").insert({
          user_id: user.id,
          river_location: river,
          usage_category: USAGE_LABELS[usage] || usage,
          result_status: data.pass ? "PASS" : "FAIL",
          precaution: data.precautions || null,
        }).then(({ error: histErr }) => {
          if (histErr) console.error("History save error:", histErr.message);
        });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectClass =
    "w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow appearance-none";

  return (
    <div className="flex gap-6 h-full">
      {/* Map Area */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <MapView state={state} district={district} river={river} />
      </div>

      {/* Right Panel */}
      <div className="flex flex-col gap-4 w-96 overflow-y-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Check Water Quality</h2>

          <Dropdown setState={setState} setDistrict={setDistrict} setRiver={setRiver} />

          <select value={usage} onChange={(e) => setUsage(e.target.value)} className={selectClass}>
            <option value="">Select Usage</option>
            <option value="A">Drinking Water (without treatment)</option>
            <option value="B">Outdoor Bathing</option>
            <option value="C">Drinking Water (after treatment)</option>
            <option value="D">Wildlife & Fisheries</option>
            <option value="E">Irrigation / Industrial / Waste Disposal</option>
          </select>

          <button
            onClick={handleCheckQuality}
            disabled={loading}
            className="w-full bg-emerald-600 text-white font-medium py-3 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm mt-1"
          >
            {loading ? "Checking..." : "Check Quality"}
          </button>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        {loading && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-emerald-500 border-t-transparent mx-auto mb-2" />
            <p className="text-sm text-gray-500">Analyzing water quality...</p>
          </div>
        )}

        {result && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <ResultCard result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

export default WaterQuality;
