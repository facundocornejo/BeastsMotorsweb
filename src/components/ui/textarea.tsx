"use client";

import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className = "", id, ...props },
  ref
) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-medium text-dark-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={`w-full px-3 py-2 text-sm rounded-[var(--radius-sm)] border border-gray-200 bg-[var(--white)] text-dark-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-mid focus:border-transparent transition-colors resize-y min-h-[80px] ${error ? "border-rose" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-rose">{error}</p>}
    </div>
  );
});

export default Textarea;
