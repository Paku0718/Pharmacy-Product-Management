import {
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaArrowRight,
  FaUsers,
  FaLightbulb,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import OverviewImg from '../assets/images/imgabout.jpg';
import TeamP1 from '../assets/images/Nikita.jpg';
import TeamP2 from '../assets/images/photoo.jpeg';
import TeamP3 from '../assets/images/mukta-img.jpg';
import Mentor1 from '../assets/images/kiranMaam.png';
import Mentor2 from '../assets/images/ManojSir.png';
import Mentor3 from '../assets/images/AniketSir.png';



const AboutUs = () => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("auto");

  // Update image height to match content height
  useEffect(() => {
    if (contentRef.current) {
      const updateHeight = () => {
        const height = contentRef.current.offsetHeight;
        setContentHeight(`${height}px`);
      };
      
      // Initial measurement
      updateHeight();
      
      // Add resize listener
      window.addEventListener('resize', updateHeight);
      
      // Cleanup
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-teal-50 min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-teal-700 opacity-90 z-0"></div>
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight">
              About MediCare
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-black italic font-medium leading-relaxed mb-4 md:mb-6">
              Precision in product, Passion in care
            </p>
            <div className="w-16 sm:w-24 h-1 bg-teal-400 mx-auto"></div>
          </div>
        </div>

        {/* Wave shape divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 120"
            fill="#ffffff"
          >
            <path d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,96C1120,96,1280,64,1360,48L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-6 sm:py-8 w-full">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 md:mb-12 items-center w-full">
          <div className="w-full md:w-3/5 px-0 sm:px-2" ref={contentRef}>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-800 mb-3 md:mb-4">
              Our Story
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-3 md:mb-4 text-gray-700">
              Welcome to{" "}
              <span className="font-semibold text-teal-600">MediCare</span>,
              your trusted partner in modern pharmaceutical inventory and
              billing solutions. Since 2025, we've streamlined pharmacy
              operations with smart, user-friendly software.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              From product stocking to fast billing and order tracking, MediCare
              supports large chains. Backed by pharmaceutical expertise and
              advanced tech, we deliver solutions for real-world pharmacy
              management challenges.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-6 mt-4 md:mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-teal-100 rounded-full p-2">
                  <FaUsers className="text-teal-600 text-lg" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">1000+</p>
                  <p className="text-xs text-gray-600">Satisfied Clients</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-teal-100 rounded-full p-2">
                  <FaLightbulb className="text-teal-600 text-lg" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">5+</p>
                  <p className="text-xs text-gray-600">Years Experience</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="bg-teal-100 rounded-full p-2">
                  <FaClock className="text-teal-600 text-lg" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">24/7</p>
                  <p className="text-xs text-gray-600">Support</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 mt-6 md:mt-0 px-2">
            <div className="relative max-w-sm mx-auto md:max-w-none">
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 border-t-4 border-l-4 border-teal-500"></div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 border-b-4 border-r-4 border-teal-500"></div>
              <img
                src={OverviewImg}
                className="rounded-lg shadow-xl w-full object-cover z-10 relative"
                alt="PharmaCare Overview"
                style={{ 
                  maxWidth: '100%',
                  height: contentHeight
                }}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8 sm:mb-12 py-2 sm:py-4 w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-2 sm:mb-3">
              Why Choose MediCare?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-bold px-4">
              A powerful suite built to tackle real-world pharmacy management
              challenges.
            </p>
            <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-2 md:px-4">
            {[
              {
                title: "Real-time Inventory Management",
                desc: "Stay informed with instant updates and alerts on stock levels, ensuring timely restocking and uninterrupted service.",
                color: "teal",
                icon: "📦",
              },
              {
                title: "Intuitive User Interface",
                desc: "From setup to daily use, it's built for speed, simplicity, and smooth onboarding.",
                color: "blue",
                icon: "🖥️",
              },
              {
                title: "Custom Reporting",
                desc: "Track, analyze, and optimize, with smart reports covering inventory, sales, and performance metrics.",
                color: "purple",
                icon: "📊",
              },
              {
                title: "Dedicated Support",
                desc: "Our dedicated experts are here to ensure you get the most out of MediCare, every step of the way.",
                color: "teal",
                icon: "🤝",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-teal-500 group"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="bg-teal-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-teal-600 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-8 sm:mb-12 w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-2 sm:mb-3">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto px-4 font-bold">
              The talented professionals behind MediCare innovation and
              success.
            </p>
            <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-2 md:px-4">
            {[
              {
                name: "Nikita Patil",
                role: "Software Developer",
                stack: "React, Tailwind CSS, JS, REST API",
                img: TeamP1,
                linkedin: "https://www.linkedin.com/in/nikita-patil-39aa0222a/",
                twitter: "https://twitter.com/nikitapatil",
                email: "mailto:nikitapatil9423@gmail.com",
                color: "teal",
              },
              {
                name: "Paras Kurnjekar",
                role: "Backend Developer",
                stack: "Node.js, Express, MySQL, Rest API",
                img: TeamP2,
                linkedin: "https://www.linkedin.com/in/paras-kuranjekar/",
                twitter: "https://twitter.com/paraskurnjekar",
                email: "mailto:paraskuranjekar@gmail.com",
                color: "blue",
              },
              {
                name: "Mukta Wagh",
                role: "Associate Developer",
                stack: "HTML, CSS, JS, SQL, MySQL, Rest API",
                img: TeamP3,
                linkedin: "https://www.linkedin.com/in/mukta-wagh/",
                twitter: "https://twitter.com/",
                email: "mailto:mukta3725@gmail.com",
                color: "green",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl"
              >
                <div className="h-1 bg-teal-500"></div>
                <div className="p-3 sm:p-4">
                  <div className="mb-3 sm:mb-4 mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-teal-100 shadow-md">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-teal-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-black font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-xs mb-3 pb-3 border-b border-gray-100">
                      <span className="font-medium">Tech Stack:</span>{" "}
                      {member.stack}
                    </p>

                    <div className="flex justify-center gap-4 sm:gap-5 text-gray-400">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-600 transition-colors text-lg sm:text-xl"
                        title="LinkedIn"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-600 transition-colors text-lg sm:text-xl"
                        title="Twitter"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={member.email}
                        className="hover:text-sky-600 transition-colors text-lg sm:text-xl"
                        title="Email"
                      >
                        <FaEnvelope />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Section */}
        <div className="mb-8 sm:mb-12 w-full">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-800 mb-2 sm:mb-3">
              Special Thanks to Our Mentors 
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-teal-500 mx-auto mt-3 sm:mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-2 md:px-4">
            {[
              {
                name: "Dr.Kiran Waghmare",
                description: "Course Co-ordinator",
                img: Mentor1,
              },
              {
                name: "Manoj More",
                description: "Lab Faculty",
                img: Mentor2,
              },
              {
                name: "Aniket Takmare",
                description: "Spot Evaluator",
                img: Mentor3,
              },
            ].map((mentor, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl"
              >
                <div className="h-1 bg-teal-500"></div>
                <div className="p-3 sm:p-4">
                  <div className="mb-3 sm:mb-4 mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-teal-100 shadow-md">
                    <img
                      src={mentor.img}
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-teal-600 transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-gray-600 text-xs mb-3 pb-3 border-b border-gray-100">
                      <span className="font-medium"></span>{" "}
                      {mentor.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-4 sm:px-6 py-6 sm:py-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                Ready to transform your pharmacy operations?
              </h2>
              <p className="text-teal-100 text-sm mb-4 sm:mb-6 max-w-2xl mx-auto">
                Join the thousands of pharmacies that have streamlined their
                operations with MediCare.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white text-teal-700 px-5 sm:px-6 py-2 rounded-full font-semibold hover:bg-teal-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Force browser to apply styles consistently
// Apply these styles before component renders
// This helps with browser compatibility issues
const forceConsistentStyles = () => {
  // Ensure document has proper box-sizing
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        box-sizing: border-box !important;
      }
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        overflow-x: hidden;
      }
      .container {
        width: 100% !important;
        max-width: 1280px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }
      @media (min-width: 640px) {
        .container {
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

// Try to apply these styles when component mounts
if (typeof window !== 'undefined') {
  forceConsistentStyles();
}

export default AboutUs;