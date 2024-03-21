import React, { useId } from "react";

function Input(
  { label = "", type = "text", className = "", divClass = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className={`w-full ${divClass}`}>
      {label && (
        <label className="text-xl w-40 font-semibold " htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full p-1 text-xl font-semibold rounded-lg text-primary ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
}

export default React.forwardRef(Input);
