import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // Import Home component
import Login from "./components/Login"; // Import Login component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />  {/* Home Page */}
                <Route path="/login" element={<Login />} />  {/* Login Page */}
            </Routes>
        </Router>
    );
}

export default App;
