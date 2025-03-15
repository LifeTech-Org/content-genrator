"use client";
import { useClerk } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut, FiZap } from "react-icons/fi";

const Header = () => {
    const { signOut } = useClerk();

    return (
        <header className="fixed top-0 w-full bg-blue-600 h-14 px-4 md:px-6 flex items-center justify-between shadow-md z-50">
            <Toaster position="top-left" reverseOrder={false} />

            {/* Logo & Title */}
            <div className="flex items-center gap-2">
                <FiZap size={24} className="text-white" />
                <h1 className="text-lg! md:text-2xl! !text-white font-semibold">
                    Content Generator
                </h1>
            </div>
            <button
                onClick={() => {
                    signOut();
                    toast.success("Signed out successfully!");
                }}
                className="flex items-center gap-2 bg-white text-blue-600 text-sm md:text-base px-3 md:px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
                <FiLogOut size={18} />
                <span className="hidden sm:inline">Sign Out</span>
            </button>
        </header>
    );
};

export default Header;
