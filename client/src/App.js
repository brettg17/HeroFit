import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Navbar from "./components/navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
