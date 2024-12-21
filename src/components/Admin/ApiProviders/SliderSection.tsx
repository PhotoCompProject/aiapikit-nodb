import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Slider } from '../../../types/admin';

interface SliderSectionProps {
  sliders: Slider[];
  categorySliders: Slider[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, slider: Slider) => void;
}

export const SliderSection: React.FC<SliderSectionProps> = ({
  sliders,
  categorySliders,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Sliders</h3>
        <button
          type="button"
          onClick={onAdd}
          className="text-primary-400 hover:text-primary-300"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {sliders.map((slider, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center space-x-4">
            <select
              value={slider.name}
              onChange={(e) => {
                const categorySlider = categorySliders.find(s => s.name === e.target.value);
                if (categorySlider) {
                  onChange(index, { ...categorySlider });
                }
              }}
              className="flex-1 rounded-md bg-surface-800 border border-surface-600 text-white"
            >
              <option value="">Select Slider</option>
              {categorySliders.map((catSlider) => (
                <option key={catSlider.name} value={catSlider.name}>
                  {catSlider.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-red-400 hover:text-red-300"
            >
              <Minus className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400">Min Value</label>
              <input
                type="number"
                value={slider.minValue}
                onChange={(e) => onChange(index, { ...slider, minValue: Number(e.target.value) })}
                className="w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400">Max Value</label>
              <input
                type="number"
                value={slider.maxValue}
                onChange={(e) => onChange(index, { ...slider, maxValue: Number(e.target.value) })}
                className="w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400">Step</label>
              <input
                type="number"
                value={slider.step}
                onChange={(e) => onChange(index, { ...slider, step: Number(e.target.value) })}
                className="w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};