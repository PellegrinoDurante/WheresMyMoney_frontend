import React from "react";
const axios = require("axios").default;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Set CSRF Cookie
    await axios.get("http://wmmbe.test.local/sanctum/csrf-cookie");

    // Request to backend /login
    axios
      .post("http://wmmbe.test.local/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <input type="submit" value="Accedi" />
      </form>
    );
  }
}

export default LoginForm;
