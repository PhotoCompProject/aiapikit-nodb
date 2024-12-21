export interface ApiProvider {
  id: string;
  name: string;
  provider: string;
  category: ApiCategory;
  description: string;
  pricing: PricingModel;
  features: string[];
  documentation: string;
  basePrice: number;
  logo: string;
  inputMetric: InputMetric;
  pricePerUnit: {
    input?: number;
    output?: number;
    operation?: number;
  };
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
