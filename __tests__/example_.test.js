import { describe, expect, test } from '@jest/globals';
import example_ from "../src/example_/example_";

describe('Example Test Suite', () => {
  test('should pass 1', () => {
    expect(example_(1)).toBe(1);
  });

  test('should pass 2', () => {
    expect(example_('')).toBe('');
  });

  test('should pass 3', () => {
    expect(example_(true)).toBe(true);
  });

  test('should fail 4', () => {
    expect(example_('_')).toBe('');
  });

  test('should fail 5', () => {
    expect(example_('__')).toBe('');
  });
});