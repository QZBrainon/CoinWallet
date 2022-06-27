// Coloque aqui suas actions
// starting project

export const saveEmail = (email) => ({
  type: 'SAVE_EMAIL',
  email,
});

export const saveCoins = (coins) => ({
  type: 'SAVE_COINS',
  coins,
});

export const getCoins = () => async (dispatch) => {
  const fetchCoins = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await fetchCoins.json();
  dispatch(saveCoins(response));
};
