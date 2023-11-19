import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import './App.css';

import Home from "./pages/Home/Home.js";
import Detect from "./pages/Detect/Detect.js";
import Contribute from "./pages/Contribute/Contribute.js";
import Admin from "./pages/Admin/Admin.js";
import SignIn from "./pages/SignIn/SignIn.js";

import Navbar from "./components/Navbar/Navbar.js";

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              } 
            />
            <Route 
              path="/detect" 
              element={
                <>
                  <Navbar />
                  <Detect />
                </>
              }
            />
            <Route 
              path="/contribute" 
              element={
                <>
                  <Navbar />
                  <Contribute />
                </>
              }
            />
            <Route 
              path="/admin" 
              element={
                <>
                  <Navbar />
                  <Admin />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={<SignIn />}
            />
          </Routes>
        </Router>
      </>
  );
}

export default App;