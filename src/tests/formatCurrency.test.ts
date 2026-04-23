import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats a number as BRL currency', () => {
    expect(formatCurrency(4.60)).toBe('R$\xa04,60');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('R$\xa00,00');
  });

  it('formats large numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('R$\xa01.234,56');
  });
});