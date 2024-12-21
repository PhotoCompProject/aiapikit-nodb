export const styles = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  heading: {
    h1: 'text-3xl font-display font-bold text-gray-900',
    h2: 'text-2xl font-display font-bold text-gray-800',
    h3: 'text-xl font-display font-bold text-gray-800'
  },
  button: {
    base: 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200',
    primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500/20',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-orange-500/10',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base'
    }
  },
  card: {
    base: 'bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200',
    hover: 'hover:shadow-lg hover:border-orange-500/20',
    selected: 'border-orange-500 shadow-md',
    interactive: 'cursor-pointer hover:shadow-lg hover:border-orange-500/20'
  },
  colors: {
    primary: {
      50: '#FFF7ED',  // Lightest orange
      100: '#FFE4CC',
      200: '#FFD4A8',
      300: '#FFA94D',
      400: '#FF922B',
      500: '#F97316', // Primary orange
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12'  // Darkest orange
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    }
  }
};
