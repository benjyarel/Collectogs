/**
 * Sorts items by year, ascending, with items missing a year (0, null, undefined) placed first.
 */
export const sortByYear = <T extends { year?: number | null }>(items: T[]): T[] =>
  [...items].sort((a, b) => (a.year || 0) - (b.year || 0));
