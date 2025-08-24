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
 * Restricts a value to be within a specified range defined by values min and max. If the value is
 * min <= value <= max, returns value.  If the value is greater than max, return max; if the value
 * is less than min, return min.
 * Otherwise, return the value unchanged.
 */
export const clamp = (x: number, min: number, max: number): number => {
  return Math.min(Math.max(x, min), max);
};

/**
 * Clamps a number between 0 and 1. Alias to `clamp(x, 0, 1)`.
 */
export const clamp01 = (x: number): number => {
  return clamp(x, 0, 1);
};

export const degToRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const radToDeg = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

/**
 * PingPong returns a value that increments and decrements between zero and the length.
 * It follows the triangle wave formula where the bottom is set to zero and the peak is set to length.
 */
export const pingPong = (x: number, length: number): number => {
  const doubleLength = length * 2;
  const mod = x % doubleLength;
  return length - Math.abs(mod - length);
};

/**
 * Wraps a value within a specified range [from, to).
 *
 * This function is useful for creating cyclic behaviors, such as:
 * - Wrapping angles to stay within 0-360 degrees
 * - Creating looping animations or counters
 * - Implementing periodic boundary conditions
 * - Ensuring array indices stay within bounds in circular buffers
 *
 * The function ensures the result is always within [from, to), where 'from' is inclusive
 * and 'to' is exclusive. If the input range is invalid (from > to), the parameters
 * are automatically swapped to create a valid range.
 *
 * ```js
 * wrap(5, 0, 3);    // Returns 2 (5 wraps around: 5 - 3 = 2)
 * wrap(-1, 0, 3);   // Returns 2 (-1 wraps around: -1 + 3 = 2)
 * wrap(7, 2, 5);    // Returns 4 (7 wraps to range [2,5): 7 - 3 = 4)
 * wrap(370, 0, 360); // Returns 10 (angle wrapping)
 * ```
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
 * Calculates the difference between two angles in degrees.
 * ```js
 *   angleDifferenceDegrees(0, 90); // Returns 90
 *   angleDifferenceDegrees(0, 450); // Also returns 90
 * ```
 */
export const angleDifferenceDegrees = (currentAngle: number, targetAngle: number): number => {
  return wrap(targetAngle - currentAngle, -180, 180);
};

/**
 * Calculates the difference between two angles in radians.
 * ```js
 *  angleDifferenceRadians(0, Math.PI); // Returns -Math.PI
 *  angleDifferenceRadians(0, 3 * Math.PI); // Also returns -Math.PI
 * ```
 */
export const angleDifferenceRadians = (currentAngle: number, targetAngle: number): number => {
  return wrap(targetAngle - currentAngle, -Math.PI, Math.PI);
};

/**
 * Normalizes a value within a specified range [from, to] to a value between 0 and 1.
 */
export const normalize = (value: number, from: number, to: number): number => {
  return clamp((value - from) / (to - from), 0, 1);
};

/**
 * Returns the smallest power of 2 that is greater than or equal to the input value.
 *
 * ```js
 * nextPowerOfTwo(1);   // Returns 1
 * nextPowerOfTwo(3);   // Returns 4
 * nextPowerOfTwo(8);   // Returns 8
 * nextPowerOfTwo(15);  // Returns 16
 * ```
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
