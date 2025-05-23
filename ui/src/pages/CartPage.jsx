import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Mail, Facebook, Twitter, Instagram, ChevronUp, Phone, MapPin, Heart } from 'lucide-react'


const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('cartdata', data.user.cart);

                setCart(data.user.cart);
                calculateTotal(data.user.cart);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };
        fetchCart();
    }, []);

    const handleQuantityChange = async (productId, quantity) => {
        try {
            const response = await fetch('/api/cart/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, quantity }),
            });
            const data = await response.json();
            if (response.ok) {
                const updatedCart = cart.map(item =>
                    item.productId === productId ? { ...item, quantity } : item
                );
                setCart(updatedCart);
                calculateTotal(updatedCart);
            } else {
                console.error('Error updating cart:', data.error);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const response = await fetch('/api/remove', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });
            const data = await response.json();
            if (response.ok) {
                const updatedCart = cart.filter(item => item.productId !== productId);
                setCart(updatedCart);
                calculateTotal(updatedCart);
            } else {
                console.error('Error removing item from cart:', data.error);
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const calculateTotal = (cart) => {
        let newTotal = cart.reduce((acc, item) => {
            return acc + item.productPrice * item.quantity;
        }, 0);
        setTotal(newTotal);
    };

    return (
        <>
            <Navbar/>
            <main className="container mx-auto mt-8 max-w-full">
                <section className="text-center">
                    <h2 className="text-4xl mb-4 font-bold text-teal-800">Shopping Cart</h2>
                    <div className="bg-white p-8 rounded shadow-lg w-3/4 mx-auto mt-8">
                        <table className="min-w-full">
                            <thead>
                                <tr className="w-full bg-gray-100">
                                    <th className="py-2 bg-teal-800 text-white">Items</th>
                                    <th className="py-2 bg-teal-800 text-white">Rate</th>
                                    <th className="py-2 bg-teal-800 text-white">Quantity</th>
                                    <th className="py-2 bg-teal-800 text-white">Total</th>
                                    <th className="py-2 bg-teal-800 text-white">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    
                                    <tr key={item.productId}>
                                        <td className="py-2">{item.productName}</td>
                                        <td className="py-2">₹ {item.productPrice}</td>
                                        <td className="py-2">{item.quantity}</td>
                                        <td className="py-2">₹ {item.productPrice * item.quantity}</td>
                                        <td className="py-2 text-center">
                                            <button
                                                className="text-rose-600 px-4 py-2 rounded"
                                                onClick={() => handleRemove(item.productId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <p className="font-bold">Total: ₹ {total}</p>
                        </div>
                        <div className="flex mt-4 justify-center gap-6">
                            <Link to="/products" className="bg-teal-800 text-white font-bold py-2 px-4 rounded shadow mt-4 inline-block hover:bg-teal-600">Back to products</Link>
                            <Link to="/checkout" className="bg-teal-800 text-white font-bold py-2 px-4 rounded shadow mt-4 inline-block hover:bg-teal-600">Proceed to Checkout</Link>
                        </div>
                    </div>
                    <div className="max-w-6xl mx-auto">
        
                {/* Copyright and Back to Top */}
                <div className="text-center pt-4 border-t border-teal-200 flex flex-col md:flex-row items-center justify-center mt-16 bg-teal-50">
                    <p className=" text-gray-950 font-bold">Copyright @2025, MediCare - All Rights Reserved.</p>
                </div>
            </div>
                </section>
            </main>
            
            
        </>
    );
};

export default CartPage;
