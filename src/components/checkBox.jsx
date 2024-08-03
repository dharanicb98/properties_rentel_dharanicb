import React from "react";

export default function AmenitiesCheckbox(props) {
  const { checked, onChange, className = "" } = props;

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`!w-4 !h-4 !text-black !rounded-full !focus:ring-0 !p-1 ${className}`}
    />
  );
}
