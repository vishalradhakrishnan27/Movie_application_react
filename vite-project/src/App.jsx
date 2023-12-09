import { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Components/Login';
import Registration from './Components/Registration';
import ChangePassword from './Components/ChangePassword';
import Dashboard from './Dashboard'; 
import Dashboard2 from './Dashboard2'; 
import Dashboard3 from './Dashboard3';
import Dashboard4 from './Dashboard4';
import AboutUs from './AboutUs';
import Navbar from './Navbar';
import Unauthorized from './unauthorized';
import HistoryPage from './HistoryPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path="/"
            element={<Home isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/Dashboard" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route
            path="/registration"
            element={
              isAuthenticated ? (
                <Navigate to="/Dashboard" />
              ) : (
                <Registration setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
         
          
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Dashboard2" element={<Dashboard2 />} />
          <Route path="/Dashboard3" element={<Dashboard3 />} />
          <Route path="/Dashboard4" element={<Dashboard4 />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />
          <Route path="/HistoryPage" element={<HistoryPage />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;