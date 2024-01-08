import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/SignUp";
import Dashboard from "./components/layouts/Dashboard";
import AddAgentForm from "./pages/admin/repo-agent/AddAgentForm";

const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard > <AddAgentForm /></Dashboard>} />
        {/* <Route path="/add-repo-agent" element={<AddAgentForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
