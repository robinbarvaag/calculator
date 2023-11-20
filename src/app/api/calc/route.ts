import { NextRequest } from "next/server";
import { readFileSync, writeFileSync } from "fs";

import {
  validateInputAndStripInput,
  handleExpressionWithOperator,
  handleExpressionWithoutOperator,
} from "../../../utils/helpers";

export async function POST(req: NextRequest) {
  let result = 0;
  try {
    const bodyContent = await req.text();

    if (!bodyContent) {
      throw new Error("Expression not provided");
    }

    const inputExpression = validateInputAndStripInput(bodyContent);

    if (inputExpression === false) {
      throw new Error("Invalid input");
    }

    // If input starts with an operator, use the last calculated result as a starting point
    const lastResult = Number(readFileSync(`local_storage.txt`, "utf8"));

    const startsWithOperator = inputExpression.match(/^[+\-*/]/);

    if (startsWithOperator) {
      result = handleExpressionWithOperator(inputExpression, lastResult);
    } else {
      result = handleExpressionWithoutOperator(inputExpression);
    }
  } catch (exception: any) {
    return Response.json({ error: exception.message }, { status: 400 });
  }

  writeFileSync(`local_storage.txt`, result + "");
  return Response.json({ result });
}
