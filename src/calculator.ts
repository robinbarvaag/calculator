import { calculateSubExpression } from "./utils/helpers";
let processingParenthesis = false;

function calculateExpression(expression: string): number {
  //if the expression start with - sign and is followed with only one number return the number
  if (expression.match(/^-\d+$/)) {
    return Number(expression);
  }

  let multipleExpressions: string[] = [];
  let firstOpenedParenthesisIndex = undefined;
  let openedParenthesis = 0;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (Number(char) && processingParenthesis === false) {
      let num = char;
      while (i + 1 < expression.length && !isNaN(Number(expression[i + 1]))) {
        num += expression[i + 1];
        i++;
      }
      multipleExpressions.push(num);
    } else if (char === "(") {
      processingParenthesis = true;
      if (firstOpenedParenthesisIndex === undefined) {
        firstOpenedParenthesisIndex = i;
      }
      openedParenthesis++;
    } else if (char === ")") {
      openedParenthesis--;
      if (
        openedParenthesis === 0 &&
        firstOpenedParenthesisIndex !== undefined
      ) {
        const subExpression = expression.substring(
          firstOpenedParenthesisIndex,
          i + 1
        );
        multipleExpressions.push(subExpression);
        firstOpenedParenthesisIndex = undefined;
        processingParenthesis = false;
      }
    } else if (processingParenthesis === false) {
      multipleExpressions.push(char);
    }
  }

  // Recursively process multipleExpressions with nested parentheses
  for (let i = 0; i < multipleExpressions.length; i++) {
    const currentExpression = multipleExpressions[i];
    if (currentExpression.includes("(")) {
      const subExpression = currentExpression.substring(
        currentExpression.indexOf("(") + 1,
        currentExpression.lastIndexOf(")")
      );
      const result = calculateExpression(subExpression);
      multipleExpressions.splice(i, 1, result.toString());
      i--;
    }
  }

  return Number(calculateSubExpression(multipleExpressions)[0]);
}

export { calculateExpression, calculateSubExpression };
