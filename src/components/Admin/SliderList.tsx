import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { ApiSlider } from '../../types/admin';

interface SliderListProps {
  sliders: ApiSlider[];
  onEdit: (slider: ApiSlider) => void;
  onDelete: (id: number) => void;
}

export const SliderList: React.FC<SliderListProps> = ({
  sliders,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="space-y-4">
      {sliders.map((slider) => (
        <div
          key={slider.id}
          className="flex items-center justify-between p-4 bg-surface-800/30 rounded-lg border border-surface-700/50"
        >
          <div>
            <h4 className="font-medium text-white">{slider.name}</h4>
            <p className="text-sm text-gray-400">
              Type: {slider.type} • Range: {slider.min} - {slider.max} • Step: {slider.step}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(slider)}
              className="p-1 text-gray-400 hover:text-white"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(slider.id)}
              className="p-1 text-gray-400 hover:text-red-400"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};