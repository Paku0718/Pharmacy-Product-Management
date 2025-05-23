//from line 23
{/* Main Footer Content */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
  {/* Column 1: About */}
  <div className="bg-white p-4 rounded shadow-sm border-l-4 border-teal-500">
    <h3 className="font-bold text-lg mb-2 text-teal-800">SunPharma</h3>
    <p className="text-sm text-gray-600">
      Your health is our priority. We've been serving our community with
      reliable pharmaceutical care since 2025.
    </p>
    <div className="mt-3 flex items-center">
      <button
        onClick={handleLike}
        className="flex items-center text-teal-600 hover:text-teal-800 transition-colors"
      >
        <Heart
          className={`w-4 h-4 mr-2 ${likedCount > 0 ? "fill-current" : ""}`}
        />
        <span>{likedCount > 0 ? `${likedCount} liked this` : "Like us"}</span>
      </button>
    </div>
  </div>

  {/* Column 2: Quick Links */}
  <div className="bg-white p-4 rounded shadow-sm border-l-4 border-teal-500">
    <h3 className="font-bold text-lg mb-2 text-teal-800">
      <button
        onClick={() => setShowLinks(!showLinks)}
        className="flex items-center hover:text-teal-600 transition-colors w-full justify-between"
      >
        Quick Links
        <ChevronUp
          className={`ml-2 w-4 h-4 transform transition-transform ${
            showLinks ? "rotate-180" : ""
          }`}
        />
      </button>
    </h3>
    <ul
      className={`space-y-2 transition-all duration-300 ${
        showLinks ? "max-h-60" : "max-h-0 overflow-hidden md:max-h-60"
      }`}
    >
      <li>
        <Link
          to="/"
          className="text-sm hover:text-teal-600 transition-colors block py-1 border-b border-gray-100"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/products"
          className="text-sm hover:text-teal-600 transition-colors block py-1 border-b border-gray-100"
        >
          Products
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className="text-sm hover:text-teal-600 transition-colors block py-1 border-b border-gray-100"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="text-sm hover:text-teal-600 transition-colors block py-1"
        >
          Contact Us
        </Link>
      </li>
    </ul>
  </div>

  {/* Column 3: Contact Info */}
  <div className="bg-white p-4 rounded shadow-sm border-l-4 border-teal-500">
    <h3 className="font-bold text-lg mb-2 text-teal-800">Contact Us</h3>
    <ul className="space-y-3">
      <li className="flex items-center text-sm">
        <Phone className="w-4 h-4 mr-3 text-teal-600" />
        <a
          href="tel:+1234567890"
          className="hover:text-teal-600 transition-colors"
        >
          967-158-230
        </a>
      </li>
      <li className="flex items-center text-sm">
        <Mail className="w-4 h-4 mr-3 text-teal-600" />
        <a
          href="mailto:info@carewellpharmacy.com"
          className="hover:text-teal-600 transition-colors"
        >
          info@sunpharma.com
        </a>
      </li>
      <li className="flex items-start text-sm">
        <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-teal-600" />
        <span>19 SunPharma, Kothrud City, Pune-411034</span>
      </li>
    </ul>
  </div>
</div>;
