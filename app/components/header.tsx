"use client";
import { useClerk } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut, FiZap } from "react-icons/fi";
import Select from "react-select";
import { supportedLanguages } from "../data";
import { useParams, useRouter } from "next/navigation";
import { Layout } from "../type";

const Header = ({ dict }: { dict: Layout }) => {
    const { signOut } = useClerk();
    const { lang } = useParams();
    const router = useRouter();
    return (
        <header className="fixed top-0 w-full bg-blue-600 h-14 px-4 md:px-6 flex items-center justify-between shadow-md z-50">
            <Toaster position="top-left" reverseOrder={false} />

            {/* Logo & Title */}
            <div className="flex items-center gap-2">
                <FiZap size={24} className="text-white" />
                <h1 className="text-lg! md:text-2xl! !text-white font-semibold">
                    {dict.title}
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <Select
                    options={supportedLanguages}
                    className="w-24 md:w-36"
                    onChange={(e) => router.push(e!.value!.toString())}
                    defaultValue={[{ value: lang, label: supportedLanguages.find(({ value }) => value === lang)?.label }]}
                    classNames={{
                        control: () => "!text-sm !md:text-md border-gray-300 shadow-sm",
                        menu: () => "bg-white border border-gray-200 shadow-md",
                    }}
                />
                <button
                    onClick={() => {
                        signOut();
                        toast.success("Signed out successfully!");
                    }}
                    className="flex items-center gap-2 bg-white text-blue-600 text-sm md:text-base px-3 md:px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
                >
                    <FiLogOut size={18} />
                    <span className="hidden sm:inline">{dict.sign_out}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
