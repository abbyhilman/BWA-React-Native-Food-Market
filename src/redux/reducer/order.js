const initOrder = {
  orders: [],
  inProgress: [],
  pastOrders: [],
};

export const orderReducer = (state = initOrder, action) => {
  if (action.type === 'SET_ORDER') {
    return {
      ...state,
      orders: action.value,
    };
  }
  if (action.type === 'SET_IN_PROGRESS') {
    return {
      ...state,
      inProgress: action.value,
    };
  }
  if (action.type === 'SET_PAST_ORDERS') {
    return {
      ...state,
      pastOrders: action.value,
    };
  }
  return state;
};

const initProduct = {
  baskets: [],
};

export const countReducer = (state = initProduct, action) => {
  if (action.type === 'SET_BASKETS') {
    return {
      ...state,
      baskets: action.value,
    };
  }
  return state;
};

const iniCart = {
  cart: [],
  total: 0,
  count: 0,
};

export const cartReducer = (state = iniCart, action) => {
  //let carts = [...state, action.value];
  //console.log('ADD_TO_CART', action.value, state.cart, state.total);
  if (action.type === 'ADD_TO_CART') {
    return {
      ...state,
      cart: [...state.cart, action.value],
      total: action.value.totalPrice,
      count: action.value.totalItem,
      //total: state.total + action.value.totalPrice,
      //count: state.count + action.value.totalItem,
    };
  }
  if (action.type === 'EMPTY_CART') {
    return {
      ...state,
      cart: [],
      total: 0,
      count: 0,
    };
  }
  if (action.type === 'REMOVE_CART') {
    //console.log('REMOVE_REDUCER', action.value, state.cart, state.total);
    return {
      ...state,
      // cart: [
      //   state.cart.filter((item) => item.id !== action.value),
      //   state.cart.slice(action.value + 1),
      // ],
      cart: state.cart.filter((item) => item.id !== action.value),
      total: action.value.totalPrice,
      count: action.value.totalItem,
      // total: state.total - action.value.totalPrice,
      // count: state.count - action.value.totalItem,
    };
  }
  return state;
};
