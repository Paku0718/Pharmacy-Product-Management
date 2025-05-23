import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import sampleVideo from "/src/assets/images/homegif.mp4";

const Home = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }

    // Trigger animations after component mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Rotate through features automatically
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);

  const features = [
    {
      title: "Free Delivery",
      description:
        "Get your medications delivered right to your doorstep without any extra charges",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          ></path>
        </svg>
      ),
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated team is available around the clock to assist with any healthcare needs",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Easy Prescription Upload",
      description:
        "Simply upload your prescription and we'll take care of the rest for quick order processing.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v16h16V4H4zm4 4h8m-8 4h8m-8 4h5"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-2 sm:mt-5 mb-4 sm:mb-8 mx-2 sm:mx-5 overflow-hidden">
      {/* Hero Section with Dynamic Design */}
      <div className="relative bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl sm:rounded-3xl shadow-xl overflow-hidden">
        {/* Animated wave background */}
        <div className="absolute inset-0 opacity-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-64"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="fill-current text-teal-600 opacity-10"
            ></path>
          </svg>
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 w-full h-40"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              className="fill-current text-teal-400 opacity-5"
            ></path>
          </svg>
        </div>

        {/* Decorative patterns - hidden on smallest screens */}
        <div className="absolute top-0 left-0 w-full h-full hidden sm:block">
          <div className="absolute top-10 left-10 w-16 sm:w-32 h-16 sm:h-32 border-4 sm:border-8 border-teal-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 sm:w-48 h-24 sm:h-48 border-4 sm:border-8 border-teal-200 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-40 w-8 sm:w-16 h-8 sm:h-16 border-2 sm:border-4 border-teal-300 rounded-full opacity-30"></div>

          {/* DNA helix pattern for medical theme */}
          <div className="absolute top-0 right-0 h-full w-1/4 opacity-5 overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="absolute w-full">
                <div
                  className="absolute h-2 w-2 bg-teal-800 rounded-full"
                  style={{
                    top: `${i * 40 + Math.sin(i) * 30}px`,
                    left: `${40 + Math.sin(i * 0.8) * 40}px`,
                  }}
                ></div>
                <div
                  className="absolute h-2 w-2 bg-teal-800 rounded-full"
                  style={{
                    top: `${i * 40 + Math.sin(i) * 30}px`,
                    right: `${40 + Math.sin(i * 0.8 + Math.PI) * 40}px`,
                  }}
                ></div>
                <div
                  className="absolute h-px bg-teal-600"
                  style={{
                    top: `${i * 40 + Math.sin(i) * 30 + 1}px`,
                    left: `${40 + Math.sin(i * 0.8) * 40 + 2}px`,
                    width: `${
                      100 -
                      Math.sin(i * 0.8) * 40 -
                      Math.sin(i * 0.8 + Math.PI) * 40 -
                      80
                    }px`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 py-10 sm:py-16 md:py-5 md:px-12">
          {/* Content Section */}
          <div
            className={`w-full md:w-3/4 mt-6 sm:mt-10 md:mt-0 px-2 sm:px-4 md:px-8 transition-all duration-1000 ease- transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative mb-4 sm:mb-8">
              <div className="absolute -left-3 sm:-left-6 -top-3 sm:-top-6 w-6 sm:w-12 h-6 sm:h-12 bg-teal-100 rounded-full opacity-80"></div>
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-teal-800 mb-3 sm:mb-4 text-center md:text-left leading-tight">
                Welcome to{" "}
                <span className="inline-block md:absolute md:ml-2">
                  <span className="relative z-10 text-teal-600">MediCare</span>
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed text-center md:text-justify">
              At <span className="font-semibold text-teal-700">MediCare</span>,
              your health and well-being are our top priorities. We are
              dedicated to providing you with the highest quality pharmaceutical
              care, exceptional customer service, and a wide range of products
              to meet all your healthcare needs.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-6 sm:mb-10 leading-relaxed text-center md:text-justify">
              Experience the difference at MediCare, where your health is in
              good hands. Visit us in-store or explore our website to discover
              all the ways we can support your health journey.
            </p>

            <div className="text-center md:text-left">
              <Link
                to="/login"
                className="group relative inline-flex items-center bg-teal-700 text-white text-base sm:text-lg font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-full shadow-lg overflow-hidden hover:bg-teal-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <span className="relative z-10">GET STARTED</span>
                <svg
                  className="relative z-10 ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform translate-x-full group-hover:translate-x-0 ease-out"></div>
              </Link>
            </div>
          </div>

          {/* Video Section with enhanced presentation */}
          <div
            className={`w-full md:w-2/4 flex justify-center items-center mt-4 sm:mt-6 md:mt-0 p-2 sm:p-4 transition-all duration-1000 delay-300 ease-out transform ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg">
              {/* Video container with frame effects */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500 to-teal-300 opacity-20"></div>

                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeOpacity="0.5"
                        className="text-teal-900"
                      />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                <video
                  ref={videoRef}
                  src={sampleVideo}
                  className="w-full h-auto object-cover rounded-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              {/* Animated decorative floating elements - reduced/hidden on smallest screens */}
              <div className="absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-8 sm:w-16 h-8 sm:h-16 bg-teal-200 rounded-full opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-8 sm:w-16 h-8 sm:h-16 bg-teal-300 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute top-1/2 -right-5 sm:-right-10 w-5 sm:w-10 h-5 sm:h-10 bg-teal-400 rounded-full opacity-40 animate-bounce"></div>
              <div className="absolute top-1/4 -left-3 sm:-left-6 w-3 sm:w-6 h-3 sm:h-6 bg-teal-500 rounded-full opacity-30 animate-ping"></div>

              {/* Medical cross symbol for theme reinforcement */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 w-6 sm:w-10 h-6 sm:h-10 flex items-center justify-center">
                <div className="w-4 sm:w-8 h-4 sm:h-8 relative">
                  <div className="absolute inset-0 bg-teal-500 rounded-sm opacity-90"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 sm:w-2 bg-white transform -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-1 sm:h-2 bg-white transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Showcase with Interactive Sliding Feature */}
      <div className="py-6 sm:py-10 px-3 sm:px-6 bg-white shadow-md rounded-lg mx-auto mt-6 sm:mt-12 max-w-4xl">
        <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-8">
          Our Premium Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-4 sm:p-6 border rounded-lg transition duration-500 transform ${
                index === activeFeature
                  ? "bg-teal-50 shadow-xl scale-105 border-teal-400"
                  : "bg-white hover:bg-teal-50 hover:shadow-md"
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 text-teal-600 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 text-justify">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        className={`mt-8 sm:mt-16 bg-gradient-to-br from-teal-50 to-white rounded-xl sm:rounded-3xl shadow-lg overflow-hidden transition-all duration-1000 delay-900 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="py-8 sm:py-12 px-4 sm:px-8 relative">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-24 sm:w-48 h-24 sm:h-48 text-teal-200 opacity-20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-full h-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>

          <h2 className="text-center text-2xl sm:text-3xl font-bold text-teal-700 mb-2">
            What Our Customers Say
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-teal-300 mx-auto mb-6 sm:mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md relative">
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic">
                MediCare has been a lifesaver! Their fast delivery and
                knowledgeable staff have made managing my medication so much
                easier. I highly recommend their services to anyone.
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full overflow-hidden flex items-center justify-center mr-3 sm:mr-4">
                  <svg
                    className="w-6 sm:w-8 h-6 sm:h-8 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-teal-800">
                    Aditya Kansana
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">Regular Customer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md relative">
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-6 sm:w-8 h-6 sm:h-8 bg-teal-400 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 sm:w-4 h-3 sm:h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 italic">
                Ordering medicines through the app was quick and hassle-free.
                The delivery was on time, and the packaging was neat. I really
                appreciate how easy it is to get what I need without stepping
                out!
              </p>

              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-teal-100 rounded-full overflow-hidden flex items-center justify-center mr-3 sm:mr-4">
                  <svg
                    className="w-6 sm:w-8 h-6 sm:h-8 text-teal-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-teal-800">Vipul Tembulwar</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className={`mt-8 sm:mt-16 mb-4 sm:mb-8 relative overflow-hidden transition-all duration-1000 delay-1200 ease-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-12 relative z-10">
          {/* Wave pattern overlay */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              className="absolute bottom-0 left-0"
            >
              <path
                fill="#ffffff"
                fillOpacity="1"
                d="M0,96L48,106.7C96,117,192,139,288,154.7C384,171,480,181,576,165.3C672,149,768,107,864,101.3C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to experience better healthcare?
            </h2>
            <p className="text-teal-50 text-base sm:text-lg mb-6 sm:mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers and discover why MediCare is
              the preferred choice for all your healthcare needs.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center bg-white text-teal-600 font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg hover:bg-teal-50 transform hover:scale-105 transition-all duration-300 ease-in-out mb-3 sm:mb-0"
              >
                Browse Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-transparent text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full border-2 border-white hover:bg-white hover:text-teal-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;