import { calculateExpression } from "../src/calculator";

describe("calculateExpression", () => {
  test("evaluates simple expressions", () => {
    expect(calculateExpression("2+3")).toBe(5);
    expect(calculateExpression("4*5")).toBe(20);
    expect(calculateExpression("8-3")).toBe(5);
    expect(calculateExpression("6/2")).toBe(3);
    expect(calculateExpression("100/50")).toBe(2);
    expect(calculateExpression("2+8*5")).toBe(42);
    expect(calculateExpression("5/6")).toBe(0.8333333333333334);
  });

  test("evaluates expressions with parentheses", () => {
    expect(calculateExpression("(2+3)*4")).toBe(20);
    expect(calculateExpression("6/(2+1)")).toBe(2);
    expect(calculateExpression("(4+2)*(7-3)")).toBe(24);
    expect(calculateExpression("(1+2)*5")).toBe(15);
    expect(calculateExpression("1+((3*9)+(3/3))")).toBe(29);
  });

  test("handles unary minus", () => {
    expect(calculateExpression("1-(-1)")).toBe(2);
    expect(calculateExpression("1-(-5)")).toBe(6);
    expect(calculateExpression("1-(-2+(1-1))")).toBe(3);
    expect(calculateExpression("1-(-10/(2*2))")).toBe(3.5);
    expect(calculateExpression("1-(2+(1-2))")).toBe(0);
  });

  test("handles complex expressions", () => {
    expect(calculateExpression("5+2*3-(4/2)")).toBe(9);
    expect(calculateExpression("(8-2)*(3+5)/4")).toBe(12);
  });

  test("mock for example", () => {
    const lastResult = 7;
    const calculation = calculateExpression("-10");
    expect(lastResult + calculation).toBe(-3);
  });
});
