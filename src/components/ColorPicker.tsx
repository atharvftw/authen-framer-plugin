import React, { useState } from 'react';

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  initialColor?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange, initialColor = '#007bff' }) => {
  const [color, setColor] = useState(initialColor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className="color-picker">
      <input
        type="color"
        value={color}
        onChange={handleChange}
        className="color-input"
      />
      <span className="color-value">{color}</span>
    </div>
  );
}; 