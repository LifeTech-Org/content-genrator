/* eslint-disable @typescript-eslint/no-explicit-any */

import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
const CustomSelect = ({ name, label, placeholder, values, handleSelectChange, handleChange, showOthers, isMulti = false, otherType = "text", value }: {
    label: string,
    name: string;
    placeholder?: string;
    otherType?: string;
    values: {
        label: string;
        value: string;
    }[]; handleSelectChange: ((newValue: SingleValue<{ value: string; label: string; }> | MultiValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{
        value: string;
        label: string;
    }>) => void) | undefined; handleChange: React.ChangeEventHandler<HTMLInputElement>,
    showOthers: boolean
    isMulti?: boolean
    value?: any
}) => {
    return <label className="block text-sm font-medium text-gray-700">{label}
        <Select
            name={name}
            options={values}
            onChange={handleSelectChange}
            placeholder={placeholder}
            isMulti={isMulti}
            value={value ? (Array.isArray(value) ? Array.from(value).map((v) => { return { label: values.find(({ value: c }) => c === v)!.label, value: v } }) : [{ value, label: values.find(({ value: d }) => d === value)!.label }]) : undefined}
        />
        {showOthers && (
            <input
                type={otherType}
                name={name}
                onChange={handleChange}
                placeholder="Please specify..."
                className="w-full p-2 border !text-sm border-gray-300 rounded focus:ring focus:ring-blue-300"
            />
        )}
    </label>
}

export default CustomSelect;