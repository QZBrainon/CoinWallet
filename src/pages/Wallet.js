import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getCoins, saveExpenses } from '../actions';

class Wallet extends React.Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // exchangeRates: {},
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCoins());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clickHandler = async () => {
    const { dispatch, numberOfExpenses } = this.props;
    const fetchCoins = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await fetchCoins.json();
    dispatch(saveExpenses({
      ...this.state,
      id: numberOfExpenses,
      exchangeRates: response }));
    this.setState({
      value: 0,
    });
  }

  render() {
    const { coins } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="despesas">
            Valor da despesa
            <input
              name="value"
              type="number"
              data-testid="value-input"
              id="despesas"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriçao">
            Descrição da empresa
            <input
              name="description"
              type="text"
              data-testid="description-input"
              id="descriçao"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {coins.map((coin, index) => (
                <option
                  key={ index }
                  name={ coin }
                  value={ coin }
                >
                  {coin}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento
            <select
              data-testid="method-input"
              id="pagamento"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option name="dinheiro" value="Dinheiro">Dinheiro</option>
              <option name="credito" value="Cartão de crédito">Cartão de crédito</option>
              <option name="debito" value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select
              data-testid="tag-input"
              id="categoria"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option name="alimentaçao" value="Alimentaçao">Alimentação</option>
              <option name="lazer" value="Lazer">Lazer</option>
              <option name="trabalho" value="Trabalho">Trabalho</option>
              <option name="transporte" value="Transporte">Transporte</option>
              <option name="saude" value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.clickHandler }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
  numberOfExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
  numberOfExpenses: state.wallet.expenses.length,
});

export default connect(mapStateToProps)(Wallet);
