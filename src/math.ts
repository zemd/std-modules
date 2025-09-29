/**
 * Returns the sign of a number: -1 for negative, 1 for positive, and 0 for zero.
 */
export const sign = (x: number): -1 | 0 | 1 => {
  if (x < 0) {
    return -1;
  }
  if (x > 0) {
    return 1;
  }
  return 0;
};

/**
 * Restricts a value to be within a specified range. Useful for ensuring values stay within
 * valid bounds for UI elements, progress bars, or game physics calculations.
 */
export const clamp = (x: number, min: number, max: number): number => {
  return Math.min(Math.max(x, min), max);
};

/**
 * Clamps a number between 0 and 1. Alias to `clamp(x, 0, 1)`. Commonly used for normalizing percentages,
 * opacity values, or color components.
 */
export const clamp01 = (x: number): number => {
  return clamp(x, 0, 1);
};

/**
 * Converts degrees to radians. Essential for trigonometric calculations,
 * canvas rotations, and physics simulations.
 */
export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Converts radians to degrees. Useful for displaying human-readable angles
 * and converting between mathematical calculations and user interfaces.
 */
export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

/**
 * Creates a triangle wave pattern that oscillates between 0 and a specified length.
 * Ideal for creating smooth back-and-forth animations, pendulum effects, or breathing UI elements.
 */
export const pingPong = (x: number, length: number): number => {
  const doubleLength = length * 2;
  const mod = x % doubleLength;
  return length - Math.abs(mod - length);
};

/**
 * Wraps a value within a specified range [from, to), creating cyclic behavior. Perfect for
 * implementing angle wrapping, looping animations, circular buffers, or ensuring
 * array indices stay within bounds.
 *
 * The result is always within [from, to) where 'from' is inclusive and 'to' is exclusive.
 * Invalid ranges are automatically corrected by swapping the parameters.
 */
export const wrap = (value: number, from: number, to: number): number => {
  let minValue = from;
  let maxValue = to;

  if (from > to) {
    // Swap values to ensure valid range without modifying original parameters
    minValue = to;
    maxValue = from;
  }

  const cycle = maxValue - minValue;
  if (cycle === 0) {
    return maxValue;
  }
  return value - cycle * Math.floor((value - minValue) / cycle);
};

/**
 * Calculates the shortest angular distance between two angles in degrees.
 * ```js
 * angleDeltaDegrees(0, 90); // Returns 90
 * angleDeltaDegrees(0, 450); // Returns 90
 * ```
 * Essential for smooth rotation animations and determining optimal turning directions.
 */
export const angleDeltaDegrees = (currentAngle: number, targetAngle: number): number => {
  return wrap(targetAngle - currentAngle, -180, 180);
};

/**
 * Calculates the shortest angular distance between two angles in radians.
 * Useful for mathematical computations involving trigonometric functions and physics simulations.
 * ```js
 * angleDeltaRadians(0, Math.PI); // Returns -Math.PI
 * angleDeltaRadians(0, 3 * Math.PI); // Returns -Math.PI
 * ```
 */
export const angleDeltaRadians = (currentAngle: number, targetAngle: number): number => {
  return wrap(targetAngle - currentAngle, -Math.PI, Math.PI);
};

/**
 * Converts a value from one range to a normalized 0-1 scale. Commonly used for
 * creating progress indicators, scaling measurements, or preparing data for interpolation.
 */
export const normalize = (value: number, from: number, to: number): number => {
  return clamp((value - from) / (to - from), 0, 1);
};

/**
 * Finds the smallest power of 2 that is greater than or equal to the input value.
 * Essential for optimizing memory allocation, texture sizes, and buffer capacities
 * in graphics programming and data structures.
 */
export const nextPowerOfTwo = (inputValue: number): number => {
  if (!Number.isSafeInteger(inputValue)) {
    throw new TypeError("Input must be a safe integer.");
  }
  if (inputValue <= 0) {
    throw new RangeError("Input must be positive");
  }
  if (inputValue === 1) {
    return 1;
  }

  // Check for overflow before processing
  // Maximum safe power of 2 in JavaScript is 2^53 - 1, but we use 2^30 as practical limit
  const maxSafePowerOfTwo = 1 << 30; // 2^30 = 1,073,741,824
  if (inputValue > maxSafePowerOfTwo) {
    throw new RangeError(`Input too large: ${inputValue} exceeds maximum safe power of 2`);
  }

  if ((inputValue & (inputValue - 1)) === 0) {
    return inputValue;
  }

  let x = inputValue - 1;

  x |= x >> 1;
  x |= x >> 2;
  x |= x >> 4;
  x |= x >> 8;
  x |= x >> 16;
  // Note: No need for >> 32 since we're working within 32-bit safe range

  return x + 1;
};

/**
 * Calculates the greatest common divisor of two integers using the Euclidean algorithm.
 * Useful for simplifying fractions, finding common denominators, or optimizing
 * grid layouts and proportional calculations.
 *
 * @throws {TypeError} When inputs are not safe integers
 */
export const gcd = (a: number, b: number): number => {
  if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) {
    throw new TypeError("Both arguments must be safe integers");
  }

  // Handle edge cases
  const absA = Math.abs(a);
  const absB = Math.abs(b);

  if (absA === 0) {
    return absB;
  }
  if (absB === 0) {
    return absA;
  }

  // Optimized iterative Euclidean algorithm
  let x = absA;
  let y = absB;

  while (y !== 0) {
    [x, y] = [y, x % y] as const;
  }

  return x;
};
