import RegisterPage from "./components/registerPage/Register";
import LoginPage from "./components/loginPage/Login";
import HomePage from "./components/homePage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/:email" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
