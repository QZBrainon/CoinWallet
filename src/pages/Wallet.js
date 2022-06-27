import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getCoins } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCoins());
  }

  render() {
    const { coins } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="despesas">
            Valor da despesa
            <input
              name="despesas"
              type="text"
              data-testid="value-input"
              id="despesas"
            />
          </label>
          <label htmlFor="descriçao">
            Descrição da empresa
            <input
              name="descriçao"
              type="text"
              data-testid="description-input"
              id="descriçao"
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda">
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
            <select data-testid="method-input" id="pagamento">
              <option name="dinheiro" value="dinheiro">Dinheiro</option>
              <option name="credito" value="credito">Cartão de crédito</option>
              <option name="debito" value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria
            <select data-testid="tag-input" id="categoria">
              <option name="alimentaçao" value="alimentaçao">Alimentação</option>
              <option name="lazer" value="lazer">Lazer</option>
              <option name="trabalho" value="trabalho">Trabalho</option>
              <option name="transporte" value="transporte">Transporte</option>
              <option name="saude" value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
  coins: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  coins: state.wallet.currencies,
});

export default connect(mapStateToProps)(Wallet);
