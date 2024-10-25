import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || null
  );
  const navigate = useNavigate();

  const handleSignup = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  const handleLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userFound = users.find(
      (user) => user.username === username && user.password === password
    );

    if (userFound) {
      localStorage.setItem('loggedInUser', JSON.stringify({ username }));
      setUser({ username });
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signup"} />} />
    </Routes>
  );
}

export default App;
