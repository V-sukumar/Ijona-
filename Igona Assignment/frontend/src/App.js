import logo from './logo.svg';
import './App.css';
import { BrowserRouter ,  Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './Context/AuthContext';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
