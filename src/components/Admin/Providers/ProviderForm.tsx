import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, Save, Upload, Link as LinkIcon } from 'lucide-react';
import { ApiProvider, Category } from '../../../types/admin';

interface ProviderFormProps {
  onSubmit: (data: ApiProvider) => void;
  initialData?: ApiProvider;
  categories: Category[];
}

export const ProviderForm: React.FC<ProviderFormProps> = ({ 
  onSubmit, 
  initialData,
  categories 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(
    initialData?.category ? categories.find(c => c.id === initialData.category) : undefined
  );

  const [formData, setFormData] = useState<ApiProvider>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    provider: initialData?.provider || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    documentationUrl: initialData?.documentationUrl || '',
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Model Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Provider</label>
          <input
            type="text"
            value={formData.provider}
            onChange={(e) => setFormData(prev => ({ ...prev, provider: e.target.value }))}
            className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => {
              const category = categories.find(c => c.id === e.target.value);
              setSelectedCategory(category);
              setFormData(prev => ({ ...prev, category: e.target.value }));
            }}
            className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Documentation URL</label>
          <input
            type="url"
            value={formData.documentationUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, documentationUrl: e.target.value }))}
            className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
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
            className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
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

      {selectedCategory && (
        <>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Sliders</h3>
            {formData.sliders.map((slider, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-100">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Name</label>
                    <input
                      type="text"
                      value={slider.name}
                      disabled
                      className="mt-1 w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Min Value</label>
                    <input
                      type="number"
                      value={slider.minValue}
                      onChange={(e) => {
                        const newSliders = [...formData.sliders];
                        newSliders[index].minValue = Number(e.target.value);
                        setFormData(prev => ({ ...prev, sliders: newSliders }));
                      }}
                      className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Max Value</label>
                    <input
                      type="number"
                      value={slider.maxValue}
                      onChange={(e) => {
                        const newSliders = [...formData.sliders];
                        newSliders[index].maxValue = Number(e.target.value);
                        setFormData(prev => ({ ...prev, sliders: newSliders }));
                      }}
                      className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Step</label>
                    <input
                      type="number"
                      value={slider.step}
                      onChange={(e) => {
                        const newSliders = [...formData.sliders];
                        newSliders[index].step = Number(e.target.value);
                        setFormData(prev => ({ ...prev, sliders: newSliders }));
                      }}
                      className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Outputs</h3>
            {formData.outputs.map((output, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-100 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">Name</label>
                    <input
                      type="text"
                      value={output.name}
                      disabled
                      className="mt-1 w-full rounded-lg bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">Cost per Unit</label>
                    <input
                      type="number"
                      value={output.costPerUnit}
                      onChange={(e) => {
                        const newOutputs = [...formData.outputs];
                        newOutputs[index].costPerUnit = Number(e.target.value);
                        setFormData(prev => ({ ...prev, outputs: newOutputs }));
                      }}
                      step="0.0001"
                      className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Monthly Calculation</label>
                  <input
                    type="text"
                    value={output.monthlyCalculation}
                    onChange={(e) => {
                      const newOutputs = [...formData.outputs];
                      newOutputs[index].monthlyCalculation = e.target.value;
                      setFormData(prev => ({ ...prev, outputs: newOutputs }));
                    }}
                    placeholder="Enter calculation formula"
                    className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Yearly Calculation</label>
                  <input
                    type="text"
                    value={output.yearlyCalculation}
                    onChange={(e) => {
                      const newOutputs = [...formData.outputs];
                      newOutputs[index].yearlyCalculation = e.target.value;
                      setFormData(prev => ({ ...prev, outputs: newOutputs }));
                    }}
                    placeholder="Enter calculation formula"
                    className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Price Details</h3>
            {formData.priceDetails.map((detail, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600">{detail.name}</label>
                    {typeof detail.value === 'boolean' ? (
                      <select
                        value={detail.value.toString()}
                        onChange={(e) => {
                          const newDetails = [...formData.priceDetails];
                          newDetails[index].value = e.target.value === 'true';
                          setFormData(prev => ({ ...prev, priceDetails: newDetails }));
                        }}
                        className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
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
                        className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Custom Fields</h3>
          <button
            type="button"
            onClick={addCustomField}
            className="text-orange-500 hover:text-orange-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        {formData.customFields?.map((field, index) => (
          <div key={index} className="p-4 bg-white rounded-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Field Name</label>
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => {
                    const newFields = [...(formData.customFields || [])];
                    newFields[index].name = e.target.value;
                    setFormData(prev => ({ ...prev, customFields: newFields }));
                  }}
                  placeholder="Field name"
                  className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Type</label>
                <select
                  value={field.type}
                  onChange={(e) => {
                    const newFields = [...(formData.customFields || [])];
                    newFields[index].type = e.target.value as 'text' | 'number' | 'boolean';
                    newFields[index].value = e.target.value === 'number' ? '0' : '';
                    setFormData(prev => ({ ...prev, customFields: newFields }));
                  }}
                  className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-600">Value</label>
                {field.type === 'boolean' ? (
                  <select
                    value={field.value}
                    onChange={(e) => {
                      const newFields = [...(formData.customFields || [])];
                      newFields[index].value = e.target.value;
                      setFormData(prev => ({ ...prev, customFields: newFields }));
                    }}
                    className="mt-1 block w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
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
                    className="mt-1 w-full rounded-lg bg-white border border-gray-200 text-gray-900 px-4 py-2 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeCustomField(index)}
                className="text-red-500 hover:text-red-600 mt-6"
              >
                <Minus className="h-5 w-5" />
              </button>
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
          <span>Save Provider</span>
        </button>
      </div>
    </form>
  );
};
