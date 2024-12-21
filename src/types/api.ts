export interface ApiProvider {
  id: string;
  name: string;
  provider: string;
  category: ApiCategory;
  featured: boolean;
  description: string;
  pricing: PricingModel;
  features: string[];
  documentationUrl: string;
  logo: {
    type: 'url' | 'upload';
    value: string;
  };
  sliders: Array<{
    name: string;
    minValue: number;
    maxValue: number;
    step: number;
  }>;
  outputs: Array<{
    name: string;
    costPerUnit: number;
    monthlyCalculation: string;
    yearlyCalculation: string;
  }>;
  priceDetails: PriceDetail[];
  customFields: CustomField[];
}

export interface PriceDetail {
  name: string;
  value: string | number | boolean;
}

export interface CustomField {
  name: string;
  type: 'text' | 'number' | 'boolean';
  value: string;
}

export type ApiCategory =
  | 'text-generation'
  | 'image-generation'
  | 'speech-to-text';

export type PricingModel = 'pay-per-use' | 'subscription';

export interface InputMetric {
  type: 'tokens' | 'images' | 'minutes';
  label: string;
  defaultValue: number;
  outputDefaultValue?: number;
  step: number;
  min: number;
  max: number;
}

export interface ApiSlider {
  id: number;
  providerId: string;
  name: string;
  type: 'tokens' | 'images' | 'minutes';
  defaultValue: number;
  step: number;
  min: number;
  max: number;
}

export interface ApiOutput {
  id: number;
  providerId: string;
  name: string;
  type: 'tokens' | 'images' | 'minutes';
  defaultValue: number;
  multiplier: number;
}
