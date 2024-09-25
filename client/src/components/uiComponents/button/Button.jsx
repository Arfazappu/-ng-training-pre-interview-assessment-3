import React from "react";

function Button({ btnText, onClick, variant, customClass = null }) {
  const baseStyle = 'btn rounded-md'
  const primaryStyles = "bg-black text-white border-black hover:bg-gray-800";
  const secondaryStyles = "btn-outline border-black text-black border-slate-400 bg-[#ffffff9c]";
  return (
    <button
      className={`${baseStyle} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${customClass}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
}

export default Button;
