import express from "express";
import bodyParser from "body-parser";
import NodeCache from "node-cache";
import {
  validateInputAndStripInput,
  handleExpressionWithOperator,
  handleExpressionWithoutOperator,
} from "./utils/helpers";

const app = express();
const cache = new NodeCache({ stdTTL: 0 });
const port = 8080;

app.use(bodyParser.text());

// API endpoint for performing calculations
app.post("/", (req, res) => {
  let result = 0;
  try {
    if (!req.body) {
      throw new Error("Expression not provided");
    }
    const inputExpression = validateInputAndStripInput(req.body);

    if (inputExpression === false) {
      throw new Error("Invalid input");
    }

    const lastResult = cache.get("lastResult");

    const startsWithOperator = inputExpression.match(/^[+\-*/]/);

    if (startsWithOperator) {
      result = handleExpressionWithOperator(inputExpression, lastResult);
    } else {
      result = handleExpressionWithoutOperator(inputExpression);
    }
  } catch (exception: any) {
    return res.status(400).json({ error: exception.message });
  }

  cache.set("lastResult", result.toString());
  return res.status(200).json(result);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
