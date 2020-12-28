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
};

export const cartReducer = (state = iniCart, action) => {
  if (action.type === 'ADD_TO_CART') {
    return {
      ...state,
      cart: [action.value, ...state.cart],
      total: state.total + action.value.transaction.totalPrice,
    };
  }
  if (action.type === 'EMPTY_CART') {
    return {
      ...state,
      cart: [],
      total: 0,
    };
  }
  if (action.type === 'REMOVE_CART') {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.value.id),
      total: state.total - action.value.totalPrice,
    };
  }
  return state;
};
