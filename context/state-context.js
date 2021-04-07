import React, {useReducer, createContext} from 'react';

export const StateContext = createContext();

const initialState = {
  stateWise: [],
  stateDetail: {},
  options: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'STATE_WISE':
      return {
        stateWise: action.payload,
        options: action.payload.map(item => item.state),
        stateDetail: action.payload.find(item => item.state == 'Total'),
      };
    case 'STATE_DETAIL':
      return {
        ...state,
        stateDetail: state.stateWise.find(item => item.state == action.payload),
      };
    default:
      return state;
  }
};

export const StateContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {props.children}
    </StateContext.Provider>
  );
};
