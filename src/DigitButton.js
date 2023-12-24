// Importing action types from the main App
import { ACTIONS } from "./App";

// DigitButton functional component
export default function DigitButton({ dispatch, digit }) {
  // Button click event handler dispatching the ADD_DIGIT action
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {/* Display the digit on the button */}
      {digit}
    </button>
  );
}
