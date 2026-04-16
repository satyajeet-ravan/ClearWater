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
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-white/70 text-lg">No searches yet. Go check some water quality!</p>
        <Link
          to="/check"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors no-underline"
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
        <h1 className="text-2xl font-bold text-white">Search History</h1>
        <button
          onClick={handleClearAll}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-red-500/20 text-red-300 border border-red-400/30 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          <FaTrashAlt /> Clear All History
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
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">{record.river_location}</h3>
                <p className="text-white/60 text-sm mt-1">{record.usage_category}</p>
                <p className="text-white/40 text-xs mt-1">{formatDate(record.searched_at)}</p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isFail
                      ? "bg-red-500/20 text-red-300 border border-red-400/30"
                      : "bg-green-500/20 text-green-300 border border-green-400/30"
                  }`}
                >
                  {record.result_status}
                </span>
                <button
                  onClick={() => handleDelete(record.id)}
                  className="text-white/30 hover:text-red-400 transition-colors p-1"
                  title="Delete record"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>

            {/* Collapsible precautions */}
            {hasPrecaution && (
              <>
                <button
                  onClick={() => setExpandedId(isExpanded ? null : record.id)}
                  className="flex items-center gap-1 mt-3 text-sm text-amber-300/80 hover:text-amber-300 transition-colors bg-transparent border-none cursor-pointer"
                >
                  {isExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  {isExpanded ? "Hide Precautions" : "View Precautions"}
                </button>

                {isExpanded && (
                  <div className="mt-3 p-3 bg-amber-900/20 border border-amber-400/20 rounded-lg">
                    <div className="max-w-prose text-sm text-amber-100/80">
                      <ReactMarkdown
                        components={{
                          h2: ({ children }) => (
                            <h2 className="text-sm font-bold text-amber-300 mt-3 mb-1 uppercase tracking-wide">
                              {children}
                            </h2>
                          ),
                          ul: ({ children }) => (
                            <ul className="ml-4 list-disc space-y-1 text-sm">{children}</ul>
                          ),
                          li: ({ children }) => (
                            <li className="text-amber-100/80 leading-snug">{children}</li>
                          ),
                          p: ({ children }) => (
                            <p className="text-sm text-amber-100/80 mb-2">{children}</p>
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
