import React, { useState } from "react";

function InlineEdit({ value, onChange, placeholder="", className }) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleBlur = () => {
    setEditing(false);
    onChange(tempValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
      onChange(tempValue);
    } else if (e.key === "Escape") {
      setTempValue(value);
      setEditing(false);
    }
  };

  return (
    <>
      {editing ? (
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          className={className}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span  onClick={() => setEditing(true)} className={className}>
          {value || placeholder}
        </span>
      )}
    </>
  );
}

export default InlineEdit