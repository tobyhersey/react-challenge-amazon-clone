export const initalState = {
  basket: [],
};

const reducer = (state , action) => {
  console.log(action);
  switch(action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item], //wtf
      };

    default:
      return state;
  }
};

export default reducer;