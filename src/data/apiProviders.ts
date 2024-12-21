import { ApiProvider } from '../types/api';

export const apiProviders: ApiProvider[] = [
  // Text Generation
  {
    id: 'openai-gpt4',
    name: 'GPT-4',
    provider: 'OpenAI',
    category: 'text-generation',
    description: 'Advanced language model for text generation and analysis',
    pricing: 'pay-per-use',
    features: ['Context awareness', 'Multiple languages', 'Code generation'],
    documentation: 'https://openai.com/gpt-4',
    basePrice: 0.03,
    logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop',
    inputMetric: {
      type: 'tokens',
      label: 'Monthly Tokens',
      defaultValue: 1000000,
      outputDefaultValue: 800000,
      step: 100000,
      min: 100000,
      max: 10000000
    },
    pricePerUnit: {
      input: 0.03,
      output: 0.06
    }
  },
  {
    id: 'anthropic-claude',
    name: 'Claude 2',
    provider: 'Anthropic',
    category: 'text-generation',
    description: 'Anthropic\'s advanced AI model for text generation',
    pricing: 'pay-per-use',
    features: ['Long context window', 'High accuracy', 'Research capabilities'],
    documentation: 'https://anthropic.com/claude',
    basePrice: 0.02,
    logo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=64&h=64&fit=crop',
    inputMetric: {
      type: 'tokens',
      label: 'Monthly Tokens',
      defaultValue: 1000000,
      outputDefaultValue: 800000,
      step: 100000,
      min: 100000,
      max: 10000000
    },
    pricePerUnit: {
      input: 0.02,
      output: 0.04
    }
  },
  // Image Generation
  {
    id: 'openai-dall-e',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    category: 'image-generation',
    description: 'Create realistic images and art from text descriptions',
    pricing: 'pay-per-use',
    features: ['High-quality images', 'Multiple sizes', 'Fast generation'],
    documentation: 'https://openai.com/dall-e-3',
    basePrice: 0.02,
    logo: 'https://images.unsplash.com/photo-1699133869757-dd1c241d5e7d?w=64&h=64&fit=crop',
    inputMetric: {
      type: 'images',
      label: 'Images per Month',
      defaultValue: 100,
      step: 10,
      min: 10,
      max: 10000
    },
    pricePerUnit: {
      operation: 0.02
    }
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    provider: 'Midjourney Inc.',
    category: 'image-generation',
    description: 'AI art generation with unique artistic style',
    pricing: 'subscription',
    features: ['Artistic style', 'High resolution', 'Fast iterations'],
    documentation: 'https://docs.midjourney.com',
    basePrice: 30,
    logo: 'https://images.unsplash.com/photo-1681412332760-3e97e8724d48?w=64&h=64&fit=crop',
    inputMetric: {
      type: 'images',
      label: 'Images per Month',
      defaultValue: 200,
      step: 50,
      min: 50,
      max: 20000
    },
    pricePerUnit: {
      operation: 0.15
    }
  },
  // Speech to Text
  {
    id: 'whisper',
    name: 'Whisper',
    provider: 'OpenAI',
    category: 'speech-to-text',
    description: 'Advanced speech recognition model',
    pricing: 'pay-per-use',
    features: ['Multiple languages', 'High accuracy', 'Real-time processing'],
    documentation: 'https://openai.com/whisper',
    basePrice: 0.006,
    logo: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=64&h=64&fit=crop',
    inputMetric: {
      type: 'minutes',
      label: 'Audio Minutes',
      defaultValue: 100,
      step: 10,
      min: 10,
      max: 10000
    },
    pricePerUnit: {
      operation: 0.006
    }
  },
  {
    id: 'assembly-ai',
    name: 'AssemblyAI',
    provider: 'AssemblyAI Inc.',
    category: 'speech-to-text',
    description: 'Real-time speech recognition API',
    pricing: 'pay-per-use',
    features: ['Speaker detection', 'Sentiment analysis', 'Auto chapters'],
    documentation: 'https://www.assemblyai.com/docs',
    basePrice: 0.005,
    logo: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=64&h=64&fit=crop',
    inputMetric: {
      type: 'minutes',
      label: 'Audio Minutes',
      defaultValue: 100,
      step: 10,
      min: 10,
      max: 10000
    },
    pricePerUnit: {
      operation: 0.005
    }
  }
];