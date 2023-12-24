// Importing action types from the main App
import { ACTIONS } from "./App";

// OperationButton functional component
export default function OperationButton({ dispatch, operation }) {
  // Button click event handler dispatching the CHOOSE_OPERATION action
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {/* Display the operation symbol on the button */}
      {operation}
    </button>
  );
}
