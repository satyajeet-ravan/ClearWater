function WaterQuality() {
  return (
    <div className="flex gap-4">

      {/* Map Area */}
      <div className="flex-1 bg-white rounded-xl shadow h-[500px] flex items-center justify-center">
        🌍 Map goes here
      </div>

      {/* Control Panel */}
      <div className="w-80 bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-4">Check Water Quality</h2>

        <select className="w-full mb-3 p-2 border rounded">
          <option>State</option>
        </select>

        <select className="w-full mb-3 p-2 border rounded">
          <option>District</option>
        </select>

        <select className="w-full mb-3 p-2 border rounded">
          <option>Usage</option>
        </select>

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Check Quality
        </button>
      </div>

    </div>
  );
}

export default WaterQuality;