import { describe, it, expect } from "vitest";
import {
  sign,
  clamp,
  clamp01,
  degreesToRadians,
  radiansToDegrees,
  pingPong,
  wrap,
  angleDeltaDegrees,
  angleDeltaRadians,
  normalize,
  nextPowerOfTwo,
  gcd,
} from "./math";

describe("sign", () => {
  it("should return -1 for negative numbers", () => {
    expect(sign(-5)).toBe(-1);
    expect(sign(-0.1)).toBe(-1);
    expect(sign(-Infinity)).toBe(-1);
  });

  it("should return 1 for positive numbers", () => {
    expect(sign(5)).toBe(1);
    expect(sign(0.1)).toBe(1);
    expect(sign(Infinity)).toBe(1);
  });

  it("should return 0 for zero", () => {
    expect(sign(0)).toBe(0);
    expect(sign(-0)).toBe(0);
  });
});

describe("clamp", () => {
  it("should return the value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("should return min when value is below range", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(-100, -50, 50)).toBe(-50);
  });

  it("should return max when value is above range", () => {
    expect(clamp(15, 0, 10)).toBe(10);
    expect(clamp(100, -50, 50)).toBe(50);
  });
});

describe("clamp01", () => {
  it("should clamp values between 0 and 1", () => {
    expect(clamp01(0.5)).toBe(0.5);
    expect(clamp01(-0.5)).toBe(0);
    expect(clamp01(1.5)).toBe(1);
    expect(clamp01(0)).toBe(0);
    expect(clamp01(1)).toBe(1);
  });
});

describe("degToRad", () => {
  it("should convert degrees to radians", () => {
    expect(degreesToRadians(0)).toBe(0);
    expect(degreesToRadians(90)).toBeCloseTo(Math.PI / 2);
    expect(degreesToRadians(180)).toBeCloseTo(Math.PI);
    expect(degreesToRadians(360)).toBeCloseTo(2 * Math.PI);
    expect(degreesToRadians(-90)).toBeCloseTo(-Math.PI / 2);
  });
});

describe("radToDeg", () => {
  it("should convert radians to degrees", () => {
    expect(radiansToDegrees(0)).toBe(0);
    expect(radiansToDegrees(Math.PI / 2)).toBeCloseTo(90);
    expect(radiansToDegrees(Math.PI)).toBeCloseTo(180);
    expect(radiansToDegrees(2 * Math.PI)).toBeCloseTo(360);
    expect(radiansToDegrees(-Math.PI / 2)).toBeCloseTo(-90);
  });
});

describe("pingPong", () => {
  it("should return correct values for triangle wave", () => {
    expect(pingPong(0, 1)).toBe(0);
    expect(pingPong(1, 1)).toBe(1);
    expect(pingPong(2, 1)).toBe(0);
    expect(pingPong(3, 1)).toBe(1);
    expect(pingPong(0.5, 1)).toBe(0.5);
    expect(pingPong(1.5, 1)).toBe(0.5);
  });

  it("should handle different lengths", () => {
    expect(pingPong(0, 5)).toBe(0);
    expect(pingPong(5, 5)).toBe(5);
    expect(pingPong(10, 5)).toBe(0);
    expect(pingPong(7.5, 5)).toBe(2.5);
  });
});

describe("wrap", () => {
  it("should wrap values within range", () => {
    expect(wrap(5, 0, 3)).toBe(2);
    expect(wrap(-1, 0, 3)).toBe(2);
    expect(wrap(7, 2, 5)).toBe(4);
    expect(wrap(370, 0, 360)).toBe(10);
  });

  it("should handle values within range", () => {
    expect(wrap(1, 0, 3)).toBe(1);
    expect(wrap(2.5, 2, 5)).toBe(2.5);
  });

  it("should handle swapped parameters", () => {
    expect(wrap(5, 10, 0)).toBe(5);
    expect(wrap(-1, 3, 0)).toBe(2);
  });

  it("should handle zero cycle", () => {
    expect(wrap(5, 2, 2)).toBe(2);
  });
});

describe("angleDifferenceDegrees", () => {
  it("should calculate angle differences in degrees", () => {
    expect(angleDeltaDegrees(0, 90)).toBe(90);
    expect(angleDeltaDegrees(0, 450)).toBe(90);
    expect(angleDeltaDegrees(350, 10)).toBe(20);
    expect(angleDeltaDegrees(10, 350)).toBe(-20);
  });
});

describe("angleDifferenceRadians", () => {
  it("should calculate angle differences in radians", () => {
    expect(angleDeltaRadians(0, Math.PI)).toBeCloseTo(-Math.PI);
    expect(angleDeltaRadians(0, 3 * Math.PI)).toBeCloseTo(-Math.PI);
    expect(angleDeltaRadians(0, Math.PI / 2)).toBeCloseTo(Math.PI / 2);
  });
});

describe("normalize", () => {
  it("should normalize values to 0-1 range", () => {
    expect(normalize(5, 0, 10)).toBe(0.5);
    expect(normalize(0, 0, 10)).toBe(0);
    expect(normalize(10, 0, 10)).toBe(1);
    expect(normalize(-5, 0, 10)).toBe(0);
    expect(normalize(15, 0, 10)).toBe(1);
  });

  it("should handle different ranges", () => {
    expect(normalize(7.5, 5, 10)).toBe(0.5);
    expect(normalize(0, -10, 10)).toBe(0.5);
  });
});

describe("nextPowerOfTwo", () => {
  it("should return correct powers of two", () => {
    expect(nextPowerOfTwo(1)).toBe(1);
    expect(nextPowerOfTwo(3)).toBe(4);
    expect(nextPowerOfTwo(8)).toBe(8);
    expect(nextPowerOfTwo(15)).toBe(16);
    expect(nextPowerOfTwo(17)).toBe(32);
    expect(nextPowerOfTwo(1000)).toBe(1024);
  });

  it("should throw TypeError for non-safe integers", () => {
    expect(() => {
      return nextPowerOfTwo(1.5);
    }).toThrow(TypeError);
    expect(() => {
      return nextPowerOfTwo(Number.NaN);
    }).toThrow(TypeError);
    expect(() => {
      return nextPowerOfTwo(Infinity);
    }).toThrow(TypeError);
  });

  it("should throw RangeError for non-positive values", () => {
    expect(() => {
      return nextPowerOfTwo(0);
    }).toThrow(RangeError);
    expect(() => {
      return nextPowerOfTwo(-1);
    }).toThrow(RangeError);
  });

  it("should throw RangeError for values too large", () => {
    const maxSafePowerOfTwo = 1 << 30;
    expect(() => {
      return nextPowerOfTwo(maxSafePowerOfTwo + 1);
    }).toThrow(RangeError);
  });

  it("should handle edge cases", () => {
    expect(nextPowerOfTwo(2)).toBe(2);
    expect(nextPowerOfTwo(4)).toBe(4);
    expect(nextPowerOfTwo(16)).toBe(16);
    expect(nextPowerOfTwo(1024)).toBe(1024);
  });
});

describe("findGreatestCommonDivisor", () => {
  it("should calculate GCD of positive integers", () => {
    expect(gcd(48, 18)).toBe(6);
    expect(gcd(12, 8)).toBe(4);
    expect(gcd(17, 13)).toBe(1);
    expect(gcd(100, 25)).toBe(25);
  });

  it("should handle negative integers", () => {
    expect(gcd(-12, 8)).toBe(4);
    expect(gcd(12, -8)).toBe(4);
    expect(gcd(-12, -8)).toBe(4);
  });

  it("should handle zero values", () => {
    expect(gcd(0, 5)).toBe(5);
    expect(gcd(5, 0)).toBe(5);
    expect(gcd(0, 0)).toBe(0);
  });

  it("should handle edge cases", () => {
    expect(gcd(1, 1)).toBe(1);
    expect(gcd(1, 100)).toBe(1);
    expect(gcd(Number.MAX_SAFE_INTEGER, 1)).toBe(1);
  });

  it("should throw TypeError for non-safe integers", () => {
    expect(() => {
      return gcd(1.5, 2);
    }).toThrow(TypeError);
    expect(() => {
      return gcd(1, 2.5);
    }).toThrow(TypeError);
    expect(() => {
      return gcd(Number.MAX_SAFE_INTEGER + 1, 2);
    }).toThrow(TypeError);
    expect(() => {
      return gcd(Number.POSITIVE_INFINITY, 2);
    }).toThrow(TypeError);
    expect(() => {
      return gcd(Number.NaN, 2);
    }).toThrow(TypeError);
  });
});
