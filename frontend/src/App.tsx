import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router>
      <nav>
        <NavButton label="Signup" to="/signup" />
        <NavButton label="Login" to="/login" />
      </nav>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
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
