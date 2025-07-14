import React from 'react'

const InputField = ({ id, name, type, label, autoComplete, value, onChange, placeholder, children }) => {
    return (
        <div>
            {/* children 여부에 따라 클래스명 다르게 적용 */}
            <div className={children ? 'flex items-center justify-between' : ''}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-900 mb-1">
                    {label}
                </label>
                {children}
            </div>

            <input
                id={id}
                name={name}
                type={type}
                required
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
        </div>
    )
}

export default InputField
