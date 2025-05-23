import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaClipboardList, FaEnvelopeOpenText, FaPlusCircle } from 'react-icons/fa';

const AdminPage = () => {
    const cards = [
        {
            title: 'Orders',
            icon: <FaClipboardList size={40} />,
            link: '/pres',
            color: 'from-teal-400 to-cyan-500'
        },
        {
            title: 'Products',
            icon: <FaBoxOpen size={40} />,
            link: '/products',
            color: 'from-indigo-400 to-purple-500'
        },
        {
            title: 'Messages',
            icon: <FaEnvelopeOpenText size={40} />,
            link: '/message',
            color: 'from-pink-400 to-red-500'
        },
        {
            title: 'Add Product',
            icon: <FaPlusCircle size={40} />,
            link: '/add-product',
            color: 'from-orange-400 to-yellow-500'
        }
    ];

    return (
        <div className="max-h-screen text-white flex flex-col items-center py-12 px-6 mb-10">
            <h1 className="text-5xl font-extrabold mb-14 bg-clip-text text-transparent bg-teal-800">
                Welcome, Admin
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full">
                {cards.map((card, index) => (
                    <Link
                        key={index}
                        to={card.link}
                        className={`bg-gradient-to-br ${card.color} bg-opacity-30 backdrop-blur-md p-8 rounded-3xl shadow-lg transform hover:scale-105 transition-all duration-300 group`}
                    >
                        <div className="flex items-center space-x-6">
                            <div className="p-4 bg-white/10 rounded-full text-white group-hover:rotate-6 transition-transform duration-300">
                                {card.icon}
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold mb-1">{card.title}</h2>
                                <p className="text-sm opacity-80">Click to manage {card.title.toLowerCase()}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;
