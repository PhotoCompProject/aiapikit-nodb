import { ApiProvider } from '../types/api';
import { FilterState } from '../types/filters';

export const filterAndSortApis = (
  apis: ApiProvider[],
  filters: FilterState,
  searchQuery: string,
  selectedCategory: string | null,
  usageOverrides: Record<string, { input: number; output?: number }>,
  globalUsage: number | null,
  debouncedUsageOverrides: Record<string, { input: number; output?: number }>,
  debouncedGlobalUsage: number | null,
  hasActiveSliders: boolean = false
): ApiProvider[] => {
  let filteredApis = apis.filter((api) => {
    const matchesCategory = !selectedCategory || api.category === selectedCategory;
    const matchesSearch = api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = !filters.provider || api.provider === filters.provider;
    
    return matchesCategory && matchesSearch && matchesProvider;
  });

  const calculatePrice = (api: ApiProvider) => {
    const usage = debouncedUsageOverrides[api.id]?.input ?? debouncedGlobalUsage ?? api.inputMetric.defaultValue;
    if (api.pricePerUnit.operation) {
      return usage * api.pricePerUnit.operation;
    }
    const outputUsage = debouncedUsageOverrides[api.id]?.output ?? Math.floor(usage * 0.8);
    if (api.pricePerUnit.input && api.pricePerUnit.output) {
      return (usage * api.pricePerUnit.input) + (outputUsage * api.pricePerUnit.output);
    }
    return 0;
  };

  // Only apply sorting if no sliders are active
  if (!hasActiveSliders) {
    switch (filters.sortBy) {
      case 'featured':
        // Add featured sorting logic here if needed
        break;
      case 'recent':
        // Assuming the array order represents recency
        break;
      case 'price-asc':
        filteredApis.sort((a, b) => calculatePrice(a) - calculatePrice(b));
        break;
      case 'price-desc':
        filteredApis.sort((a, b) => calculatePrice(b) - calculatePrice(a));
        break;
      case 'name-asc':
        filteredApis.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredApis.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
  }

  return filteredApis;
};
