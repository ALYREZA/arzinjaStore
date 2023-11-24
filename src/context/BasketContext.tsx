import React, {createContext, useReducer, useEffect, useCallback} from 'react';

const initialState = {
  items: new Map(),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: new Map(state.items).set(action.payload.name, action.payload),
      };
    default:
      return state;
  }
};

const BasketContext = createContext(undefined);

const BasketProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const defaultStatus = ['pending', 'in-process', 'delivery', 'delivered'];

  const getRandomStatus = () => {
    const randomIndex = Math.floor(Math.random() * defaultStatus.length);
    return defaultStatus[randomIndex];
  };

  const updateStatusRandomly = useCallback(() => {
    state.items.forEach((item, name) => {
      const randomStatus = getRandomStatus();
      dispatch({
        type: 'ADD_ITEM',
        payload: {name, ...item, status: randomStatus},
      });
    });
  }, [state.items]);

  const addItem = ({name, location, category, status = 'pending'}) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {name, location, status, category},
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateStatusRandomly();
    }, 30000); // 30 seconds
    return () => clearInterval(intervalId);
  }, [updateStatusRandomly]);

  const manualUpdate = useCallback(() => {
    return state.items;
  }, [state.items]);

  return (
    <BasketContext.Provider value={{items: state.items, addItem, manualUpdate}}>
      {children}
    </BasketContext.Provider>
  );
};

export {BasketContext, BasketProvider};
