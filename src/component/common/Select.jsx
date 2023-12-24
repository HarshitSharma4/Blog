import React, { useId } from "react";

function Select({ options = [], label = "", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full flex gap-5">
      {label && <label className="text-xl font-bold">{label}</label>}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 w-32 font-bold text-xl ${className}`}
      >
        {options.map((option, key) => (
          <option key={key} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
