import React from "react";
const axios = require('axios').default;

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePasswordConfirmation =
      this.handleChangePasswordConfirmation.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Set CSRF Cookie
    await axios.get(process.env.REACT_APP_BACKEND_CSRF_TOKEN_URL);

    // Request to backend /login
    axios
      .post(process.env.REACT_APP_BACKEND_REGISTER_URL, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleChangePasswordConfirmation(e) {
    this.setState({
      passwordConfirmation: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChangeName}
          />
        </label>
        <label>
          Indirizzo e-mail:
          <input
            type="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
        </label>
        <label>
          Ripeti password:
          <input
            type="password"
            value={this.state.passwordConfirmation}
            onChange={this.handleChangePasswordConfirmation}
          />
        </label>
        <input type="submit" value="Registrati" />
      </form>
    );
  }
}

export default RegisterForm;
