import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editForm, setEditForm] = useState({ full_name: "", phone_no: "", address: "" });

  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
        setEditForm({
          full_name: data.full_name || "",
          phone_no: data.phone_no || "",
          address: data.address || "",
        });
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: editForm.full_name,
        phone_no: editForm.phone_no,
        address: editForm.address,
        updated_at: new Date(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage("Failed to update profile: " + error.message);
    } else {
      setProfile({ ...profile, ...editForm });
      setEditing(false);
      setMessage("Profile updated successfully!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-lg">
        Profile not found.
      </div>
    );
  }

  const memberSince = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "N/A";

  const editInputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0">
          {(profile.full_name || "U").charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">{profile.full_name}</h1>
          <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-gray-400" /> {profile.address || "No address"}</span>
            <span className="flex items-center gap-1"><FaCalendarAlt className="text-gray-400" /> Joined {memberSince}</span>
          </div>
        </div>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            editing
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
              : "border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          }`}
          onClick={() => { setEditing(!editing); setMessage(""); }}
        >
          {editing ? <><FaTimes className="inline mr-1" />Cancel</> : <><FaEdit className="inline mr-1" />Edit Profile</>}
        </button>
      </div>

      {message && (
        <div className={`p-3 rounded-xl text-sm text-center ${message.includes("Failed") ? "bg-red-50 text-red-600 border border-red-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
          {message}
        </div>
      )}

      {/* Contact Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0"><FaEnvelope /></div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
              <p className="text-sm text-gray-900">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0"><FaPhone /></div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Phone</p>
              {editing ? (
                <input type="tel" className={editInputClass} value={editForm.phone_no} onChange={(e) => setEditForm({ ...editForm, phone_no: e.target.value })} />
              ) : (
                <p className="text-sm text-gray-900">{profile.phone_no || "Not set"}</p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0"><FaMapMarkerAlt /></div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Address</p>
              {editing ? (
                <input type="text" className={editInputClass} value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
              ) : (
                <p className="text-sm text-gray-900">{profile.address || "Not set"}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Full Name</p>
              {editing ? (
                <input type="text" className={editInputClass} value={editForm.full_name} onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })} />
              ) : (
                <p className="text-sm text-gray-900">{profile.full_name}</p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0"><FaCalendarAlt /></div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Date of Birth</p>
              <p className="text-sm text-gray-900">
                {profile.dob ? new Date(profile.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "Not set"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {editing && (
        <button
          className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors disabled:opacity-50 text-sm"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : <><FaSave className="inline mr-2" />Save Changes</>}
        </button>
      )}
    </div>
  );
}

export default Profile;
