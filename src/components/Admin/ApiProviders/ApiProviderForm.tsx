import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Category, Slider } from '../../../types/admin';
import { SliderSection } from './SliderSection';
import { OutputSection } from './OutputSection';

interface ApiProviderFormProps {
  categories: Category[];
  onSubmit: (data: any) => void;
  initialData?: any;
}

export const ApiProviderForm: React.FC<ApiProviderFormProps> = ({
  categories,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    provider: initialData?.provider || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    logo: initialData?.logo || '',
    sliders: initialData?.sliders || [],
    outputs: initialData?.outputs || []
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (formData.category) {
      const category = categories.find(c => c.id === formData.category);
      setSelectedCategory(category || null);
    }
  }, [formData.category, categories]);

  const handleCategoryChange = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      setFormData(prev => ({
        ...prev,
        category: categoryId,
        sliders: [],
        outputs: []
      }));
      setSelectedCategory(category);
    }
  };

  const handleAddSlider = () => {
    setFormData(prev => ({
      ...prev,
      sliders: [...prev.sliders, { name: '', minValue: 0, maxValue: 100, step: 1 }]
    }));
  };

  const handleRemoveSlider = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sliders: prev.sliders.filter((_, i) => i !== index)
    }));
  };

  const handleSliderChange = (index: number, slider: Slider) => {
    const newSliders = [...formData.sliders];
    newSliders[index] = slider;
    setFormData(prev => ({ ...prev, sliders: newSliders }));
  };

  const handleAddOutput = () => {
    setFormData(prev => ({
      ...prev,
      outputs: [...prev.outputs, { name: '', formula: '' }]
    }));
  };

  const handleRemoveOutput = (index: number) => {
    setFormData(prev => ({
      ...prev,
      outputs: prev.outputs.filter((_, i) => i !== index)
    }));
  };

  const handleOutputChange = (index: number, output: { name: string; formula: string }) => {
    const newOutputs = [...formData.outputs];
    newOutputs[index] = output;
    setFormData(prev => ({ ...prev, outputs: newOutputs }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-200">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Provider</label>
          <input
            type="text"
            value={formData.provider}
            onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Logo URL</label>
          <input
            type="url"
            value={formData.logo}
            onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
            className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
          required
        />
      </div>

      {selectedCategory && (
        <>
          <SliderSection
            sliders={formData.sliders}
            categorySliders={selectedCategory.sliders}
            onAdd={handleAddSlider}
            onRemove={handleRemoveSlider}
            onChange={handleSliderChange}
          />

          <OutputSection
            outputs={formData.outputs}
            categoryOutputs={selectedCategory.outputs}
            onAdd={handleAddOutput}
            onRemove={handleRemoveOutput}
            onChange={handleOutputChange}
          />
        </>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Save className="h-5 w-5" />
          <span>Save API Provider</span>
        </button>
      </div>
    </form>
  );
};