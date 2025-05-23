import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Mail, Facebook, Twitter, Instagram, Phone, MapPin, AlertCircle, ChevronDown } from 'lucide-react'

// Country codes for phone numbers
const countryCodes = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+91', name: 'India' },
    { code: '+61', name: 'Australia' },
    { code: '+86', name: 'China' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+81', name: 'Japan' },
    { code: '+7', name: 'Russia' },
    { code: '+55', name: 'Brazil' },
    { code: '+27', name: 'South Africa' },
];

const ContactPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        countryCode: '+91',
        phoneNumber: '',
        message: '',
    });
    
    const [errors, setErrors] = useState({
        email: '',
        phoneNumber: '',
        message: '',
    });
    
    const [formStatus, setFormStatus] = useState({
        message: '',
        isSuccess: false,
        isSubmitting: false
    });
    
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validatePhoneNumber = (phone) => {
        // Regex for phone numbers with 10-12 digits
        const phoneRegex = /^\d{10,12}$/;
        if (!phone.trim()) return 'Phone number is required';
        if (!phoneRegex.test(phone)) return 'Please enter a valid phone number (10-12 digits)';
        return '';
    };

    const validateMessage = (message) => {
        if (!message.trim()) return 'Message is required';
        if (message.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear the error for this field when the user types
        setErrors({
            ...errors,
            [name]: ''
        });
    };
    
    // Handle country code selection
    const selectCountryCode = (code) => {
        setFormData({
            ...formData,
            countryCode: code
        });
        setShowCountryDropdown(false);
    };

    // Validate a single field
    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'email':
                return validateEmail(value);
            case 'phoneNumber':
                return validatePhoneNumber(value);
            case 'message':
                return validateMessage(value);
            default:
                return '';
        }
    };

    // Handle blur event to validate as user leaves each field
    const handleBlur = (e) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);
        
        setErrors(prev => ({
            ...prev,
            [name]: errorMessage
        }));
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {
            email: validateEmail(formData.email),
            phoneNumber: validatePhoneNumber(formData.phoneNumber),
            message: validateMessage(formData.message)
        };
        
        setErrors(newErrors);
        
        // Return true if there are no errors (all values in newErrors object are empty strings)
        return Object.values(newErrors).every(error => error === '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Return early if validation fails
        if (!validateForm()) {
            setFormStatus({
                message: 'Please fix the errors in the form.',
                isSuccess: false,
                isSubmitting: false
            });
            return;
        }
        
        setFormStatus({
            message: '',
            isSuccess: false,
            isSubmitting: true
        });

        const contactData = {
            email: formData.email,
            mobileNumber: `${formData.countryCode}${formData.phoneNumber}`,
            message: formData.message,
        };

        try {
            const response = await fetch('api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (response.ok) {
                setFormStatus({
                    message: 'Thank you! Your message has been sent.',
                    isSuccess: true,
                    isSubmitting: false
                });
                setFormData({
                    email: '',
                    countryCode: '+91',
                    phoneNumber: '',
                    message: ''
                });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            setFormStatus({
                message: `An error occurred: ${error.message || 'Please try again.'}`,
                isSuccess: false,
                isSubmitting: false
            });
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex-1 bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('https://img.freepik.com/free-photo/top-view-blue-monday-concept-composition-with-telephone_23-2149139103.jpg?size=626&ext=jpg&ga=GA1.1.414470015.1718158445&semt=ais_hybrid')" }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-4">
                    {/* Contact Form */}
                    <div className="col-span-2 bg-white bg-opacity-90 rounded-lg shadow-md p-4">
                        <h1 className="text-2xl font-bold mb-2 text-teal-800">Contact Us</h1>
                        
                        {/* Form Status Message */}
                        {formStatus.message && (
                            <div className={`mb-3 p-2 rounded text-sm flex items-center ${formStatus.isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {!formStatus.isSuccess && <AlertCircle className="w-4 h-4 mr-1" />}
                                {formStatus.message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit} className="space-y-2">
                            {/* Email Field */}
                            <div>
                                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="email">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500 ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                            
                            {/* Phone Number Field with Country Code */}
                            <div>
                                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="phoneNumber">
                                    Phone Number:
                                </label>
                                <div className="flex">
                                    {/* Country Code Dropdown */}
                                    <div className="relative w-24">
                                        <button 
                                            type="button"
                                            className="flex items-center justify-between w-full p-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50"
                                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                        >
                                            <span>{formData.countryCode}</span>
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                        
                                        {/* Country Dropdown Menu */}
                                        {showCountryDropdown && (
                                            <div className="absolute z-10 w-48 mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                                                {countryCodes.map((country) => (
                                                    <button
                                                        key={country.code}
                                                        type="button"
                                                        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center"
                                                        onClick={() => selectCountryCode(country.code)}
                                                    >
                                                        <span className="w-12">{country.code}</span>
                                                        <span className="ml-2 text-gray-700">{country.name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Phone Number Input */}
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        placeholder="10-12 digits"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maxLength={12}
                                        className={`flex-1 p-2 border border-l-0 rounded-r focus:outline-none focus:ring-1 focus:ring-teal-500 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                                )}
                                <p className="text-gray-500 text-xs mt-1">Enter 10-12 digits without spaces or dashes</p>
                            </div>
                            
                            {/* Message Field */}
                            <div>
                                <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="message">
                                    Message:
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Enter your message..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-teal-500 ${errors.message ? 'border-red-500' : ''}`}
                                    rows="3"
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                                )}
                            </div>
                            
                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={formStatus.isSubmitting}
                                className={`bg-teal-800 text-white font-bold py-1 px-4 rounded-full hover:bg-teal-500 text-sm transition-colors ${formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="bg-teal-800 bg-opacity-90 rounded-lg shadow-md p-4 text-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span className="text-sm">+91 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span className="text-sm">info@medicare.com</span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span className="text-sm">19 MediCare, Kothrud City, Pune-411038</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Social Media Icons */}
                        <div className="mt-4">
                            <h3 className="text-sm font-bold mb-2">Connect With Us</h3>
                            <div className="flex space-x-3">
                                <a href="#" className="bg-white text-teal-800 p-1 rounded-full hover:bg-teal-100 transition-colors" aria-label="Facebook">
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a href="#" className="bg-white text-teal-800 p-1 rounded-full hover:bg-teal-100 transition-colors" aria-label="Twitter">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="bg-white text-teal-800 p-1 rounded-full hover:bg-teal-100 transition-colors" aria-label="Instagram">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Copyright and Back to Top */}
            <div className="text-center pt-4 border-t border-teal-200 flex flex-col md:flex-row items-center justify-center mb-5 bg-teal-50">
                <p className="text-gray-950 font-bold">Copyright @2025, MediCare - All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default ContactPage;