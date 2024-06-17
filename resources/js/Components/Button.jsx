import React from "react";

function Button({ text = "Click Me", className, onClick, type = "button" }) {
    return (
        // <div
        //     className={`lg:text-[15px] sm:text-[10px] text-center text-white bg-custom-green py-6 px-36 rounded-xl cursor-pointer hover:bg-white hover:text-custom-green ${className}`}
        //     onClick={onClick}
        // >
        //     {text}
        // </div>

        <button
            type={type}
            className={`lg:text-[15px] sm:text-[10px] text-center active:scale-105 transition text-white bg-custom-green py-4 px-36 rounded-xl cursor-pointer hover:bg-white hover:text-custom-green ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

// function Button({ text = "Click Me", className, onClick }) {
//     return (
//         <button
//             type="submit"
//             className={`lg:text-[15px] sm:text-[10px] text-center text-white bg-custom-green py-6 px-36 rounded-xl cursor-pointer hover:bg-white hover:text-custom-green ${className}`}
//             onClick={onClick}
//         >
//             {text}
//         </button>
//     );
// }

export default Button;
