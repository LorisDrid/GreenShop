// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            <ul>
              <li>
                <NavButton label="Signup" to="/signup" />
              </li>
              <li>
                <NavButton label="Login" to="/login" />
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

interface NavButtonProps {
  label: string;
  to: string;
}

const NavButton: React.FC<NavButtonProps> = ({ label, to }) => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(to)}>{label}</button>;
};

export default App;
