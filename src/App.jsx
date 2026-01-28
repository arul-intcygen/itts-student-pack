import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Check,
  X,
  LogOut,
  User,
  LayoutDashboard,
  ExternalLink,
  ArrowLeft,
  Loader2,
  School,
  ShieldCheck,
} from "lucide-react";

// --- DATA DUMMY AWAL (9 Services) ---
const INITIAL_SERVICES = [
  {
    id: 1,
    title: "GitHub Student Pack",
    category: "Development",
    description:
      "Akses gratis ke tool developer terbaik seperti JetBrains, Namecheap, dan DigitalOcean.",
    instruction:
      "Daftar di education.github.com/pack dengan email kampus. Upload KTM jika diminta.",
    imageColor: "bg-gray-800",
    tags: ["Populer", "Dev Tools"],
  },
  {
    id: 2,
    title: "Google Gemini Advanced",
    category: "AI & Productivity",
    description:
      "Akses ke model Gemini 1.5 Pro dan integrasi Google Workspace dengan akun Google Education kampus.",
    instruction:
      "Login ke gemini.google.com menggunakan akun email @itts.ac.id Anda.",
    imageColor: "bg-blue-600",
    tags: ["AI", "New"],
  },
  {
    id: 3,
    title: "Notion Personal Pro",
    category: "Productivity",
    description:
      "Organisir catatan kuliah tanpa batas blok. Gratis selamanya selama menggunakan email institusi.",
    instruction:
      "Sign up di Notion dengan email kampus, lalu upgrade plan ke Education Plan di settings.",
    imageColor: "bg-black",
    tags: ["Productivity", "Notes"],
  },
  {
    id: 4,
    title: "Perplexity Pro",
    category: "AI Search",
    description:
      "Akses mesin pencari AI advanced gratis selama setahun dengan kode promo khusus mahasiswa.",
    instruction:
      "Gunakan email kampus saat mendaftar atau masukkan kode promo khusus jika tersedia.",
    imageColor: "bg-teal-600",
    tags: ["AI", "Search"],
  },
  {
    id: 5,
    title: "Canva for Education",
    category: "Design",
    description:
      "Akses fitur premium Canva, jutaan aset, dan template premium untuk presentasi tugas.",
    instruction:
      "Daftar di Canva for Education. Biasanya otomatis terdeteksi via domain email kampus.",
    imageColor: "bg-purple-600",
    tags: ["Design", "Creative"],
  },
  {
    id: 6,
    title: "Microsoft 365",
    category: "Office",
    description: "Word, Excel, PowerPoint, dan OneDrive 1TB gratis.",
    instruction:
      "Login di portal.office.com dengan kredensial email kampus yang diberikan IT support.",
    imageColor: "bg-blue-500",
    tags: ["Essential", "Docs"],
  },
  {
    id: 7,
    title: "Spotify Premium Student",
    category: "Lifestyle",
    description:
      "Diskon 50% untuk langganan premium bulanan selama 4 tahun kuliah.",
    instruction:
      "Verifikasi status mahasiswa melalui SheerID di halaman promo Spotify Student.",
    imageColor: "bg-green-500",
    tags: ["Music", "Discount"],
  },
  {
    id: 8,
    title: "Autodesk Education",
    category: "Engineering",
    description:
      "Akses gratis ke AutoCAD, Revit, Maya, dan software profesional lainnya.",
    instruction:
      "Buat akun di Autodesk Education Community dan upload transkrip nilai/KTM.",
    imageColor: "bg-red-500",
    tags: ["3D", "Engineering"],
  },
  {
    id: 9,
    title: "JetBrains All Products",
    category: "Development",
    description:
      "Lisensi gratis untuk IntelliJ IDEA, PyCharm, WebStorm, dan semua IDE JetBrains.",
    instruction:
      "Apply di situs JetBrains Student dengan email .ac.id. Konfirmasi via email instan.",
    imageColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    tags: ["Coding", "IDE"],
  },
];

export default function App() {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState("login"); // login, home, detail, add, admin
  const [userRole, setUserRole] = useState(null); // 'user' or 'admin'

  // Data State
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [pendingServices, setPendingServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instruction: "",
  });

  // Notification State
  const [notification, setNotification] = useState(null);

  // --- HANDLERS ---

  const handleLogin = (role) => {
    setUserRole(role);
    setView(role === "admin" ? "admin" : "home");
  };

  const handleLogout = () => {
    setUserRole(null);
    setView("login");
    setFormData({ title: "", description: "", instruction: "" });
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmitService = (e) => {
    e.preventDefault();
    const newService = {
      id: Date.now(),
      title: formData.title,
      category: "User Submission",
      description: formData.description,
      instruction: formData.instruction,
      imageColor: "bg-indigo-500", // Default color for new items
      tags: ["Pending"],
    };

    setPendingServices([...pendingServices, newService]);
    showNotification("Layanan berhasil diajukan! Status: Pending Approval.");

    // Simulate loading/redirect
    setTimeout(() => {
      setFormData({ title: "", description: "", instruction: "" });
      setView("home");
    }, 1500);
  };

  const handleApprove = (id) => {
    const itemToApprove = pendingServices.find((s) => s.id === id);
    if (itemToApprove) {
      // Remove tag Pending
      const approvedItem = { ...itemToApprove, tags: ["Community", "New"] };
      setServices([approvedItem, ...services]);
      setPendingServices(pendingServices.filter((s) => s.id !== id));
      showNotification(`Layanan "${itemToApprove.title}" berhasil disetujui!`);
    }
  };

  const handleReject = (id) => {
    setPendingServices(pendingServices.filter((s) => s.id !== id));
    showNotification("Layanan ditolak.", "error");
  };

  // --- VIEWS COMPONENTS ---

  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2572&auto=format&fit=crop"
          alt="Campus Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-blue-900/30"></div>
      </div>

      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 border border-white/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg text-white">
            <School size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            ITTS Student Pack
          </h1>
          <p className="text-gray-500 mt-2">Masuk untuk akses layanan kampus</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin("user")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <User size={20} />
            Login sebagai Mahasiswa
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">
              Demo Mode
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            onClick={() => handleLogin("admin")}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            <ShieldCheck size={20} />
            Login sebagai Admin
          </button>
        </div>
      </div>
    </div>
  );

  const Navbar = () => (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView(userRole === "admin" ? "admin" : "home")}
          >
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <School size={20} />
            </div>
            <span className="font-bold text-xl text-blue-900">
              ITTS Student Pack
            </span>
          </div>

          <div className="flex items-center gap-4">
            {userRole === "user" && view !== "add" && (
              <button
                onClick={() => setView("add")}
                className="hidden md:flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
              >
                <Plus size={16} />
                Tambah Layanan
              </button>
            )}

            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">
                  {userRole === "admin" ? "Administrator" : "Mahasiswa ITTS"}
                </p>
                <p className="text-xs text-gray-500">
                  {userRole === "admin"
                    ? "admin@itts.ac.id"
                    : "student@itts.ac.id"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomeView = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2670&auto=format&fit=crop"
            alt="University Building"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400/30 backdrop-blur-sm text-blue-100 text-sm font-medium mb-4">
            Eksklusif untuk Mahasiswa ITTS
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Maksimalkan Email <span className="text-blue-300">.itts.ac.id</span>{" "}
            Kamu
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-8">
            Kumpulan layanan premium senilai jutaan rupiah yang bisa kamu
            dapatkan gratis hanya dengan email kampus Institut Teknologi
            Tangerang Selatan.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("browse-cards")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Jelajahi Layanan
            </button>
            <button
              onClick={() => setView("add")}
              className="bg-blue-700/50 backdrop-blur-sm border border-blue-500/50 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700/70 transition-colors"
            >
              Kontribusi Layanan
            </button>
          </div>
        </div>
      </div>

      {/* CARDS GRID */}
      <main
        id="browse-cards"
        className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Layanan Tersedia</h2>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari layanan..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                setSelectedService(service);
                setView("detail");
              }}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden"
            >
              <div
                className={`h-32 ${service.imageColor} relative flex items-center justify-center`}
              >
                <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
                  {service.title.split(" ")[0]}
                </h3>
                <div className="absolute top-3 right-3 flex gap-1">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-black/20 backdrop-blur-md rounded text-xs text-white font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:underline">
                  Cara Claim <ExternalLink size={14} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  const DetailView = () => {
    if (!selectedService) return null;
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div
              className={`h-40 ${selectedService.imageColor} flex items-end p-6 relative`}
            >
              <button
                onClick={() => setView("home")}
                className="absolute top-4 left-4 bg-black/20 hover:bg-black/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-3xl font-bold text-white drop-shadow-md">
                {selectedService.title}
              </h1>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Deskripsi
                </h2>
                <p className="text-gray-800 text-lg leading-relaxed">
                  {selectedService.description}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                <h2 className="text-blue-800 font-bold text-lg mb-3 flex items-center gap-2">
                  <ShieldCheck size={20} />
                  Cara Klaim Layanan
                </h2>
                <div className="prose text-blue-900/80">
                  {selectedService.instruction}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.open("#", "_blank")}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Buka Website Resmi
                </button>
                <button
                  onClick={() => setView("home")}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddServiceView = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">
              Kontribusi Layanan
            </h1>
            <p className="text-gray-500 mt-1">
              Nemu layanan baru untuk mahasiswa? Gas input dibawah.
            </p>
          </div>

          <form onSubmit={handleSubmitService} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Layanan
              </label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Contoh: GitHub Student Pack"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Singkat
              </label>
              <textarea
                required
                rows="2"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Jelaskan benefit utamanya..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cara Klaim
              </label>
              <textarea
                required
                rows="4"
                value={formData.instruction}
                onChange={(e) =>
                  setFormData({ ...formData, instruction: e.target.value })
                }
                placeholder="Step by step cara mendapatkan layanannya..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none resize-none"
              ></textarea>
              <p className="text-xs text-gray-400 mt-2">
                *Layanan yang kamu input diasumsikan Valid (Masih Bisa).
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-transform active:scale-95 shadow-md hover:shadow-lg"
              >
                Simpan Layanan
              </button>
              <button
                type="button"
                onClick={() => setView("home")}
                className="px-6 py-3 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Kelola pengajuan layanan dari mahasiswa
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <span className="text-gray-500 text-sm">Pending Approval: </span>
            <span className="font-bold text-blue-600 ml-1">
              {pendingServices.length}
            </span>
          </div>
        </div>

        {pendingServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-500" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              All caught up!
            </h3>
            <p className="text-gray-500">
              Tidak ada pengajuan layanan baru saat ini.
            </p>
            <p className="text-sm text-gray-400 mt-4 max-w-md mx-auto">
              Tips Demo: Logout, login sebagai User, tambahkan layanan baru,
              lalu kembali kesini.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingServices.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row"
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded mb-2">
                        NEEDS APPROVAL
                      </span>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {item.category}
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">ID: #{item.id}</div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-gray-400 uppercase">
                        Deskripsi
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <span className="text-xs font-bold text-gray-400 uppercase">
                        Cara Klaim
                      </span>
                      <p className="text-sm text-gray-700 mt-1">
                        {item.instruction}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 flex md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-200 w-full md:w-48">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Check size={18} /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="flex-1 bg-white text-red-600 border border-red-200 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // --- RENDER MAIN VIEW ---
  return (
    <div className="font-sans text-gray-900">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce-in ${notification.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
        >
          {notification.type === "success" ? (
            <Check size={20} />
          ) : (
            <X size={20} />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {view === "login" && <LoginView />}
      {view === "home" && <HomeView />}
      {view === "detail" && <DetailView />}
      {view === "add" && <AddServiceView />}
      {view === "admin" && <AdminDashboard />}
    </div>
  );
}
