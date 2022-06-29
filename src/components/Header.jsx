import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  // state = {
  //   totalSum: 0,
  // }

  calculateExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const sum = +(value) * +(exchangeRates[currency].ask) + acc;
      return sum;
    }, 0);
    return total;
  //   return this.setState((prevState) => ({
  //     totalSum: prevState.totalSum + total,
  //   }));
  }

  render() {
    const { email } = this.props;
    // const { totalSum } = this.state;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{this.calculateExpenses().toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
        {/* <button type="button" onClick={ this.calculateExpenses }>Calculate</button> */}
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
