import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from "./components/navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ChooseChar from './components/chooseChar';
import Main from './components/Main';
import Workouts from './components/Workouts';
import DailyTasks from "./components/DailyTasks";
import { AuthProvider } from './components/AuthContext';




function App() {
  return (
  <AuthProvider>  
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/classes" element={<ChooseChar />} />
          <Route path="/main" element={<Main />} />
          <Route path="/Workouts" element={<Workouts />} />
          <Route path="/daily-challenges" element={<DailyTasks />} />
        </Routes>
      </div>
    </Router>
  </AuthProvider>  
  );
}

export default App;
