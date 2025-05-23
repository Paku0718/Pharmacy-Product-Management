import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from '../assets/images/login.png';

const SignupPage = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userType, setUserType] = useState("user");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formErrors, setFormErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Password strength indicators
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    // Update password strength indicators whenever password changes
    useEffect(() => {
        setPasswordStrength({
            length: password.length >= 6,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_\-+=<>?{}[\]~]/.test(password)
        });
    }, [password]);

    // Check if all password requirements are met
    const isPasswordStrong = () => {
        return Object.values(passwordStrength).every(value => value === true);
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: ""
        };
        
        // Username validation
        if (!username.trim()) {
            errors.username = "Username is required";
            isValid = false;
        } else if (!/^[a-zA-Z\s]{3,30}$/.test(username.trim())) {
            errors.username = "Username must be 3-30 characters and contain only letters and spaces";
            isValid = false;
        }
        
        // Email validation
        if (!email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            errors.email = "Please enter a valid email address";
            isValid = false;
        }
        
        // Password validation
        if (!password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (!isPasswordStrong()) {
            errors.password = "Password does not meet strength requirements";
            isValid = false;
        }
        
        // Confirm password validation
        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            isValid = false;
        }
        
        // Terms validation
        if (!termsAccepted) {
            errors.terms = "You must accept the terms and conditions";
            isValid = false;
        }
        
        setFormErrors(errors);
        return isValid;
    };

    const signupSubmit = async (userDetails) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
                credentials: "include" // Include cookies in the request
            });

            if (res.ok) {
                toast.success("Signup successful! Please check your email for verification.");
                navigate("/login");
            } else {
                const errorData = await res.json();
                // Handle specific error responses
                if (errorData.error === "EMAIL_EXISTS") {
                    toast.error("This email is already registered. Please use a different email or login.");
                } else if (errorData.error === "USERNAME_EXISTS") {
                    toast.error("This username is already taken. Please choose a different one.");
                } else {
                    toast.error(errorData.message || "Signup failed. Please try again.");
                }
            }
        } catch (error) {
            toast.error("Connection error. Please check your internet and try again later.");
            console.error("Signup error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const userDetails = {
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password,
                userType,
            };
            
            signupSubmit(userDetails);
        } else {
            toast.error("Please correct the errors in the form");
        }
    };

    // Debounced input handlers to prevent excessive validation
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUserName(value);
        
        // Clear error when user starts typing
        if (formErrors.username) {
            setFormErrors({...formErrors, username: ""});
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        
        // Clear error when user starts typing
        if (formErrors.email) {
            setFormErrors({...formErrors, email: ""});
        }
    };

    // Validate on blur
    const validateUsername = () => {
        if (!username.trim()) {
            setFormErrors({...formErrors, username: "Username is required"});
            return;
        }
        
        if (!/^[a-zA-Z\s]{3,30}$/.test(username.trim())) {
            setFormErrors({...formErrors, username: "Username must be 3-30 characters and contain only letters and spaces"});
        } else {
            setFormErrors({...formErrors, username: ""});
        }
    };

    const validateEmail = () => {
        if (!email.trim()) {
            setFormErrors({...formErrors, email: "Email is required"});
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setFormErrors({...formErrors, email: "Please enter a valid email address"});
        } else {
            setFormErrors({...formErrors, email: ""});
        }
    };

    // Password input handler
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        
        // Clear error when user starts typing
        if (formErrors.password) {
            setFormErrors({...formErrors, password: ""});
        }
    };

    // Confirm password input handler
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        
        // Clear error when user starts typing
        if (formErrors.confirmPassword) {
            setFormErrors({...formErrors, confirmPassword: ""});
        }
    };

    // Validate confirm password on blur
    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setFormErrors({...formErrors, confirmPassword: "Passwords do not match"});
        } else {
            setFormErrors({...formErrors, confirmPassword: ""});
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-teal-50"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full my-8">
                <div className="w-1/2 bg-teal-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome Back!</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        To keep connected with us, please login with your personal info
                    </p>
                    <Link to="/login">
                        <button className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600">
                            Sign In
                        </button>
                    </Link>
                </div>

                <div className="w-1/2 bg-white p-8 flex flex-col justify-center rounded-r-lg">
                    <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Create Account</h2>
                    <form onSubmit={submitForm} noValidate className="space-y-4">
                        <div className="mb-1">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={username}
                                onChange={handleUsernameChange}
                                onBlur={validateUsername}
                                className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                    formErrors.username ? "border-red-500" : ""
                                }`}
                                required
                                maxLength={30}
                            />
                            {formErrors.username && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.username}</p>
                            )}
                        </div>
                        
                        <div className="mb-1">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={validateEmail}
                                className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                    formErrors.email ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                            )}
                        </div>
                        
                        <div className="mb-1">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                    formErrors.password ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {formErrors.password && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                            )}
                            
                            {/* Password strength indicator */}
                           
                        </div>
                        
                        <div className="mb-1">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                onBlur={validateConfirmPassword}
                                className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                    formErrors.confirmPassword ? "border-red-500" : ""
                                }`}
                                required
                            />
                            {formErrors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                            )}
                        </div>
                        
                        <div className="mb-1">
                            <select
                                id="userType"
                                name="userType"
                                className="border rounded w-full py-2 px-3"
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center mb-1">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                checked={termsAccepted}
                                onChange={(e) => {
                                    setTermsAccepted(e.target.checked);
                                    if (e.target.checked) {
                                        setFormErrors({...formErrors, terms: ""});
                                    }
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I accept the <a href="#" className="text-teal-500 hover:underline">Terms and Conditions</a>
                            </label>
                        </div>
                        {formErrors.terms && (
                            <p className="text-red-500 text-xs">{formErrors.terms}</p>
                        )}
                        
                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="submit"
                                className={`bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600 w-full ${
                                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-teal-500 hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;  