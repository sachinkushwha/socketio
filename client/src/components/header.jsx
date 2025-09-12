import { Settings, MessageCircle, Search } from "lucide-react";

export const Header = () => {
    return (
        <>
            <div className="flex flex-col gap-3">
                {/* Top Row (Title + Buttons) */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold mt-1 bg-gradient-to-b from-violet-600 to-violet-500 bg-clip-text text-transparent self-start">
                        Messages
                    </h1>
                    <div className="flex gap-2">
                        <button className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors">
                            <MessageCircle className="w-4 h-4 text-white" />
                        </button>
                        <button className="p-2 cursor-pointer hover:bg-muted rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>

                {/* Search Box (Niche) */}
                <div className="relative flex justify-center p-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-3 bg-[#1e1e1e] text-sm text-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-500 placeholder-gray-400"
                    />
                </div>
                 <div className="border-b border-border mt-2 text-gray-600"></div>
            </div>
        </>
    );
};
