import { useState } from "react";
import "./App.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  // Number button
  const handleNumber = (number) => {
    if (display === "0" || waitingForSecondNumber) {
      setDisplay(number);
      setWaitingForSecondNumber(false);
    } else {
      setDisplay(display + number);
    }
  };

  // Decimal button
  const handleDecimal = () => {
    if (waitingForSecondNumber) {
      setDisplay("0.");
      setWaitingForSecondNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // Operator button
  const handleOperator = (op) => {
    const currentNumber = Number(display);

    if (firstNumber === null) {
      setFirstNumber(currentNumber);
    } else if (operator) {
      const result = calculateResult(firstNumber, currentNumber, operator);

      setDisplay(String(result));
      setFirstNumber(result);
    }

    setOperator(op);
    setWaitingForSecondNumber(true);
  };

  // Calculation
  const calculateResult = (num1, num2, op) => {
    if (op === "+") {
      return num1 + num2;
    }

    if (op === "-") {
      return num1 - num2;
    }

    if (op === "×") {
      return num1 * num2;
    }

    if (op === "÷") {
      if (num2 === 0) {
        return "Error";
      }
      return num1 / num2;
    }
  };

  // Equal button
  const handleEqual = () => {
    if (firstNumber === null || operator === null) {
      return;
    }

    const secondNumber = Number(display);

    const result = calculateResult(
      firstNumber,
      secondNumber,
      operator
    );

    setDisplay(String(result));
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(true);
  };

  // Clear button
  const handleClear = () => {
    setDisplay("0");
    setFirstNumber(null);
    setOperator(null);
    setWaitingForSecondNumber(false);
  };

  // Delete button
  const handleDelete = () => {
    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  return (
    <div className="calculator">

      {/* Display */}
      <div className="display">
        {display}
      </div>

      {/* Buttons */}
      <div className="buttons">

        <button
          className="clear"
          onClick={handleClear}
        >
          AC
        </button>

        <button
          className="delete"
          onClick={handleDelete}
        >
          DEL
        </button>

        <button
          className="operator"
          onClick={() => handleOperator("÷")}
        >
          ÷
        </button>

        <button
          className="operator"
          onClick={() => handleOperator("×")}
        >
          ×
        </button>

        <button onClick={() => handleNumber("7")}>
          7
        </button>

        <button onClick={() => handleNumber("8")}>
          8
        </button>

        <button onClick={() => handleNumber("9")}>
          9
        </button>

        <button
          className="operator"
          onClick={() => handleOperator("-")}
        >
          −
        </button>

        <button onClick={() => handleNumber("4")}>
          4
        </button>

        <button onClick={() => handleNumber("5")}>
          5
        </button>

        <button onClick={() => handleNumber("6")}>
          6
        </button>

        <button
          className="operator"
          onClick={() => handleOperator("+")}
        >
          +
        </button>

        <button onClick={() => handleNumber("1")}>
          1
        </button>

        <button onClick={() => handleNumber("2")}>
          2
        </button>

        <button onClick={() => handleNumber("3")}>
          3
        </button>

        <button
          className="equal"
          onClick={handleEqual}
        >
          =
        </button>

        <button
          className="zero"
          onClick={() => handleNumber("0")}
        >
          0
        </button>

        <button onClick={handleDecimal}>
          .
        </button>

      </div>
    </div>
  );
}

export default Calculator;