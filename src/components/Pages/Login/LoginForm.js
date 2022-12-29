import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordResetForm from './PasswordResetForm';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [email, setEmail] = useState('username@example.com');
  const [password, setPassword] = useState('passwd');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api.reykez.pl/api/security/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Błąd logowania');
      }
      const { token } = await response.json();
      Cookies.set('token', token);
      navigate('/sort');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-[85vh]">
      {showPasswordReset ? (
        <PasswordResetForm setShowPasswordReset={setShowPasswordReset} />
      ) : (
        <form className="md:absolute  bg-gray-700 rounded-lg p-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <label>
            <input className="mt-4 w-full max-w-[50vw] rounded focus:border-gray-600" placeholder=" Nick or Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <br />
          <label>
            <input className="mt-4 w-full max-w-[50vw] rounded" autocomplete="current-password" placeholder=" Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <br />
          <button className="mt-4 p-2 bg-red-700 w-full max-w-[50vw] text-white rounded-lg" type="submit">
            Log in
          </button>
          <div className="flex justify-between w-full">
            <div className="text-gray-400 mr-8" onClick={() => setShowPasswordReset(true)}>
              Forget password?
            </div>
            <a className="text-white" href="tutaj damy coś do rejestrtacji">
              Register
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
