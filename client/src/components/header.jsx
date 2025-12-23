import { Settings, MessageCircle, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AddContact } from "./addContect";

export const Header = () => {
    const [isAddContactOpen, setIsAddContactOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('chattoken')
        localStorage.removeItem('chatemail')
        localStorage.removeItem('chatuserid')
        navigate('/login');
    }

    return (
        <>
            <div className="flex flex-col gap-3 relative">
                {/* Top Row (Title + Buttons) */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold mt-1 bg-gradient-to-b from-violet-600 to-violet-500 bg-clip-text text-transparent self-start">
                        Messages
                    </h1>
                    <div className="flex gap-2 relative">
                        <button className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors">
                            {/* <MessageCircle className="w-4 h-4 text-white" /> */}
                        </button>
                        
                        {/* Settings Button */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors"
                            >
                                <Settings className="w-4 h-4 text-white" />
                            </button>

                            {/* Dropdown */}
                            {isSettingsOpen && (
                                <div className="absolute right-0 top-8 w-32 bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg z-20">
                                    {/* Arrow / Puchh */}
                                    <div className="absolute -top-2 right-2 w-0 h-0 
                                        border-l-6 border-r-6 border-b-6 
                                        border-transparent border-b-[#1e1e1e]">
                                    </div>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-md transition-colors duration-200"
                                    >
                                        Log out
                                    </button>

                                    <button
                                        onClick={() =>{ 
                                            setIsSettingsOpen(false);
                                            setIsAddContactOpen(true);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded-md transition-colors duration-200"
                                    >
                                        Add Contact
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Search Box (Optional) */}
                {/* <div className="relative flex justify-center p-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-3 bg-[#1e1e1e] text-sm text-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 placeholder-gray-400"
                    />
                </div> */}
                
                <div className="border-b border-border mt-2 text-gray-600"></div>
            </div>
            
            {/* Add Contact Modal */}
            {isAddContactOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-[#121212] bg-opacity-90 z-50">
                    <AddContact setIsAddContactOpen={setIsAddContactOpen}/>
                </div>
            )}
        </>
    );
};