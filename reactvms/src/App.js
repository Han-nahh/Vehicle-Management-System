import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
  <BrowserRouter>
  <Routes>
  <Route path='/' exact Component={Home} />
  </Routes>
  </BrowserRouter>
  
    </div>
  );
}

export default App;
