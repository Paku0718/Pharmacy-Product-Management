import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Facebook, Twitter, Instagram, ChevronUp, Phone, MapPin, Heart } from 'lucide-react'

const Footer = () => {
    const [showLinks, setShowLinks] = useState(false)
    const [likedCount, setLikedCount] = useState(0)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleLike = () => {
        setLikedCount(prev => prev + 1)
    }

    return (
        <footer className="bg-teal-50 text-gray-800 px-4 py-2 shadow-inner mx-5 mb-5">
            <div className="max-w-6xl mx-auto">
            

                {/* Copyright and Back to Top */}
                <div className="text-center pt-4 border-t border-teal-200 flex flex-col md:flex-row items-center justify-center">
                    <p className=" text-gray-950 font-bold">Copyright @2025, MediCare - All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer