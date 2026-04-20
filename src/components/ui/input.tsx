"use client";

import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className = "", id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-dark-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-gray-200 bg-[var(--white)] text-dark-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-mid focus:border-transparent transition-colors ${error ? "border-rose" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose">{error}</p>}
    </div>
  );
});

export default Input;
