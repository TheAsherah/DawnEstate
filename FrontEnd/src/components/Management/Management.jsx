"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiPlusCircle, FiList } from "react-icons/fi";

// Components
import AddBlog from "./AddBlog/AddBlog";
import ShowRequests from "./ShowRequests/ShowRequests";
import AddProductCMS from "./Addproduct/AddProduct";
import ShowProductRequests from "./ShowProducts/ShowProducts";
import AddAIBlogCMS from "./Addaiblog/Addaiblog";
import AddAIProductCMS from "./addaiproduct/Addaiproduct";

const Management = () => {
  const [activeTab, setActiveTab] = useState("Add blog");
  const [isMounted, setIsMounted] = useState(false);

  const loggedIn = useSelector((state) => state.admin.loggedIn);
  const mode = useSelector((state) => state.theme?.mode) || "dark";
  const isDark = mode === "dark";
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loggedIn) {
      toast.warning("Please login to access the dashboard");
      router.push("/login");
    }
  }, [loggedIn, router, isMounted]);

  if (!isMounted) return null;
  if (!loggedIn) return null;

  const tabs = [
    { id: "Add blog", label: "Create Blog", icon: <FiPlusCircle /> },
    { id: "Show Blogs", label: "Show Blogs", icon: <FiList /> },
    { id: "Add Product", label: "Create Property", icon: <FiPlusCircle /> },
    { id: "Show Products", label: "Show Properties", icon: <FiList /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Add blog":
        return <AddBlog />;
      case "Show Blogs":
        return <ShowRequests />;
      case "Show Products":
        return <ShowProductRequests />;
      case "Add Product":
        return <AddProductCMS />;
      default:
        return <AddAIBlogCMS />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-slate-50 text-slate-900"}`}>
      {/* Dashboard Header */}
      <header className={`border-b transition-colors ${isDark ? "bg-zinc-950 border-white/10" : "bg-white border-slate-200"}`}>
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className={`text-2xl font-serif tracking-wider font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                DAWN ESTATE MANAGEMENT
              </h1>
              <p className={`text-xs uppercase tracking-widest mt-1.5 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
                Create, edit, and organize your luxury property portfolio.
              </p>
            </div>

            {/* Professional Tab Switcher */}
            <nav className={`flex p-1.5 rounded-xl w-fit border transition-colors ${isDark ? "bg-zinc-900/80 border-white/10" : "bg-slate-100 border-slate-200"}`}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all duration-200 rounded-lg ${
                    activeTab === tab.id
                      ? "text-white"
                      : isDark
                      ? "text-zinc-400 hover:text-zinc-200"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-warm-brown shadow-md rounded-lg"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 text-base">{tab.icon}</span>
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-[1400px] mx-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Management;