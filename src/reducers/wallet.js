// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = [];

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default wallet;
