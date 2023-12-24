// Importing the useReducer hook from React
import { useReducer } from "react";

// Importing DigitButton and OperationButton components
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

// Importing the main stylesheet
import "./App.css";

// Importing action types for the calculator
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

// Reducer function to handle calculator actions
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // Handling adding digits to the current operand
      if (state.overwrite) {
        return {
          ...state,
          Currentoperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.Currentoperand === "0") {
        return state;
      }
      if (payload.digit === "0" && state.Currentoperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        Currentoperand: `${state.Currentoperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // Handling choosing an operation
      if (state.Currentoperand == null && state.Previousoperand == null) {
        return state;
      }
      if (state.Previousoperand == null) {
        return {
          ...state,
          operation: payload.operation,
          Previousoperand: state.Currentoperand,
          Currentoperand: null,
        };
      }
      return {
        ...state,
        Previousoperand: evaluate(state),
        operation: payload.operation,
        Currentoperand: null,
      };

    case ACTIONS.CLEAR:
      // Handling clearing the calculator
      return {};

    case ACTIONS.DELETE_DIGIT:
      // Handling deleting a digit from the current operand
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          Currentoperand: null,
        };
      }
      if (state.Currentoperand == null) return state;
      if (state.Currentoperand.length === 1) {
        return { ...state, Currentoperand: null };
      }
      return {
        ...state,
        Currentoperand: state.Currentoperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      // Handling evaluating the expression
      if (
        state.operation == null ||
        state.Currentoperand == null ||
        state.Previousoperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        Previousoperand: null,
        operation: null,
        Currentoperand: evaluate(state),
      };
  }
}

// Helper function to perform the evaluation based on the operation
function evaluate({ Currentoperand, Previousoperand, operation }) {
  const prev = parseFloat(Previousoperand);
  const current = parseFloat(Currentoperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

// Number formatting for the display
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

// Function to format the operand for display
function formatOperand(operand) {
  if (operand == null) return "";
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

// Main App component
function App() {
  // Use reducer to manage state and actions
  const [{ Currentoperand, Previousoperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="Calculatorgrid">
      {/* Output display */}
      <div className="Output">
        <div className="Previousoperand">
          {formatOperand(Previousoperand)} {operation}
        </div>
        <div className="Currentoperand">{formatOperand(Currentoperand)}</div>
      </div>

      {/* Calculator buttons */}
      <button
        className="Span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>

      {/* Digit and Operation buttons */}
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="Span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

// Exporting the main App component
export default App;
