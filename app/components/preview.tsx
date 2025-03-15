import { FiSave, FiX, FiSend } from "react-icons/fi";
import { TFormData } from "../type";
import toast, { Toaster } from "react-hot-toast";

const FormPreviewModal = ({ formData, onClose, onSubmit }: { formData: TFormData; onClose: () => void; onSubmit: () => void }) => {
    const saveTemplate = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "template.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);

        toast.success("Template saved successfully!");
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <div className="fixed inset-0 bg-gray-200/20 backdrop-blur-lg flex items-center justify-center p-4 z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full relative">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Form Preview</h2>
                        <button onClick={onClose} className="text-white !bg-red-600 hover:!bg-red-700 rounded-full p-2 transition">
                            <FiX size={20} />
                        </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto border p-4 rounded-lg bg-gray-100">
                        <pre className="text-sm text-gray-700">{JSON.stringify(formData, null, 2)}</pre>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={saveTemplate}
                            className="flex items-center gap-2 !bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:!bg-blue-700 transition-all transform hover:scale-105 active:scale-100"
                        >
                            <FiSave size={18} />
                            <span className="font-medium">Save Template</span>
                        </button>
                        <button
                            onClick={onSubmit}
                            className="flex items-center gap-2 !bg-green-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:!bg-green-700 transition-all transform hover:scale-105 active:scale-100"
                        >
                            <FiSend size={18} />
                            <span className="font-medium">Submit</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormPreviewModal;
