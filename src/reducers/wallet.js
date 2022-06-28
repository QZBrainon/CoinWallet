// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = { currencies: [], expenses: [] };
const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_COINS':
    return {
      ...state,
      currencies: Object.keys(action.coins).filter((coin) => coin !== 'USDT'),
    };
  case 'SAVE_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };

  default:
    return state;
  }
};

export default wallet;
