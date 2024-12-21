export interface Category {
  id: string;
  name: string;
  sliderDefinitions: SliderDefinition[];
  outputDefinitions: OutputDefinition[];
  priceDetailFields: PriceDetailField[];
}

export interface SliderDefinition {
  name: string;
}

export interface OutputDefinition {
  name: string;
}

export interface PriceDetailField {
  name: string;
  type: 'text' | 'number' | 'boolean';
  description: string;
}

export interface ApiProvider {
  id: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  documentationUrl: string;
  logo: {
    type: 'url' | 'upload';
    value: string;
  };
  sliders: SliderValue[];
  outputs: OutputValue[];
  priceDetails: PriceDetailValue[];
  customFields?: {
    name: string;
    value: string;
    type: 'text' | 'number' | 'boolean';
  }[];
}

export interface SliderValue {
  name: string;
  minValue: number;
  maxValue: number;
  step: number;
}

export interface OutputValue {
  name: string;
  costPerUnit: number;
  monthlyCalculation: string;
  yearlyCalculation: string;
}

export interface PriceDetailValue {
  name: string;
  value: string | number | boolean;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin';
  lastLogin: string;
}
