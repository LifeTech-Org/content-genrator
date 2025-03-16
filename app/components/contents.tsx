"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckmarkIcon } from "react-hot-toast";
import { Layout } from "../type";

const AIContentSelector = ({ aiResponses, dict }: { aiResponses: string[], dict: Layout }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [contents, setContents] = useState(aiResponses);

    const handleEdit = (index: number, value: string) => {
        const updatedContents = [...contents];
        updatedContents[index] = value;
        setContents(updatedContents);
    };

    return (
        <div className="min-h-[60vh] flex flex-col justify-between mx-auto p-6 space-y-6">
            <h2 className="text-3xl font-semibold text-gray-900 text-center">{dict.select_generated_content}</h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {contents.map((content, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`relative p-5 border rounded-xl shadow-md transition-all cursor-pointer ${selected === index
                            ? "border-blue-500 ring-2 ring-blue-300 scale-105"
                            : "border-gray-300 hover:shadow-lg hover:scale-105"
                            }`}
                        onClick={() => setSelected(index)}
                    >
                        <textarea
                            className="w-full h-40 bg-transparent resize-none outline-none text-gray-800 text-lg p-2 rounded-md"
                            value={content}
                            onChange={(e) => handleEdit(index, e.target.value)}
                        />
                        {selected === index && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="absolute top-4 right-4"
                            >
                                <CheckmarkIcon className="!text-blue-500" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white text-lg font-medium py-3 w-full max-w-xl rounded-lg shadow-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={selected === null}
                >
                    {dict.confirm_selection}
                </motion.button>
            </div>
        </div>
    );
};

export default AIContentSelector;
