export function formatCompactNumber(num: number): string {
  const formatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  });
  
  return formatter.format(num);
}

export function formatDetailNumber(num: number): string {
  return num.toLocaleString('en-US');
}

export function parseCompactNumber(str: string): number | null {
  // Remove commas and convert k/m/b/t to actual numbers
  const normalized = str.toLowerCase().replace(/,/g, '');
  const multipliers: { [key: string]: number } = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
    t: 1000000000000
  };

  // Try parsing with suffix
  for (const [suffix, multiplier] of Object.entries(multipliers)) {
    if (normalized.endsWith(suffix)) {
      const number = parseFloat(normalized.slice(0, -1));
      if (!isNaN(number)) {
        return number * multiplier;
      }
    }
  }

  // Try parsing as regular number
  const number = parseFloat(normalized);
  return isNaN(number) ? null : number;
}
