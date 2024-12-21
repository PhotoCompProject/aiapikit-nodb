export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'recent' | 'featured';

export interface FilterOptions {
  provider?: string;
}

export interface FilterState extends FilterOptions {
  sortBy: SortOption;
}