import { useReducer } from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import "./App.css"

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, {type, payload }){
  switch(type){
    case ACTIONS.ADD_DIGIT:
    if(state.overwrite){
      return{
        ...state,
        Currentoperand: payload.digit,
        overwrite: false,
      }
    }
    if (payload.digit === "0" && state.Currentoperand === "0") {
      return state;
    }
    if (payload.digit === "0" && state.Currentoperand.includes(".")){
      return state
    }

    return {
    ...state,
    Currentoperand: `${state.Currentoperand || ""}${payload.digit}`,
  };
  case ACTIONS.CHOOSE_OPERATION:
    if(state.Currentoperand == null && state.Previousoperand == null){
      return state
    }

    if(state.Previousoperand == null){
      return{
        ...state,
        operation: payload.operation,
        Previousoperand: state.Currentoperand,
        Currentoperand: null,
      }
    }
    
    return {
      ...state,
      Previousoperand: evaluate(state),
      operation: payload.operation,
      Currentoperand: null,
    }
    
  case ACTIONS.CLEAR:
    return{}
    case ACTIONS.DELETE_DIGIT:
    if(state.overwrite){
      return{
        ...state,
        overwrite: false,
        Currentoperand: null,
      }
    }
    if(state.Currentoperand == null) return state
    if(state.Currentoperand.length === 1){
      return{...state, Currentoperand: null}
    }

    return{
      ...state,
      Currentoperand: state.Currentoperand.slice(0, -1)
    }

  case ACTIONS.EVALUATE:
    if(state.operation == null || state.Currentoperand == null || state.Previousoperand == null ){
      return state
    }

    return{
      ...state,
      overwrite: true,
      Previousoperand: null,
      operation: null,
      Currentoperand: evaluate(state),
    }
  }
}

function evaluate({Currentoperand, Previousoperand, operation}){
  const prev = parseFloat(Previousoperand)
  const current = parseFloat(Currentoperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch(operation){
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }
  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
  if (operand == null) return "";
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}


function App() {
  const [{Currentoperand, Previousoperand, operation}, dispatch] = useReducer(
    reducer,
    {}
    );

  return (
    <div className="Calculatorgrid">
      <div className="Output">
        <div className="Previousoperand">{formatOperand(Previousoperand)} {operation}</div>
        <div className="Currentoperand">{formatOperand(Currentoperand)}</div>
      </div>
      <button className="Span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation= "/" dispatch= {dispatch}/>
      <DigitButton digit = "1" dispatch= {dispatch}/>
      <DigitButton digit = "2" dispatch= {dispatch}/>
      <DigitButton digit = "3" dispatch= {dispatch}/>
      <OperationButton operation= "*" dispatch= {dispatch}/>
      <DigitButton digit = "4" dispatch= {dispatch}/>
      <DigitButton digit = "5" dispatch= {dispatch}/>
      <DigitButton digit = "6" dispatch= {dispatch}/>
      <OperationButton operation= "+" dispatch= {dispatch}/>
      <DigitButton digit = "7" dispatch= {dispatch}/>
      <DigitButton digit = "8" dispatch= {dispatch}/>
      <DigitButton digit = "9" dispatch= {dispatch}/>
      <OperationButton operation= "-" dispatch= {dispatch}/>
      <DigitButton digit = "." dispatch= {dispatch}/>
      <DigitButton digit = "0" dispatch= {dispatch}/>
      <button 
        className="Span-two"
        onClick={() => dispatch ({type: ACTIONS.EVALUATE })}
      >=</button>
    </div>
  );
}

export default App;