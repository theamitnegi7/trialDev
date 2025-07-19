import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./header";
import About from "./about";
import Info from "./info";
import Login from "./login";

function App() {
  return (
    <>
    <Router>
      <Header />
      <Routes>
         <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/about" element={<About />} /> 
          <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
