import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ApiOutput, ApiSlider } from '../../types/admin';

interface OutputFormProps {
  apiId: string;
  sliders: ApiSlider[];
  initialData?: ApiOutput;
  onSubmit: (data: Partial<ApiOutput>) => Promise<void>;
}

export const OutputForm: React.FC<OutputFormProps> = ({
  apiId,
  sliders,
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<ApiOutput>>(
    initialData || {
      apiId,
      name: '',
      calculationFormula: '',
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting output:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200">Output Name</label>
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
        <label className="block text-sm font-medium text-gray-200">Calculation Formula</label>
        <div className="mt-1 text-sm text-gray-400">
          Available variables:
          <ul className="list-disc list-inside mt-1">
            {sliders.map((slider) => (
              <li key={slider.id}>{slider.name}</li>
            ))}
          </ul>
        </div>
        <textarea
          name="calculationFormula"
          value={formData.calculationFormula}
          onChange={handleInputChange}
          rows={3}
          placeholder="e.g., slider1 * 0.002 + slider2 * 0.004"
          className="mt-2 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Save className="h-5 w-5" />
          <span>Save Output</span>
        </button>
      </div>
    </form>
  );
};