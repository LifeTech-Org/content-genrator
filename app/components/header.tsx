"use client"
import { useClerk } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut, FiZap } from "react-icons/fi";

const Header = () => {
    const { signOut } = useClerk();

    return (
        <header className="flex fixed w-full z-50 items-center justify-between bg-blue-600 h-16 px-6 shadow-md">
            <Toaster position="top-left" reverseOrder={false} />
            <div className="flex items-center gap-2">
                <FiZap size={28} className="text-white" />
                <h1 className="!text-2xl !text-white">
                    Content Generator
                </h1>
            </div>
            <button
                onClick={() => {
                    signOut();
                    toast.success("Signed out successfully!");
                }}
                className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
                <FiLogOut size={18} />
                <span className="font-medium">Sign Out</span>
            </button>
        </header>
    );
}


export default Header;