import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ApiSlider } from '../../types/admin';

interface SliderFormProps {
  apiId: string;
  initialData?: ApiSlider;
  onSubmit: (data: Partial<ApiSlider>) => Promise<void>;
}

export const SliderForm: React.FC<SliderFormProps> = ({
  apiId,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<ApiSlider>>(
    initialData || {
      apiId,
      name: '',
      type: 'tokens',
      defaultValue: 0,
      step: 1,
      min: 0,
      max: 1000,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericFields = ['defaultValue', 'step', 'min', 'max'];
    const finalValue = numericFields.includes(name) ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting slider:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
          required
        >
          <option value="tokens">Tokens</option>
          <option value="images">Images</option>
          <option value="minutes">Minutes</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Default Value</label>
          <input
            type="number"
            name="defaultValue"
            value={formData.defaultValue}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Step</label>
          <input
            type="number"
            name="step"
            value={formData.step}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Min Value</label>
          <input
            type="number"
            name="min"
            value={formData.min}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Max Value</label>
          <input
            type="number"
            name="max"
            value={formData.max}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Save className="h-5 w-5" />
          <span>Save Slider</span>
        </button>
      </div>
    </form>
  );
};