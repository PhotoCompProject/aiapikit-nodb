import React, { useState } from 'react';
import { PlusCircle, MinusCircle, Save } from 'lucide-react';
import { AdminApiProvider, ApiSlider, ApiOutput } from '../../types/admin';
import { apiService } from '../../services/api';

interface ApiProviderFormProps {
  initialData?: AdminApiProvider;
  onSubmit: (data: AdminApiProvider) => Promise<void>;
}

export const ApiProviderForm: React.FC<ApiProviderFormProps> = ({
  initialData,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Partial<AdminApiProvider>>(
    initialData || {
      name: '',
      provider: '',
      category: 'text-generation',
      description: '',
      pricing: 'pay-per-use',
      features: [],
      documentation: '',
      basePrice: 0,
      logo: '',
      sliders: [],
      outputs: [],
    }
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      try {
        const imageUrl = await apiService.uploadImage(file);
        setFormData((prev) => ({ ...prev, logo: imageUrl }));
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ''],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData as AdminApiProvider);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
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
            <label className="block text-sm font-medium text-gray-200">Provider</label>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              required
            >
              <option value="text-generation">Text Generation</option>
              <option value="image-generation">Image Generation</option>
              <option value="speech-to-text">Speech to Text</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Pricing Model</label>
            <select
              name="pricing"
              value={formData.pricing}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              required
            >
              <option value="pay-per-use">Pay Per Use</option>
              <option value="subscription">Subscription</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Documentation URL</label>
            <input
              type="url"
              name="documentation"
              value={formData.documentation}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Base Price</label>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleInputChange}
              step="0.001"
              className="mt-1 block w-full rounded-md bg-surface-800 border border-surface-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200">Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-white"
            />
            {formData.logo && (
              <img
                src={formData.logo}
                alt="Preview"
                className="mt-2 h-16 w-16 rounded-lg object-cover"
              />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Features</h3>
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center space-x-2 text-primary-400 hover:text-primary-300"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Feature</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 rounded-md bg-surface-800 border border-surface-600 text-white"
                placeholder="Enter feature"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-400 hover:text-red-300"
              >
                <MinusCircle className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

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