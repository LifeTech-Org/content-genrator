/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, DragEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { TFormData } from "../type";
import toast, { Toaster } from "react-hot-toast";

const TemplateDropBox = ({ setFormData }: { setFormData: React.Dispatch<React.SetStateAction<TFormData>> }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            processFile(file);
        }
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                processFile(file);
            }
        }
    };

    const processFile = (file: File) => {
        if (file.type !== "application/json") {
            toast.error("Invalid file type. Please upload a JSON file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                setFormData(json);
                toast.success("Template imported successfully!");
            } catch (e: any) {
                toast.error("Invalid JSON format.");
            }
        };
        reader.readAsText(file);
    };

    return (
        <>
            <Toaster position="top-left" reverseOrder={false} />
            <div className="w-full max-w-lg mx-auto">
                <div
                    className={`border-2 border-dashed ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"} 
                    rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("fileInput")?.click()}
                >
                    <FiUpload className="text-gray-500 text-3xl mb-2" />
                    <p className="text-gray-600 text-sm">Click to upload a form template or drag and drop</p>
                    <input id="fileInput" type="file" className="hidden" onChange={handleFileSelect} accept=".json" />
                </div>
                <div className="w-full border-t-2 border-gray-200 my-6"></div>
            </div>
        </>
    );
};

export default TemplateDropBox;
