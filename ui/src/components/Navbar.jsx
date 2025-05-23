import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/images/Medicare Logo With Plus.png'

const Navbar = () => {
    const [userType, setUserType] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserType = () => {
            const authToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('Authtoken'))
                ?.split('=')[1];
            if (authToken) {
                const decoded = jwtDecode(authToken);
                return decoded.userType;
            }
            return null;
        };

        setUserType(getUserType());
    }, []);

    const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
        });
        setUserType(null);
        navigate('/');
    };

    return (
        <div className="bg-teal-800">
            <nav className="text-teal-50 p-3 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center px-4">

                    {/* Logo and Brand */}
                    <Link to="/" className="flex items-center space-x-3 h-16 w-44">
                        <img
                            src={logoImg}
                            alt="MediCare Logo"
                            className="h-16 w-44"
                        />
                    </Link>

                    {/* Hamburger menu */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Nav Links */}
                    <ul className={`flex-col md:flex-row md:flex md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-teal-800 md:bg-transparent space-y-4 md:space-y-0 md:space-x-8 px-6 md:px-0 transition-all duration-300 ease-in-out ${isOpen ? 'flex' : 'hidden'}`}>
                        <li><Link to="/" className="font-bold text-sm md:text-lg hover:underline hover:decoration-green-600">Home</Link></li>
                        <li><Link to="/about" className="font-bold text-sm md:text-lg hover:underline hover:decoration-green-600">About Us</Link></li>
                        <li><Link to="/products" className="font-bold text-sm md:text-lg hover:underline hover:decoration-green-600">Products</Link></li>
                        <li><Link to="/contact" className="font-bold text-sm md:text-lg hover:underline hover:decoration-green-600">Contact Us</Link></li>
                        {userType === 'admin' && (
                            <li><Link to="/admin" className="font-bold text-sm md:text-lg hover:underline hover:decoration-green-600">Dashboard</Link></li>
                        )}
                        {userType === 'user' && (
                            <li><Link to="/profile" className="font-bold text-sm md:text-lg hover:underline hover:decoration-green-600">Profile</Link></li>
                        )}
                        <li>
                            {userType ? (
                                <button onClick={handleLogout} className="bg-white text-teal-500 font-bold px-4 py-2 rounded-full hover:bg-gray-100 hover:text-teal-600">
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="bg-white text-teal-500 font-bold px-4 py-2 rounded-full hover:bg-gray-100 hover:text-teal-600">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
