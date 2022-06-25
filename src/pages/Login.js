import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import saveEmail from '../actions';

class Login extends React.Component {
  state={
    email: '',
    password: '',
    minPasswordLength: 6,
    isDisabled: true,
  }

  verifyBtn = () => {
    const { email, password, minPasswordLength } = this.state;
    if (email.includes('@email.com') && password.length >= minPasswordLength) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    }, this.verifyBtn);
  }

  clickHandler = () => {
    const { dispatchEmail, history } = this.props;
    const { email } = this.state;
    dispatchEmail(email);
    history.push('/carteira');
  }

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            data-testid="email-input"
            id="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            id="password"
            data-testid="password-input"
            minLength="6"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.clickHandler }
        >
          Entrar

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  dispatchEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

// desafios: email estava sendo passado como prop inves de state e propType
// do history estava quebrando o código
