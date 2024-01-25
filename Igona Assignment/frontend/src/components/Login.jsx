import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const {user} =useAuth()
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin =  () => {

      if (user.email===credentials.email && user.password ===credentials.password) {
        alert("login successful")
        window.location.href="/dashboard"
        login(credentials);
      }

       
 
  };
  console.log(user);

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
        email:
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
