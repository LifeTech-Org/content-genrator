import { ChangeEventHandler } from "react";

const CustomInput = ({ type = "text", label, name, handleChange, min, max }: { type?: string; label: string; name: string; handleChange: ChangeEventHandler<HTMLInputElement>, min?: string; max?: string }) => {
    return <label className="block text-sm font-medium text-gray-700"> {label}
        <input
            type={type}
            name={name}
            onChange={handleChange}
            min={min} max={max}
            className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"
        />
    </label>
}

export default CustomInput;