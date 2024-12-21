import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, Save, Upload, Link as LinkIcon, X } from 'lucide-react';
import { Category } from '../../../types/admin';
import { ApiProvider, ApiCategory } from '../../../types/api';
import { Button } from '../../ui/Button';
import { ApiSelect } from './ApiSelect';
import { CategoryDropdown } from '../Common/CategoryDropdown';

interface ApiFormProps {
  onSubmit: (data: ApiProvider) => void;
  initialData?: ApiProvider;
  categories: Category[];
  featured: boolean;
  onFeaturedChange: (featured: boolean) => void;
}

export const ApiForm: React.FC<ApiFormProps> = ({ 
  onSubmit, 
  initialData,
  categories,
  featured,
  onFeaturedChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(
    initialData?.category ? categories.find(c => c.id === initialData.category) : undefined
  );

  const [showProviderModal, setShowProviderModal] = useState(false);
  const [newProvider, setNewProvider] = useState('');
  const [existingProviders, setExistingProviders] = useState<string[]>(
    initialData?.provider ? [initialData.provider] : []
  );
  const [formData, setFormData] = useState<ApiProvider>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    provider: initialData?.provider || '',
    category: initialData?.category || 'text-generation',
    featured,
    description: initialData?.description || '',
    documentationUrl: initialData?.documentationUrl || '',
    pricing: initialData?.pricing || 'pay-per-use',
    features: initialData?.features || [],
    logo: initialData?.logo || { type: 'url', value: '' },
    sliders: initialData?.sliders || [],
    outputs: initialData?.outputs || [],
    priceDetails: initialData?.priceDetails || [],
    customFields: initialData?.customFields || []
  });

  useEffect(() => {
    if (selectedCategory) {
      // Update sliders based on category definitions
      const newSliders = selectedCategory.sliderDefinitions.map(def => ({
        name: def.name,
        minValue: 0,
        maxValue: 1000000,
        step: 1
      }));

      // Update outputs based on category definitions
      const newOutputs = selectedCategory.outputDefinitions.map(def => ({
        name: def.name,
        costPerUnit: 0,
        monthlyCalculation: '',
        yearlyCalculation: ''
      }));

      // Update price details based on category fields
      const newPriceDetails = selectedCategory.priceDetailFields.map(field => ({
        name: field.name,
        value: field.type === 'number' ? 0 : field.type === 'boolean' ? false : ''
      }));

      setFormData(prev => ({
        ...prev,
        sliders: newSliders,
        outputs: newOutputs,
        priceDetails: newPriceDetails
      }));
    }
  }, [selectedCategory]);

  const handleLogoTypeChange = (type: 'url' | 'upload') => {
    setFormData(prev => ({
      ...prev,
      logo: { type, value: '' }
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: { type: 'upload', value: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCustomField = () => {
    setFormData(prev => ({
      ...prev,
      customFields: [...(prev.customFields || []), {
        name: '',
        value: '',
        type: 'text'
      }]
    }));
  };

  const removeCustomField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      <div className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <ApiSelect
                  value={formData.provider}
                  onChange={(value) => setFormData(prev => ({ ...prev, provider: value }))}
                  onAddNew={() => setShowProviderModal(true)}
                  apis={existingProviders}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <CategoryDropdown
                  value={formData.category}
                  onChange={(value) => {
                    const category = categories.find(c => c.id === value);
                    setSelectedCategory(category);
                    setFormData(prev => ({ ...prev, category: value as ApiCategory }));
                  }}
                  categories={categories}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Documentation URL</label>
                <input
                  type="url"
                  value={formData.documentationUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, documentationUrl: e.target.value }))}
                  className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pricing Model</label>
                <select
                  value={formData.pricing}
                  onChange={(e) => setFormData(prev => ({ ...prev, pricing: e.target.value as 'pay-per-use' | 'subscription' }))}
                  className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="pay-per-use">Pay Per Use</option>
                  <option value="subscription">Subscription</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-800 rounded-md text-sm"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = [...formData.features];
                        newFeatures.splice(index, 1);
                        setFormData(prev => ({ ...prev, features: newFeatures }));
                      }}
                      className="hover:text-orange-900"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a feature"
                  className="flex-1 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const input = e.target as HTMLInputElement;
                      const value = input.value.trim();
                      if (value) {
                        setFormData(prev => ({
                          ...prev,
                          features: [...prev.features, value]
                        }));
                        input.value = '';
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add a feature"]') as HTMLInputElement;
                    const value = input.value.trim();
                    if (value) {
                      setFormData(prev => ({
                        ...prev,
                        features: [...prev.features, value]
                      }));
                      input.value = '';
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                rows={3}
                required
              />
            </div>
          </div>
        </div>

        {/* Logo Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Logo</h3>
          </div>
          <div className="p-6">
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => handleLogoTypeChange('url')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  formData.logo.type === 'url'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <LinkIcon className="w-4 h-4 inline-block mr-2" />
                URL
              </button>
              <button
                type="button"
                onClick={() => handleLogoTypeChange('upload')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  formData.logo.type === 'upload'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Upload className="w-4 h-4 inline-block mr-2" />
                Upload
              </button>
            </div>

            {formData.logo.type === 'url' ? (
              <input
                type="url"
                value={formData.logo.value}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  logo: { ...prev.logo, value: e.target.value }
                }))}
                placeholder="Enter logo URL"
                className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
            ) : (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-500 hover:text-orange-500"
                >
                  {formData.logo.value ? 'Change Image' : 'Upload Image'}
                </button>
                {formData.logo.value && (
                  <img
                    src={formData.logo.value}
                    alt="Logo preview"
                    className="mt-4 h-20 rounded-lg"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {selectedCategory && (
          <>
            {/* Input Configuration */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Input Configuration</h3>
              </div>
              <div className="p-6 space-y-6">
                {formData.sliders.map((slider, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={slider.name}
                        disabled
                        className="w-full rounded-lg bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Value</label>
                      <input
                        type="number"
                        value={slider.minValue}
                        onChange={(e) => {
                          const newSliders = [...formData.sliders];
                          newSliders[index].minValue = Number(e.target.value);
                          setFormData(prev => ({ ...prev, sliders: newSliders }));
                        }}
                        className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Value</label>
                      <input
                        type="number"
                        value={slider.maxValue}
                        onChange={(e) => {
                          const newSliders = [...formData.sliders];
                          newSliders[index].maxValue = Number(e.target.value);
                          setFormData(prev => ({ ...prev, sliders: newSliders }));
                        }}
                        className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Step</label>
                      <input
                        type="number"
                        value={slider.step}
                        onChange={(e) => {
                          const newSliders = [...formData.sliders];
                          newSliders[index].step = Number(e.target.value);
                          setFormData(prev => ({ ...prev, sliders: newSliders }));
                        }}
                        className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Configuration */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Output Configuration</h3>
              </div>
              <div className="p-6 space-y-6">
                {formData.outputs.map((output, index) => (
                  <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={output.name}
                          disabled
                          className="w-full rounded-lg bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2.5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost per Unit</label>
                        <input
                          type="number"
                          value={output.costPerUnit}
                          onChange={(e) => {
                            const newOutputs = [...formData.outputs];
                            newOutputs[index].costPerUnit = Number(e.target.value);
                            setFormData(prev => ({ ...prev, outputs: newOutputs }));
                          }}
                          step="0.0001"
                          className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Calculation</label>
                        <input
                          type="text"
                          value={output.monthlyCalculation}
                          onChange={(e) => {
                            const newOutputs = [...formData.outputs];
                            newOutputs[index].monthlyCalculation = e.target.value;
                            setFormData(prev => ({ ...prev, outputs: newOutputs }));
                          }}
                          placeholder="Enter calculation formula"
                          className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Yearly Calculation</label>
                        <input
                          type="text"
                          value={output.yearlyCalculation}
                          onChange={(e) => {
                            const newOutputs = [...formData.outputs];
                            newOutputs[index].yearlyCalculation = e.target.value;
                            setFormData(prev => ({ ...prev, outputs: newOutputs }));
                          }}
                          placeholder="Enter calculation formula"
                          className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Price Details</h3>
              </div>
              <div className="p-6 space-y-6">
                {formData.priceDetails.map((detail, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{detail.name}</label>
                        {typeof detail.value === 'boolean' ? (
                          <select
                            value={detail.value.toString()}
                            onChange={(e) => {
                              const newDetails = [...formData.priceDetails];
                              newDetails[index].value = e.target.value === 'true';
                              setFormData(prev => ({ ...prev, priceDetails: newDetails }));
                            }}
                            className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        ) : (
                          <input
                            type={typeof detail.value === 'number' ? 'number' : 'text'}
                            value={detail.value}
                            onChange={(e) => {
                              const newDetails = [...formData.priceDetails];
                              newDetails[index].value = typeof detail.value === 'number'
                                ? Number(e.target.value)
                                : e.target.value;
                              setFormData(prev => ({ ...prev, priceDetails: newDetails }));
                            }}
                            step={typeof detail.value === 'number' ? '0.0001' : undefined}
                            className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Custom Fields */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Custom Fields</h3>
            <Button
              type="button"
              variant="secondary"
              onClick={addCustomField}
              className="text-orange-500 hover:text-orange-600"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="p-6 space-y-6">
            {formData.customFields?.map((field, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => {
                      const newFields = [...(formData.customFields || [])];
                      newFields[index].name = e.target.value;
                      setFormData(prev => ({ ...prev, customFields: newFields }));
                    }}
                    placeholder="Field name"
                    className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newFields = [...(formData.customFields || [])];
                      newFields[index].type = e.target.value as 'text' | 'number' | 'boolean';
                      newFields[index].value = e.target.value === 'number' ? '0' : '';
                      setFormData(prev => ({ ...prev, customFields: newFields }));
                    }}
                    className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </select>
                </div>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    {field.type === 'boolean' ? (
                      <select
                        value={field.value}
                        onChange={(e) => {
                          const newFields = [...(formData.customFields || [])];
                          newFields[index].value = e.target.value;
                          setFormData(prev => ({ ...prev, customFields: newFields }));
                        }}
                        className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={field.value}
                        onChange={(e) => {
                          const newFields = [...(formData.customFields || [])];
                          newFields[index].value = e.target.value;
                          setFormData(prev => ({ ...prev, customFields: newFields }));
                        }}
                        className="w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2.5 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => removeCustomField(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/20 inline-flex items-center gap-2 text-base"
        >
          <Save className="h-5 w-5" />
          <span>Save API</span>
        </Button>
      </div>

      {/* Add Provider Modal */}
      {showProviderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New API Provider</h3>
              <button
                onClick={() => setShowProviderModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Provider Name
                </label>
                <input
                  type="text"
                  value={newProvider}
                  onChange={(e) => setNewProvider(e.target.value)}
                  className="w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-900 px-4 py-2.5 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="Enter API provider name"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowProviderModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (newProvider.trim()) {
                      setExistingProviders(prev => [...prev, newProvider.trim()]);
                      setFormData(prev => ({ ...prev, provider: newProvider.trim() }));
                      setNewProvider('');
                      setShowProviderModal(false);
                    }
                  }}
                >
                  Add Provider
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
