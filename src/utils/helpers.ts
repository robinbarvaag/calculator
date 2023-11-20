import { calculateExpression } from "../calculator";

const operatorPrecedence: Record<string, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

function calculateSubExpression(multipleExpressions: string[]): string[] {
  // Calculate multipleExpressions with higher precedence first
  for (let x = 0; x < multipleExpressions.length; x++) {
    if (
      !Number(multipleExpressions[x]) &&
      Number(multipleExpressions[x]) !== 0
    ) {
      const currentOperator = multipleExpressions[x];
      if (operatorPrecedence[currentOperator] >= 2) {
        const a = multipleExpressions[x - 1];
        const b = multipleExpressions[x + 1];
        const result = applyOperation(currentOperator, Number(b), Number(a));
        multipleExpressions.splice(x - 1, 3, result.toString()); // Remove a, operator, and b, insert the result
        x -= 2; // Adjust x to the correct index after the splice
      }
    }
  }

  multipleExpressions = multipleExpressions.filter(
    (element) => element !== undefined
  );

  if (multipleExpressions[0] === "-") {
    multipleExpressions.unshift("0");
  }

  for (let y = 0; y < multipleExpressions.length; y++) {
    if (
      !Number(multipleExpressions[y]) &&
      Number(multipleExpressions[y]) !== 0
    ) {
      const currentOperator = multipleExpressions[y];
      const a = multipleExpressions[y - 1];
      const b = multipleExpressions[y + 1];
      const result = applyOperation(currentOperator, Number(b), Number(a));
      multipleExpressions.splice(y - 1, 3, result.toString()); // Remove a, operator, and b, insert the result
      y -= 2; // Adjust y to the correct index after the splice
    }
  }

  return multipleExpressions.filter((element) => element !== undefined);
}

function applyOperation(operator: string, b: number, a: number): number {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        throw new Error("Division by zero");
      }
      return a / b;
    default:
      throw new Error("Not supported operator");
  }
}

function handleExpressionWithOperator(
  inputExpression: string,
  lastResult: unknown
) {
  const operator = inputExpression[0];
  const expressionWithoutOperator = inputExpression.substring(1);

  if (hasMultipleOperators(inputExpression)) {
    const calculatedExpression = calculateExpression(expressionWithoutOperator);
    return applyOperation(operator, calculatedExpression, Number(lastResult));
  } else {
    return applyOperation(
      operator,
      Number(expressionWithoutOperator),
      Number(lastResult)
    );
  }
}

function handleExpressionWithoutOperator(inputExpression: string) {
  const calculatedExpression = calculateExpression(inputExpression);
  return calculatedExpression;
}

function checkForUnbalancedParenthesis(expression: string): boolean {
  let openedParenthesis = 0;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === "(") {
      openedParenthesis++;
    } else if (char === ")") {
      openedParenthesis--;
    }
  }

  return openedParenthesis !== 0;
}

function hasMultipleOperators(input: string): boolean {
  const operators = "+-*/";
  let operatorCount = 0;

  for (let i = 0; i < input.length; i++) {
    if (operators.includes(input[i])) {
      operatorCount++;

      // If you want to stop counting after finding more than one operator
      if (operatorCount > 1) {
        return true;
      }
    }
  }

  return false;
}

function validateInputAndStripInput(expression: string): string | false {
  // Validate that the input is a valid mathematical expression
  expression = expression.replace(/'/g, "");
  const validCharactersRegex = new RegExp(
    /^[\d+\-*\/(). ]+$|^\([-+]?[0-9]*\.?[0-9]+([-+*\/]?([0-9]*\.?[0-9]+))*\)$/
  );

  if (checkForUnbalancedParenthesis(expression)) {
    throw new Error("Unbalanced parenthesis");
  }

  return expression.match(validCharactersRegex)
    ? expression.replace(/'/g, "")
    : false;
}

export {
  handleExpressionWithOperator,
  handleExpressionWithoutOperator,
  validateInputAndStripInput,
  hasMultipleOperators,
  calculateSubExpression,
};
