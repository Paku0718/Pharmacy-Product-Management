import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaArrowLeft, FaShoppingCart, FaBox } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ProductPage = () => {
    const { id } = useParams();
    const product = useLoaderData();
    const navigate = useNavigate();
    const [userType, setUserType] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

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

    const cartAdding = async () => {
        if (Number(quantity) > product.productQuantity) {
            toast.error('Quantity exceeds available stock!');
            return;
        }

        if (Number(quantity) <= 0) {
            toast.error('Quantity must be greater than zero!');
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/add/${id}/${quantity}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', 
                body: JSON.stringify({ id, quantity, productName: product.productName, productPrice: product.productPrice })
            });

            if (res.ok) {
                toast.success('Added to cart successfully!');
                navigate('/cart-page');
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to add product to cart');
            }
        } catch (error) {
            toast.error('Error adding product to cart');
            console.error('Error adding product to cart:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async () => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (!confirm) return;

        setIsLoading(true);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                toast.success('Product deleted successfully!');
                navigate("/products");
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || 'Failed to delete product');
            }
        } catch (error) {
            toast.error('Error deleting product');
            console.error('Error deleting product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || '';
        setQuantity(value);
    };

    return (
        <div className="bg-gradient-to-b from-white to-teal-50 text-gray-900 mt-4 min-h-full mb-28">
            <div className="max-w-6xl mx-auto p-5">
                <div className="flex items-center mb-6 text-teal-800">
                    <Link className="flex items-center gap-2 font-medium hover:text-teal-600 transition-colors" to="/products">
                        <FaArrowLeft className="text-sm" />
                        <span>Back to Products</span>
                    </Link>
                </div>
                
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-teal-100 mb-16">
                    <div className="md:flex">
                        {/* Left side - Placeholder image */}
                        <div className="md:w-2/5 bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center p-8">
                            <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center">
                                <FaBox className="text-white text-6xl" />
                            </div>
                        </div>
                        
                        {/* Right side - Product details */}
                        <div className="md:w-3/5 p-8">
                            <div className="mb-6">
                                <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.productName}</h1>
                                <div className="flex items-center">
                                    <span className="text-3xl font-bold text-teal-600">₹{product.productPrice}</span>
                                    {userType === 'admin' && (
                                        <span className="ml-4 bg-teal-100 text-teal-800 text-sm font-semibold px-3 py-1 rounded-full">
                                            Stock: {product.productQuantity}
                                        </span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold text-gray-700 mb-2">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{product.productDescription}</p>
                            </div>
                            
                            {userType === 'user' && (
                                <div className="mb-6">
                                    <div className="flex flex-wrap items-end gap-4">
                                        <div className="w-24">
                                            <label className="block text-sm text-gray-600 mb-1">Quantity</label>
                                            <input
                                                type="number"
                                                id="quantity"
                                                name="quantity"
                                                className="w-full border-2 border-teal-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                                min="1"
                                                max={product.productQuantity}
                                                value={quantity}
                                                onChange={handleQuantityChange}
                                            />
                                        </div>
                                        <button 
                                            onClick={cartAdding} 
                                            disabled={isLoading}
                                            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            <FaShoppingCart />
                                            {isLoading ? 'Adding...' : 'Add to Cart'}
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {product.productQuantity > 0 
                                            ? `Available Stock: ${product.productQuantity}` 
                                            : 'Out of Stock'
                                        }
                                    </p>
                                </div>
                            )}
                            
                            {userType === "admin" && (
                                <div className="flex gap-4 mt-8">
                                    <Link
                                        to={`/edit-product/${id}`}
                                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 ease-in-out"
                                    >
                                        <FaEdit />
                                        Edit Product
                                    </Link>
                                    <button
                                        onClick={deleteProduct}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 ease-in-out"
                                    >
                                        <FaTrash />
                                        {isLoading ? 'Deleting...' : 'Delete Product'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const productLoader = async ({ params }) => {
    const res = await fetch(`/api/products/${params.id}`);
    const data = await res.json();
    return data;
};

export { ProductPage as default, productLoader };