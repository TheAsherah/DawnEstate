"use client";

import {
  acceptPropertyAPI,
  getPropertiesAPI,
  rejectPropertyAPI,
} from "@/services/user.service";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiEdit3, FiCheckCircle, FiTrash2, FiHome } from "react-icons/fi";
// Jib l'composant dyal l'edit ila kan mwjod 3ndk
import EditPropertyCMS from "./EditPropertyCMS"; 

const ShowPropertyRequests = () => {
  const mode = useSelector((state) => state.theme?.mode) || "dark";
  const isDark = mode === "dark";

  const [propertyData, setPropertyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPropertyId, setEditingPropertyId] = useState(null);

  useEffect(() => {
    getAllPropertyRequests();
  }, []);

  const getAllPropertyRequests = async () => {
    setIsLoading(true);
    try {
      const response = await getPropertiesAPI();
      setPropertyData(response.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (id) => {
    try {
      await acceptPropertyAPI(id);
      getAllPropertyRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await rejectPropertyAPI(id);
      getAllPropertyRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (id) => {
    setEditingPropertyId(id);
  };

  if (editingPropertyId) {
    return (
      <EditPropertyCMS 
        propertyId={editingPropertyId} 
        onBack={() => {
          setEditingPropertyId(null);
          getAllPropertyRequests();
        }} 
      />
    );
  }

  return (
    <div className={`w-[95%] max-w-7xl mx-auto p-6 transition-colors duration-300 ${isDark ? "text-zinc-100" : "text-slate-800"}`}>
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-warm-brown via-[#dfc29e] to-warm-brown">
            Property Management Portfolio
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 mt-1">
            Review, approve, or edit listed luxury properties
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-zinc-500 uppercase tracking-widest text-xs">
          Loading properties...
        </div>
      ) : propertyData.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 uppercase tracking-widest text-xs">
          No properties found.
        </div>
      ) : (
        <div className="space-y-4">
          {propertyData.map((property) => (
            <div
              key={property._id}
              className={`flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl border transition-all gap-4 backdrop-blur-md ${
                isDark 
                  ? "bg-zinc-950/70 border-white/10 hover:border-[#c5a880]/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]" 
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <Image
                    fill
                    src={property.mainImage?.url || "/placeholder.jpg"}
                    alt={property.title}
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div>
                  <h3 className="text-sm font-serif font-bold tracking-wide">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-zinc-400 uppercase tracking-wider">
                    <span>{property.city || "Marrakech"}</span>
                    <span>•</span>
                    <span className="text-warm-brown font-semibold">{property.price ? `${property.price} MAD` : "Price on Request"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => handleEditClick(property._id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <FiEdit3 className="w-3.5 h-3.5" /> Edit
                </button>

                <button
                  onClick={() => handleAccept(property._id)}
                  disabled={property.accepted}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                    property.accepted
                      ? "bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed"
                      : "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  <FiCheckCircle className="w-3.5 h-3.5" /> {property.accepted ? "Approved" : "Accept"}
                </button>

                <button
                  onClick={() => handleDelete(property._id)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all"
                >
                  <FiTrash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowPropertyRequests;