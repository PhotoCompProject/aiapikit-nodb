import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // For demo purposes, return mock data if the API is not available
    if (!import.meta.env.PROD) {
      console.warn('Using mock data for development');
      return Promise.resolve({
        data: getMockData(error.config.url)
      });
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Mock data for development
function getMockData(url: string) {
  const mockData = {
    '/api-providers': [
      {
        id: '1',
        name: 'GPT-4',
        provider: 'OpenAI',
        category: 'text-generation',
        description: 'Advanced language model for text generation',
        pricing: 'pay-per-use',
        documentation: 'https://openai.com/gpt-4',
        basePrice: 0.03,
        logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=64&h=64&fit=crop',
        features: ['Context awareness', 'Multiple languages'],
        sliders: [
          {
            id: 1,
            apiId: '1',
            name: 'Input Tokens',
            type: 'tokens',
            defaultValue: 1000000,
            step: 100000,
            min: 100000,
            max: 10000000
          }
        ],
        outputs: [
          {
            id: 1,
            apiId: '1',
            name: 'Cost',
            calculationFormula: 'Input Tokens * 0.03'
          }
        ]
      }
    ]
  };

  return mockData[url as keyof typeof mockData] || [];
}

export default api;