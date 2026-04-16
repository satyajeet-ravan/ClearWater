import ReactMarkdown from "react-markdown";

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { selectedClass, label, pass, failures, precautions } = result;

  return (
    <div className="space-y-4">
      {/* Usage Label */}
      <h3 className="text-base font-bold text-gray-900 text-center">{label}</h3>

      {/* Pass/Fail Banner */}
      <div
        className={`py-3 px-4 rounded-xl text-center text-lg font-bold ${
          pass
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}
      >
        {pass ? "PASS" : "FAIL"}
      </div>

      {/* Failure Details or Pass Message */}
      {pass ? (
        <p className="text-sm text-emerald-600 text-center">
          This water meets the standard for {label}. No major concerns detected.
        </p>
      ) : (
        failures.length > 0 && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
            <h4 className="text-sm font-semibold text-red-800 mb-2">Why it failed</h4>
            <ul className="ml-4 text-sm text-red-700 list-disc space-y-1">
              {failures.map((f, i) => (
                <li key={i}>
                  <span className="font-medium">{f.parameter}</span>: {f.value} (required: {f.limit})
                </li>
              ))}
            </ul>
          </div>
        )
      )}

      {/* Precautions Section */}
      {pass ? (
        <p className="text-xs text-gray-400 italic text-center">
          Water meets required standards for this use.
        </p>
      ) : (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
          <h4 className="text-sm font-semibold text-emerald-800 mb-2">
            Precautions & Recommendations
          </h4>
          {precautions ? (
            <div className="max-w-prose">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-xs font-bold text-emerald-800 mt-4 mb-1 uppercase tracking-wide">
                      {children}
                    </h2>
                  ),
                  ul: ({ children }) => (
                    <ul className="ml-4 list-disc space-y-1 text-sm">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 leading-snug text-sm">{children}</li>
                  ),
                  p: ({ children }) => (
                    <p className="text-sm text-gray-700 mb-2">{children}</p>
                  ),
                }}
              >
                {precautions}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">
              Precaution details unavailable at this time.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultCard;
