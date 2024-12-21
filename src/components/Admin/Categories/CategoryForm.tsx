import React, { useState } from 'react';
import { Plus, Minus, Save } from 'lucide-react';
import { Category, SliderDefinition, OutputDefinition, PriceDetailField } from '../../../types/admin';

interface CategoryFormProps {
  onSubmit: (data: Category) => void;
  initialData?: Category;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Category>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    sliderDefinitions: initialData?.sliderDefinitions || [],
    outputDefinitions: initialData?.outputDefinitions || [],
    priceDetailFields: initialData?.priceDetailFields || []
  });

  const addSlider = () => {
    setFormData(prev => ({
      ...prev,
      sliderDefinitions: [...prev.sliderDefinitions, { name: '' }]
    }));
  };

  const removeSlider = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sliderDefinitions: prev.sliderDefinitions.filter((_, i) => i !== index)
    }));
  };

  const addOutput = () => {
    setFormData(prev => ({
      ...prev,
      outputDefinitions: [...prev.outputDefinitions, { name: '' }]
    }));
  };

  const removeOutput = (index: number) => {
    setFormData(prev => ({
      ...prev,
      outputDefinitions: prev.outputDefinitions.filter((_, i) => i !== index)
    }));
  };

  const addPriceDetail = () => {
    setFormData(prev => ({
      ...prev,
      priceDetailFields: [...prev.priceDetailFields, {
        name: '',
        type: 'text',
        description: ''
      }]
    }));
  };

  const removePriceDetail = (index: number) => {
    setFormData(prev => ({
      ...prev,
      priceDetailFields: prev.priceDetailFields.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Category Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          required
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Slider Definitions</h3>
          <button
            type="button"
            onClick={addSlider}
            className="text-orange-500 hover:text-orange-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        {formData.sliderDefinitions.map((slider, index) => (
          <div key={index} className="space-y-2 p-4 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={slider.name}
                onChange={(e) => {
                  const newSliders = [...formData.sliderDefinitions];
                  newSliders[index].name = e.target.value;
                  setFormData(prev => ({ ...prev, sliderDefinitions: newSliders }));
                }}
                placeholder="Slider name (e.g., Input Tokens, Resolution)"
                className="flex-1 rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => removeSlider(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Output Definitions</h3>
          <button
            type="button"
            onClick={addOutput}
            className="text-orange-500 hover:text-orange-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        {formData.outputDefinitions.map((output, index) => (
          <div key={index} className="space-y-2 p-4 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={output.name}
                onChange={(e) => {
                  const newOutputs = [...formData.outputDefinitions];
                  newOutputs[index].name = e.target.value;
                  setFormData(prev => ({ ...prev, outputDefinitions: newOutputs }));
                }}
                placeholder="Output name (e.g., Total Cost, Cost per Unit)"
                className="flex-1 rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => removeOutput(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Price Detail Fields</h3>
          <button
            type="button"
            onClick={addPriceDetail}
            className="text-orange-500 hover:text-orange-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        {formData.priceDetailFields.map((field, index) => (
          <div key={index} className="space-y-4 p-4 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Field Name</label>
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => {
                    const newFields = [...formData.priceDetailFields];
                    newFields[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, priceDetailFields: newFields }));
                  }}
                  placeholder="Field name (e.g., Base Price, Context Length)"
                  className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Type</label>
                <select
                  value={field.type}
                  onChange={(e) => {
                    const newFields = [...formData.priceDetailFields];
                    newFields[index].type = e.target.value as 'text' | 'number' | 'boolean';
                    setFormData(prev => ({ ...prev, priceDetailFields: newFields }));
                  }}
                  className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => removePriceDetail(index)}
                className="text-red-500 hover:text-red-600 mt-6"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
            <div>
              <label className="block text-sm text-gray-600">Description</label>
              <input
                type="text"
                value={field.description}
                onChange={(e) => {
                  const newFields = [...formData.priceDetailFields];
                  newFields[index].description = e.target.value;
                  setFormData(prev => ({ ...prev, priceDetailFields: newFields }));
                }}
                placeholder="Field description"
                className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
          <Save className="h-5 w-5" />
          <span>Save Category</span>
        </button>
      </div>
    </form>
  );
};
