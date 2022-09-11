import { describe, expect, test } from '@jest/globals';
import sortArray from "../src/real-example/sort";

describe('sortArray Test Suite', () => {
  test('should sort an array of numbers', () => {
    expect(sortArray([4, 5, 2, 1])).toEqual([1, 2, 4, 5]);
  });

  test('should sort an array of alphabets', () => {
    expect(sortArray(['d', 'c', 'b', 'a'])).toEqual(['a', 'b', 'c', 'd']);
  });

  test('should sort an array of alphabets and numbers with numbers at the beginning', () => {
    expect(sortArray([4, 'c', 'a', 3, 1, 'd', 'b'])).toEqual([1, 3, 4, "a", "b", "c", "d"]);
  });

  test('should leave an unsorted array unchanged', () => {
    expect(sortArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('should be indifferent to the empty array', () => {
    expect(sortArray([])).toEqual([]);
  });
});