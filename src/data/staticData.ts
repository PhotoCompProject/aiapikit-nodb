import { ApiProvider, ApiSlider, ApiOutput } from '../types/api';
import { apiProviders } from './apiProviders';

export const sliders: ApiSlider[] = [
  {
    id: 1,
    providerId: 'openai-gpt4',
    name: 'Monthly Tokens',
    type: 'tokens',
    defaultValue: 1000000,
    step: 100000,
    min: 100000,
    max: 10000000
  },
  {
    id: 2,
    providerId: 'anthropic-claude',
    name: 'Monthly Tokens',
    type: 'tokens',
    defaultValue: 1000000,
    step: 100000,
    min: 100000,
    max: 10000000
  },
  {
    id: 3,
    providerId: 'openai-dall-e',
    name: 'Images per Month',
    type: 'images',
    defaultValue: 100,
    step: 10,
    min: 10,
    max: 10000
  }
];

export const outputs: ApiOutput[] = [
  {
    id: 1,
    providerId: 'openai-gpt4',
    name: 'Output Tokens',
    type: 'tokens',
    defaultValue: 800000,
    multiplier: 0.8
  },
  {
    id: 2,
    providerId: 'anthropic-claude',
    name: 'Output Tokens',
    type: 'tokens',
    defaultValue: 800000,
    multiplier: 0.8
  }
];

// Mock functions to simulate API behavior
export const mockApiService = {
  getApiProviders: () => Promise.resolve(apiProviders),
  
  createApiProvider: (provider: Partial<ApiProvider>) => 
    Promise.resolve({ ...provider, id: Math.random().toString() }),
  
  updateApiProvider: (id: string, provider: Partial<ApiProvider>) =>
    Promise.resolve({ ...provider, id }),
  
  deleteApiProvider: (id: string) => Promise.resolve(),
  
  // Sliders
  createSlider: (slider: Partial<ApiSlider>) =>
    Promise.resolve({ ...slider, id: Math.floor(Math.random() * 1000) }),
  
  updateSlider: (id: number, slider: Partial<ApiSlider>) =>
    Promise.resolve({ ...slider, id }),
  
  deleteSlider: (id: number) => Promise.resolve(),
  
  // Outputs
  createOutput: (output: Partial<ApiOutput>) =>
    Promise.resolve({ ...output, id: Math.floor(Math.random() * 1000) }),
  
  updateOutput: (id: number, output: Partial<ApiOutput>) =>
    Promise.resolve({ ...output, id }),
  
  deleteOutput: (id: number) => Promise.resolve(),
  
  // Image Upload - returns a mock URL
  uploadImage: (file: File) =>
    Promise.resolve(`https://images.unsplash.com/photo-${Date.now()}`)
};
