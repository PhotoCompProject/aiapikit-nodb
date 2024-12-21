import { create } from 'zustand';
import { ApiProvider, ApiCategory, PricingModel } from '../types/api';
import { FilterState, SortOption, FilterOptions } from '../types/filters';

interface StoreState {
  selectedCategory: ApiCategory | null;
  selectedPricing: PricingModel | null;
  searchQuery: string;
  compareList: ApiProvider[];
  globalUsage: number | null;
  globalOutputUsage: number | null;
  usageOverrides: Record<string, { input: number; output?: number }>;
  filters: FilterState;
  hasActiveSliders: boolean;
  setCategory: (category: ApiCategory | null) => void;
  setPricing: (pricing: PricingModel | null) => void;
  setSearchQuery: (query: string) => void;
  addToCompare: (api: ApiProvider) => void;
  removeFromCompare: (apiId: string) => void;
  setGlobalUsage: (usage: number | null) => void;
  setGlobalOutputUsage: (usage: number | null) => void;
  setUsageOverride: (apiId: string, input: number, output?: number) => void;
  removeUsageOverride: (apiId: string) => void;
  removeAllUsageOverrides: () => void;
  setSortOption: (sort: SortOption) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedCategory: null,
  selectedPricing: null,
  searchQuery: '',
  compareList: [],
  globalUsage: null,
  globalOutputUsage: null,
  usageOverrides: {},
  hasActiveSliders: false,
  filters: {
    sortBy: 'price-asc',
    provider: undefined,
    pricing: undefined
  },
  setCategory: (category) => set({ selectedCategory: category }),
  setPricing: (pricing) => set({ selectedPricing: pricing }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  addToCompare: (api) =>
    set((state) => ({
      compareList: state.compareList.length < 3 
        ? [...state.compareList, api]
        : state.compareList,
    })),
  removeFromCompare: (apiId) =>
    set((state) => ({
      compareList: state.compareList.filter((api) => api.id !== apiId),
    })),
  setGlobalUsage: (usage) => set({ 
    globalUsage: usage,
    hasActiveSliders: usage !== null
  }),
  setGlobalOutputUsage: (usage) => set({ 
    globalOutputUsage: usage,
    hasActiveSliders: usage !== null
  }),
  setUsageOverride: (apiId, input, output) =>
    set((state) => ({
      usageOverrides: { 
        ...state.usageOverrides, 
        [apiId]: { input, output }
      },
      // Only reset global values when setting an override
      globalUsage: null,
      globalOutputUsage: null,
      hasActiveSliders: true
    })),
  removeUsageOverride: (apiId) =>
    set((state) => {
      const { [apiId]: _, ...rest } = state.usageOverrides;
      const hasActive = Object.keys(rest).length > 0 || state.globalUsage !== null;
      return { 
        usageOverrides: rest,
        hasActiveSliders: hasActive
      };
    }),
  removeAllUsageOverrides: () =>
    set({
      usageOverrides: {},
      globalUsage: null,
      globalOutputUsage: null,
      hasActiveSliders: false
    }),
  setSortOption: (sortBy) =>
    set((state) => ({
      filters: { ...state.filters, sortBy }
    })),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    })),
}));
