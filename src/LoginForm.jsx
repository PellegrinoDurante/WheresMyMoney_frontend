import React, {useState} from "react";
import { useUser } from "./authentication";
const axios = require("axios").default;

export default function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useUser();

  async function handleSubmit(e) {
    e.preventDefault();

    // Set CSRF Cookie
    await axios.get(process.env.REACT_APP_BACKEND_CSRF_TOKEN_URL);

    // Request to backend /login
    axios
      .post(process.env.REACT_APP_BACKEND_LOGIN_URL, {
        email: email,
        password: password,
      })
      .then((response) => {
        setUser(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <label className="flex flex-col p-4">
        <span className="text-white">Indirizzo e-mail:</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="flex flex-col p-4">
        <span className="text-white">Password:</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Accedi" className="bg-yellow-500 p-2 w-32"/>
    </form>
  );
}