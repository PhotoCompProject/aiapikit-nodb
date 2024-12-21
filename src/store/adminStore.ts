import { create } from 'zustand';
import { Category, ApiProvider, Admin } from '../types/admin';

interface AdminStore {
  // Categories
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Category) => void;
  deleteCategory: (id: string) => void;
  
  // API Providers
  providers: ApiProvider[];
  addProvider: (provider: ApiProvider) => void;
  updateProvider: (id: string, provider: ApiProvider) => void;
  deleteProvider: (id: string) => void;
  
  // Admins
  admins: Admin[];
  addAdmin: (admin: Admin) => void;
  updateAdmin: (id: string, admin: Admin) => void;
  deleteAdmin: (id: string) => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  // Categories
  categories: [
    {
      id: '1',
      name: 'Text Generation',
      sliderDefinitions: [
        { name: 'Input Tokens' },
        { name: 'Output Tokens' }
      ],
      outputDefinitions: [
        { name: 'Input Cost' },
        { name: 'Output Cost' },
        { name: 'Total Cost' }
      ],
      priceDetailFields: [
        { 
          name: 'Input Token Price',
          type: 'number',
          description: 'Cost per input token'
        },
        {
          name: 'Output Token Price',
          type: 'number',
          description: 'Cost per output token'
        },
        {
          name: 'Context Length',
          type: 'number',
          description: 'Maximum context length in tokens'
        }
      ]
    },
    {
      id: '2',
      name: 'Image Generation',
      sliderDefinitions: [
        { name: 'Images' },
        { name: 'Resolution' }
      ],
      outputDefinitions: [
        { name: 'Cost per Image' },
        { name: 'Resolution Cost' },
        { name: 'Total Cost' }
      ],
      priceDetailFields: [
        {
          name: 'Base Price',
          type: 'number',
          description: 'Base cost per image'
        },
        {
          name: 'Resolution Factor',
          type: 'number',
          description: 'Cost multiplier for resolution'
        },
        {
          name: 'Max Resolution',
          type: 'number',
          description: 'Maximum supported resolution'
        }
      ]
    }
  ],
  addCategory: (category) => 
    set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (id, category) =>
    set((state) => ({
      categories: state.categories.map((c) => c.id === id ? category : c)
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id)
    })),

  // API Providers
  providers: [
    {
      id: '1',
      name: 'GPT-4',
      provider: 'OpenAI',
      category: '1',
      description: 'Advanced language model',
      documentationUrl: 'https://platform.openai.com/docs/models/gpt-4',
      logo: {
        type: 'url',
        value: 'https://example.com/openai-logo.png'
      },
      sliders: [
        { 
          name: 'Input Tokens',
          minValue: 0,
          maxValue: 1000000,
          step: 1000
        },
        {
          name: 'Output Tokens',
          minValue: 0,
          maxValue: 1000000,
          step: 1000
        }
      ],
      outputs: [
        {
          name: 'Input Cost',
          costPerUnit: 0.0001,
          monthlyCalculation: 'Input Tokens * 0.0001',
          yearlyCalculation: 'Input Tokens * 0.0001 * 12'
        },
        {
          name: 'Output Cost',
          costPerUnit: 0.0002,
          monthlyCalculation: 'Output Tokens * 0.0002',
          yearlyCalculation: 'Output Tokens * 0.0002 * 12'
        }
      ],
      priceDetails: [
        {
          name: 'Input Token Price',
          value: 0.0001
        },
        {
          name: 'Output Token Price',
          value: 0.0002
        },
        {
          name: 'Context Length',
          value: 8192
        }
      ],
      customFields: [
        {
          name: 'Model Version',
          value: '4.0',
          type: 'text'
        }
      ]
    }
  ],
  addProvider: (provider) =>
    set((state) => ({ providers: [...state.providers, provider] })),
  updateProvider: (id, provider) =>
    set((state) => ({
      providers: state.providers.map((p) => p.id === id ? provider : p)
    })),
  deleteProvider: (id) =>
    set((state) => ({
      providers: state.providers.filter((p) => p.id !== id)
    })),

  // Admins
  admins: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'super_admin',
      lastLogin: '2024-03-15 14:30'
    }
  ],
  addAdmin: (admin) =>
    set((state) => ({ admins: [...state.admins, admin] })),
  updateAdmin: (id, admin) =>
    set((state) => ({
      admins: state.admins.map((a) => a.id === id ? admin : a)
    })),
  deleteAdmin: (id) =>
    set((state) => ({
      admins: state.admins.filter((a) => a.id !== id)
    }))
}));
