import { useEffect } from "react";
import { FiX } from "react-icons/fi";

const HtmlPreviewModal = ({ isOpen, onClose, htmlContent }: { isOpen: boolean; onClose: () => void, htmlContent: string }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden"); // Disable scrolling
        } else {
            document.body.classList.remove("overflow-hidden"); // Enable scrolling
        }
        const handleKeyDown = (e: { key: string; }) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-200/20 backdrop-blur-lg  bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg h-3/4 relative">
                {/* Close Button */}
                <button onClick={onClose} className="text-white !bg-red-600 hover:!bg-red-700 !rounded-full !p-2 transition absolute top-2 right-2">
                    <FiX size={20} />
                </button>
                {/* <button
                    onClick={}
                    className="absolute top-2 right-2 !bg-gray-300 !hover:bg-gray-400 !text-gray-800 rounded-full p-2"
                >
                    ✕
                </button> */}

                {/* Preview Content */}
                <iframe
                    className="w-full h-full border-none"
                    srcDoc={htmlContent}
                    title="HTML Preview"
                />
            </div>
        </div>
    );
};

export default HtmlPreviewModal;
