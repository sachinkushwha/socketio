import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AddContact = ({ setiscontact }) => {
    const [email, setemail] = useState("");
    const navigate = useNavigate();
    
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        const data = {
            email: email
        }
        const response = await fetch('https://socketio-q50f.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('chattoken')
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result);
        setiscontact(false);
        window.location.href = '/';
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4">
            {/* Back Button */}
            <div className="absolute top-6 left-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>X</span>
                </button>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-md">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-violet-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Add New Contact</h1>
                        <p className="text-gray-400">Enter the email address to connect</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handlesubmit} className="space-y-6">
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="id"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    placeholder="contact@example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Add Contact
                            </div>
                        </button>
                    </form>

                    {/* Help Text */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <p className="text-sm text-gray-400 text-center">
                            The contact will appear in your chat list once they accept your request
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};