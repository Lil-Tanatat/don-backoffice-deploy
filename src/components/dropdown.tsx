import React from "react";

/**
 * @deprecated This component is deprecated. Use FilterSelect instead.
 * This component will be removed in a future version.
 */
interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * @deprecated Use FilterSelect component instead
 */
export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  // Add console warning for developers
  if (process.env.NODE_ENV === "development") {
    console.warn("Dropdown component is deprecated. Use FilterSelect instead.");
  }

  return (
    <div className="flex flex-col text-sm">
      <label className="mb-1 text-base font-semibold">{label}</label>
      <select
        className="w-full px-2 py-2 border rounded-md text-sm font-medium text-[#18181B]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">เลือก{label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
