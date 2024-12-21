import React, { useState, useEffect } from 'react';
import { AdminApiProvider } from '../types/admin';
import { apiService } from '../services/api';
import { ApiProviderList } from '../components/Admin/ApiProviderList';
import { ApiProviderForm } from '../components/Admin/ApiProviderForm';
import { SliderForm } from '../components/Admin/SliderForm';
import { OutputForm } from '../components/Admin/OutputForm';

export const AdminPanel: React.FC = () => {
  const [providers, setProviders] = useState<AdminApiProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<AdminApiProvider | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSlider, setIsAddingSlider] = useState(false);
  const [isAddingOutput, setIsAddingOutput] = useState(false);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const data = await apiService.getApiProviders();
      setProviders(data);
    } catch (error) {
      console.error('Error loading providers:', error);
    }
  };

  const handleAddProvider = async (provider: AdminApiProvider) => {
    try {
      await apiService.createApiProvider(provider);
      await loadProviders();
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding provider:', error);
    }
  };

  const handleUpdateProvider = async (provider: AdminApiProvider) => {
    try {
      await apiService.updateApiProvider(provider.id, provider);
      await loadProviders();
      setIsEditing(false);
      setSelectedProvider(null);
    } catch (error) {
      console.error('Error updating provider:', error);
    }
  };

  const handleDeleteProvider = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      try {
        await apiService.deleteApiProvider(id);
        await loadProviders();
      } catch (error) {
        console.error('Error deleting provider:', error);
      }
    }
  };

  const handleAddSlider = async (slider: Partial<ApiSlider>) => {
    try {
      await apiService.createSlider(slider);
      await loadProviders();
      setIsAddingSlider(false);
    } catch (error) {
      console.error('Error adding slider:', error);
    }
  };

  const handleAddOutput = async (output: Partial<ApiOutput>) => {
    try {
      await apiService.createOutput(output);
      await loadProviders();
      setIsAddingOutput(false);
    } catch (error) {
      console.error('Error adding output:', error);
    }
  };

  return (
    <div className="min-h-screen bg-surface-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isEditing && !selectedProvider ? (
          <ApiProviderList
            providers={providers}
            onEdit={(provider) => {
              setSelectedProvider(provider);
              setIsEditing(true);
            }}
            onDelete={handleDeleteProvider}
            onAdd={() => setIsEditing(true)}
          />
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {selectedProvider ? 'Edit Provider' : 'Add New Provider'}
              </h2>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedProvider(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <ApiProviderForm
              initialData={selectedProvider || undefined}
              onSubmit={selectedProvider ? handleUpdateProvider : handleAddProvider}
            />

            {selectedProvider && (
              <>
                <div className="border-t border-surface-700 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Sliders</h3>
                    <button
                      onClick={() => setIsAddingSlider(true)}
                      className="text-primary-400 hover:text-primary-300"
                    >
                      Add Slider
                    </button>
                  </div>
                  {isAddingSlider && (
                    <SliderForm
                      apiId={selectedProvider.id}
                      onSubmit={handleAddSlider}
                    />
                  )}
                  {/* List existing sliders */}
                </div>

                <div className="border-t border-surface-700 pt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Outputs</h3>
                    <button
                      onClick={() => setIsAddingOutput(true)}
                      className="text-primary-400 hover:text-primary-300"
                    >
                      Add Output
                    </button>
                  </div>
                  {isAddingOutput && (
                    <OutputForm
                      apiId={selectedProvider.id}
                      sliders={selectedProvider.sliders}
                      onSubmit={handleAddOutput}
                    />
                  )}
                  {/* List existing outputs */}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};