import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaTrashAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

function History() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!user) return;

    async function fetchHistory() {
      const { data, error } = await supabase
        .from("search_history")
        .select("*")
        .eq("user_id", user.id)
        .order("searched_at", { ascending: false });

      if (!error && data) setRecords(data);
      setLoading(false);
    }

    fetchHistory();
  }, [user]);

  const handleDelete = async (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    await supabase.from("search_history").delete().eq("id", id);
  };

  const handleClearAll = async () => {
    setRecords([]);
    await supabase.from("search_history").delete().eq("user_id", user.id);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl mb-2">
          <FaTrashAlt />
        </div>
        <p className="text-gray-500 text-lg">No searches yet. Go check some water quality!</p>
        <Link
          to="/check"
          className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors no-underline text-sm"
        >
          Check Water Quality
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Search History</h1>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-full hover:bg-red-100 transition-colors"
        >
          <FaTrashAlt size={12} /> Clear All
        </button>
      </div>

      {/* Records */}
      {records.map((record) => {
        const isFail = record.result_status === "FAIL";
        const isExpanded = expandedId === record.id;
        const hasPrecaution = isFail && record.precaution;

        return (
          <div
            key={record.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-gray-900 font-semibold">{record.river_location}</h3>
                <p className="text-gray-500 text-sm mt-1">{record.usage_category}</p>
                <p className="text-gray-400 text-xs mt-1">{formatDate(record.searched_at)}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isFail
                      ? "bg-red-50 text-red-600 border border-red-200"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  }`}
                >
                  {record.result_status}
                </span>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                  title="Delete record"
                >
                  <FaTrash size={13} />
                </button>
              </div>
            </div>

            {hasPrecaution && (
              <>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  className="flex items-center gap-1 mt-3 text-sm text-emerald-600 hover:text-emerald-700 transition-colors bg-transparent border-none cursor-pointer font-medium"
                >
                  {isExpanded ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                  {isExpanded ? "Hide Precautions" : "View Precautions"}
                </button>

                {isExpanded && (
                  <div className="mt-3 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="max-w-prose text-sm">
                      <ReactMarkdown
                        components={{
                          h2: ({ children }) => (
                            <h2 className="text-xs font-bold text-emerald-800 mt-3 mb-1 uppercase tracking-wide">
                              {children}
                            </h2>
                          ),
                          ul: ({ children }) => (
                            <ul className="ml-4 list-disc space-y-1 text-sm">{children}</ul>
                          ),
                          li: ({ children }) => (
                            <li className="text-gray-700 leading-snug">{children}</li>
                          ),
                          p: ({ children }) => (
                            <p className="text-sm text-gray-700 mb-2">{children}</p>
                          ),
                        }}
                      >
                        {record.precaution}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default History;
