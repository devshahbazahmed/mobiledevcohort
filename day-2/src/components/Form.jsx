import { useState } from 'react';
import './form.css';

const Form = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Email: ', email);
    console.log('Username: ', username);
    console.log('Password: ', password);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup Form</h1>
      <input
        type="email"
        placeholder="Enter email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
