import {BrowserRouter,Route, Routes} from "react-router-dom"
import './App.css';
// import Home from "./home";
// import Navbar from "./Navbar";
import Login from "./login";
import Register from './register'
import Testform from "./testform";
import CreateEvent from "./createevent";
import Myevent from "./myevent";
import Allevent from "./allevent";



function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Allevent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/testing" element={<Testform />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
        <Route path="/myEvent" element={<Myevent />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;