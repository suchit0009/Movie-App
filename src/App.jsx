import "./css/App.css";
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import { Routes,Route  } from 'react-router-dom';
import NavBar from './components/NavBar';
import { MovieProvider } from "./context/movieContext";

 function App() {
  return (
    <MovieProvider>
    <NavBar />
 <main className="app">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/favorite" element={<Favorite />} />
  </Routes>
  </main>
  </MovieProvider>
  );
 }


export default App
