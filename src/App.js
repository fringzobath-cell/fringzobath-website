import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Droplet,
  ShieldCheck,
  Sparkles,
  Gem,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home navigate={setCurrentPage} />;
      case "products":
        return <Products navigate={setCurrentPage} />;
      case "about":
        return <About navigate={setCurrentPage} />;
      case "contact":
        return <Contact />;
      default:
        return <Home navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="font-poppins min-h-screen flex flex-col bg-white text-gray-800">
      {/* Import Poppins Font & Custom Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .theme-red { color: #C8102E; }
        .bg-theme-red { background-color: #C8102E; }
        .hover-bg-theme-red:hover { background-color: #a00d24; }
        .border-theme-red { border-color: #C8102E; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isScrolled={isScrolled}
      />

      <main className="flex-grow pt-20">{renderPage()}</main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

// --- COMPONENTS ---

const Navbar = ({ currentPage, setCurrentPage, isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-white/95 backdrop-blur-sm py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            {/* Replace this div with your actual mascot logo if desired */}
            <Droplet className="w-8 h-8 theme-red mr-2" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Fringzo<span className="theme-red">bath</span>
              </h1>
              <p className="text-[0.6rem] uppercase tracking-widest text-gray-500 font-medium -mt-1">
                Fascinated<span className="theme-red"> Bathware</span>
              </p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors hover:text-[#C8102E] ${
                  currentPage === link.id
                    ? "theme-red border-b-2 border-[#C8102E] pb-1"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("products")}
              className="bg-theme-red hover-bg-theme-red text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              Shop Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#C8102E]"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-4 text-base font-medium border-b border-gray-50 ${
                  currentPage === link.id
                    ? "theme-red bg-red-50/50"
                    : "text-gray-700 hover:bg-gray-50 hover:theme-red"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Home = ({ navigate }) => {
  const features = [
    {
      icon: <Gem className="w-8 h-8 mb-4 theme-red" />,
      title: "Premium Qualitys",
      desc: "Crafted with the finest materials for lasting elegance.",
    },
    {
      icon: <Sparkles className="w-8 h-8 mb-4 theme-red" />,
      title: "Modern Design",
      desc: "Sleek, contemporary aesthetics to elevate your space.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 mb-4 theme-red" />,
      title: "Durable Materials",
      desc: "Engineered to withstand the test of time and moisture.",
    },
    {
      icon: <Droplet className="w-8 h-8 mb-4 theme-red" />,
      title: "Affordable Luxury",
      desc: "Experience five-star luxury without the premium price tag.",
    },
  ];

  return (
    <div className="animate-fade-in opacity-0">
      {/* Hero Section */}
      <section className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-16 px-4 sm:px-6 lg:px-8">
            <main className="mt-10 mx-auto max-w-7xl sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <span className="theme-red font-semibold tracking-wider uppercase text-sm mb-4 block">
                  Premium Bathware & Accessories
                </span>
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                  <span className="block">Elevate Your</span>
                  <span className="block theme-red">Bathroom Experience</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover our exclusive collection of premium faucets, showers,
                  and accessories designed to bring luxury and functionality to
                  your everyday routine.
                </p>
                <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-full shadow">
                    <button
                      onClick={() => navigate("products")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-theme-red hover-bg-theme-red transition-colors md:py-4 md:text-lg md:px-10"
                    >
                      View Products <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => navigate("about")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors md:py-4 md:text-lg md:px-10"
                    >
                      Our Story
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          {/* PLACEHOLDER: Replace src with your uploaded product group image path */}
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80"
            alt="Modern luxury bathroom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent lg:via-gray-50/20"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Featured Collections
            </h2>
            <div className="mt-2 w-24 h-1 bg-theme-red mx-auto rounded-full"></div>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our signature soap dispensers, crafted for modern elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Featured Product Cards */}
            {[
              {
                name: "Matte Black Dispenser",
                desc: "Bold, modern, and fingerprint-resistant.",
                img: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&q=80",
                color: "Matte Black",
              },
              {
                name: "Polished Gold Dispenser",
                desc: "A touch of classic luxury for any basin.",
                img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80",
                color: "Gold",
              },
              {
                name: "Rose Gold Dispenser",
                desc: "Contemporary warmth and sophisticated style.",
                img: "https://images.unsplash.com/photo-1645567455251-334ed4702f9b?q=80&w=1169&auto=format&fit=crop&q=80",
                color: "Rose Gold",
              },
            ].map((prod, idx) => (
              <div
                key={idx}
                className="group bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 overflow-hidden bg-white p-6 flex justify-center items-center">
                  {/* PLACEHOLDER: Replace these src links with your dispenser images */}
                  <img
                    src={prod.img}
                    alt={prod.name}
                    className="h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                    {prod.color}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {prod.name}
                  </h3>
                  <p className="text-gray-500 mb-6 text-sm">{prod.desc}</p>
                  <button
                    onClick={() => navigate("products")}
                    className="w-full bg-white border-2 border-theme-red theme-red hover-bg-theme-red hover:text-white py-2 rounded-xl font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Fringzobath
            </h2>
            <div className="mt-2 w-24 h-1 bg-theme-red mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Products = ({ navigate }) => {
  const [filter, setFilter] = useState("All");

  const products = [
    {
      id: 1,
      name: "Premium Soap Dispenser",
      category: "Accessories",
      finish: "Matte Black",
      img: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&q=80",
      desc: "Sleek matte black finish, durable pump mechanism.",
    },
    {
      id: 2,
      name: "Premium Soap Dispenser",
      category: "Accessories",
      finish: "Gold",
      img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80",
      desc: "Luxurious gold finish that resists tarnishing.",
    },
    {
      id: 3,
      name: "Premium Soap Dispenser",
      category: "Accessories",
      finish: "Rose Gold",
      img: "https://images.unsplash.com/photo-1585652757141-88d01119b914?auto=format&fit=crop&q=80",
      desc: "Modern rose gold for a warm, contemporary look.",
    },
    {
      id: 4,
      name: "Waterfall Basin Mixer",
      category: "Faucets",
      finish: "Chrome",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
      desc: "Smooth water flow with precision temperature control.",
    },
    {
      id: 5,
      name: "Rainfall Shower Head",
      category: "Showers",
      finish: "Matte Black",
      img: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80",
      desc: "Wide coverage rainfall shower for ultimate relaxation.",
    },
    {
      id: 6,
      name: "Minimalist Towel Ring",
      category: "Accessories",
      finish: "Brushed Nickel",
      img: "https://images.unsplash.com/photo-1622398925373-3f9eba0e46fb?auto=format&fit=crop&q=80",
      desc: "Sturdy wall-mounted ring with concealed screws.",
    },
  ];

  const filters = ["All", "Faucets", "Showers", "Accessories"];

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div className="animate-fade-in opacity-0 min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Browse our complete collection of premium bathware, engineered for
            excellence and designed for beauty.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === f
                  ? "bg-theme-red text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-red-50 hover:theme-red border border-gray-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 bg-gray-100 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={prod.img}
                  alt={prod.name}
                  className="max-h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                />
                <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-medium">
                  {prod.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">
                    {prod.name}
                  </h3>
                </div>
                <p className="text-sm theme-red font-medium mb-3">
                  Finish: {prod.finish}
                </p>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {prod.desc}
                </p>
                <button
                  onClick={() => navigate("contact")}
                  className="w-full bg-theme-red hover-bg-theme-red text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const About = ({ navigate }) => {
  return (
    <div className="animate-fade-in opacity-0 bg-white">
      {/* Hero Image Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-gray-900">
        {/* PLACEHOLDER: Replace src with your uploaded About Us hero image */}
        <img
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80"
          alt="About Fringzobath"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              About Fringzobath
            </h1>
            <h3 className="text-xl md:text-3xl font-bold text-red mb-4 tracking-tight">
            Designed for Comfort. Built for Life.
            </h3>
            <div className="w-24 h-1 bg-theme-red mx-auto rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="max-w-4xl mx-auto space-y-6">
  
  <h2 className="text-3xl md:text-4xl font-bold text-red-600 tracking-tight">
    About Fringzo
  </h2>

  <p className="text-lg text-gray-700 leading-relaxed">
    <span className="font-semibold text-gray-900">At Fringzo</span>, we believe a bathroom is not just a utility space —
    it is a place of comfort, relaxation and personal luxury.
  </p>

  <p className="text-lg text-gray-600 leading-relaxed">
    Our mission is to transform everyday routines into refreshing experiences
    through thoughtfully designed bath solutions.
  </p>

  <div className="grid md:grid-cols-2 gap-6 pt-4">
    
    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-red-600">
      <h3 className="font-semibold text-gray-900 mb-2">Established Excellence</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        Established in 2015, FRINGZO has grown into a trusted name in bathroom fittings
        by combining modern aesthetics with durable engineering.
      </p>
    </div>

    <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-red-600">
      <h3 className="font-semibold text-gray-900 mb-2">Design & Innovation</h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        From elegant faucets to complete bath accessories, every product reflects
        precision craftsmanship and attention to detail.
      </p>
    </div>

  </div>

  <p className="text-lg text-gray-600 leading-relaxed pt-4">
    We continuously research global trends and adapt them to Indian requirements —
    delivering products that are stylish, practical and reliable.
  </p>
  </div>
  </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="bg-red-50 p-10 rounded-3xl border border-red-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="w-32 h-32 theme-red" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed relative z-10">
            To become a recognized Indian brand in bath fittings by delivering consistent quality,
            innovative designs and trustworthy service.
            </p>
          </div>
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-32 h-32 text-gray-900" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed relative z-10">
            To provide reliable and elegant bathroom solutions that improve everyday
            living while maintaining affordability and durability.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[#C8102E] opacity-10"></div>
          <h2 className="text-3xl font-bold mb-6 relative z-10">
            Transform Your Bathroom Today
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
            Explore our curated collections and find the perfect finishing
            touches for your sanctuary.
          </p>
          <button
            onClick={() => navigate("products")}
            className="relative z-10 bg-theme-red hover-bg-theme-red text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-red-500/50 flex items-center mx-auto"
          >
            View Products <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      e.target.reset();
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="animate-fade-in opacity-0 bg-gray-50 py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Have a question about our products or want to place a bulk order?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Business Info Sidebar */}
          <div className="bg-gray-900 text-white p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C8102E] rounded-full opacity-20 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <Mail className="w-6 h-6 theme-red mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-300 text-sm">
                      Email Us
                    </h3>
                    <p className="text-lg">info@fringzobath.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-6 h-6 theme-red mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-300 text-sm">
                      Call Us
                    </h3>
                    <p className="text-lg">+91-9582283074</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 theme-red mt-1 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-300 text-sm">
                      Visit Us
                    </h3>
                    <p className="text-lg leading-relaxed">
                      3198/29, 2nd Floor, Sri Balaji Mkt
                      <br />
                      Gali Raja Wali,Peepal Mahadev
                      <br />
                      Hauz Qazi, Delhi - 110006
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 relative z-10">
              <h3 className="font-medium text-gray-400 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C8102E] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C8102E] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#C8102E] transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 p-10 lg:p-12">
            {formStatus === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h2>
                <p className="text-gray-500 max-w-md">
                  Thank you for reaching out to Fringzobath. Our team will get
                  back to you within 24 hours.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 text-[#C8102E] font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Send us a Message
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="+91 00000 00000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                    formStatus === "submitting"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-theme-red hover-bg-theme-red hover:shadow-red-500/30"
                  }`}
                >
                  {formStatus === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-[#C8102E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
              Fringzo<span className="theme-red">bath</span>
            </h2>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              Premium Bathware & Accessories. Elevating everyday experiences
              with meticulously designed, durable, and luxurious bathroom
              fixtures.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setCurrentPage("home")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("products")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("about")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage("contact")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Connect</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for updates.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Fringzobath. All rights reserved.</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
