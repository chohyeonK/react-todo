
const Button = ({ label, onClick, color, type }) => {
    // const baseClasses = "px-6 py-2 rounded-lg font-semibold transition focus:outline-none";
    const colorClasses = {
        blue: "px-6 py-2 rounded-lg font-semibold transition focus:outline-none bg-blue-500 hover:bg-blue-600 text-white",
        gray: "px-6 py-2 rounded-lg font-semibold transition focus:outline-none bg-gray-300 hover:bg-gray-400 text-gray-800",
        green: "px-6 py-2 rounded-lg font-semibold transition focus:outline-none bg-green-500 hover:bg-green-600 text-white",
        red: "px-6 py-2 rounded-lg font-semibold transition focus:outline-none bg-red-500 hover:bg-red-600 text-white",
        indigo: "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={colorClasses[color]}
        >
            {label}
        </button>
    )
}

export default Button
