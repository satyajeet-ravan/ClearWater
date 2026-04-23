import { useState } from "react";
import ResultCard from "./ResultCard";

function InputForm() {
  const [formData, setFormData] = useState({
    ph: "",
    bod: "",
    do: "",
    tc: "",
    fc: "",
    usage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      ph: Number(formData.ph),
      bod: Number(formData.bod),
      do: Number(formData.do),
      tc: Number(formData.tc),
      fc: Number(formData.fc),
      usage: formData.usage,
    };

    try {
      const res = await fetch("/api/quality/manual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }

      const data = await res.json();
      setResult(data);

    } catch (err) {
      setError(err.message || "Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full mb-3 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <>
      <h1 className="text-lg font-semibold mb-4">Check Your Own Water Quality</h1>

      {/* pH */}
      <label className={labelClass}>pH</label>
      <input
        name="ph"
        value={formData.ph}
        onChange={handleChange}
        placeholder="Enter pH (0 – 14)"
        className={inputClass}
        required
      />

      {/* BOD */}
      <label className={labelClass}>Biological Oxygen Demand (BOD)</label>
      <input
        name="bod"
        value={formData.bod}
        onChange={handleChange}
        placeholder="Enter BOD (mg/L)"
        className={inputClass}
        required
      />

      {/* DO */}
      <label className={labelClass}>Dissolved Oxygen (DO)</label>
      <input
        name="do"
        value={formData.do}
        onChange={handleChange}
        placeholder="Enter DO (mg/L)"
        className={inputClass}
        required
      />

      {/* TC */}
      <label className={labelClass}>Total Coliform (TC)</label>
      <input
        name="tc"
        value={formData.tc}
        onChange={handleChange}
        placeholder="Enter TC (MPN/100ml)"
        className={inputClass}
        required
      />

      {/* Usage */}
      <label className={labelClass}>Usage Category</label>
      <select
        name="usage"
        value={formData.usage}
        onChange={handleChange}
        className={inputClass}
        required
      >
        <option value="">Select Usage</option>
        <option value="A">Drinking Water (without treatment)</option>
        <option value="B">Outdoor Bathing</option>
        <option value="C">Drinking Water (after treatment)</option>
        <option value="D">Wildlife & Fisheries</option>
        <option value="E">Irrigation / Industrial / Waste Disposal</option>
      </select>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-emerald-600 text-white font-medium py-3 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm mt-1"
      >
        {loading ? "Checking..." : "Check Quality"}
      </button>

      {/* Error */}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {/* Loading */}
      {loading && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent mx-auto mb-2" />
          <p className="text-sm text-gray-500">Analyzing water quality...</p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <ResultCard result={result} />
        </div>
      )}
    </>
  );
}

export default InputForm;