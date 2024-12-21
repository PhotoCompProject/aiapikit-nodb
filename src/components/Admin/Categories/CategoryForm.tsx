import React, { useState } from 'react';
import { Plus, Minus, Save } from 'lucide-react';
import { Category } from '../../../types/admin';
import { Button } from '../../ui/Button';

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
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
      {/* Row 1: Category Name */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            required
          />
        </div>
      </div>

      {/* Row 2: Input and Output Fields */}
      <div className="grid grid-cols-2 gap-6">
        {/* Input Fields */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Input Fields</h3>
            <Button
              type="button"
              variant="secondary"
              onClick={addSlider}
              className="text-orange-500 hover:text-orange-600"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-6 space-y-4">
            {formData.sliderDefinitions.map((slider, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={slider.name}
                  onChange={(e) => {
                    const newSliders = [...formData.sliderDefinitions];
                    newSliders[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, sliderDefinitions: newSliders }));
                  }}
                  placeholder="Input name (e.g., Input Tokens)"
                  className="flex-1 rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => removeSlider(index)}
                  className="text-red-600 hover:text-red-700 flex-shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Output Fields */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Output Fields</h3>
            <Button
              type="button"
              variant="secondary"
              onClick={addOutput}
              className="text-orange-500 hover:text-orange-600"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-6 space-y-4">
            {formData.outputDefinitions.map((output, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={output.name}
                  onChange={(e) => {
                    const newOutputs = [...formData.outputDefinitions];
                    newOutputs[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, outputDefinitions: newOutputs }));
                  }}
                  placeholder="Output name (e.g., Total Cost)"
                  className="flex-1 rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => removeOutput(index)}
                  className="text-red-600 hover:text-red-700 flex-shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Price Detail Fields */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Price Detail Fields</h3>
          <Button
            type="button"
            variant="secondary"
            onClick={addPriceDetail}
            className="text-orange-500 hover:text-orange-600"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6 space-y-4">
          {formData.priceDetailFields.map((field, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => {
                    const newFields = [...formData.priceDetailFields];
                    newFields[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, priceDetailFields: newFields }));
                  }}
                  placeholder="Field name (e.g., Base Price)"
                  className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={field.type}
                  onChange={(e) => {
                    const newFields = [...formData.priceDetailFields];
                    newFields[index].type = e.target.value as 'text' | 'number' | 'boolean';
                    setFormData(prev => ({ ...prev, priceDetailFields: newFields }));
                  }}
                  className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>
              </div>
              <div className="flex items-end gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={field.description}
                    onChange={(e) => {
                      const newFields = [...formData.priceDetailFields];
                      newFields[index].description = e.target.value;
                      setFormData(prev => ({ ...prev, priceDetailFields: newFields }));
                    }}
                    placeholder="Field description"
                    className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => removePriceDetail(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 inline-flex items-center gap-2 text-base"
        >
          <Save className="h-5 w-5" />
          <span>Save Category</span>
        </Button>
      </div>
    </form>
  );
};
