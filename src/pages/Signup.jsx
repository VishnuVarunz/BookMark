import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(username, password);
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="container">
      <h2 className='text-primary'>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
      <p>Have An Account?
      <a className=" text-blue-500 hover:text-blue-700 text-bold ml-2 " onClick={handleLoginClick}>
        Login Here
      </a>
      </p>
    </div>
  );
}

export default Signup;
