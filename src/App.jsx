import { useEffect } from "react";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/Signin";
import Signup from "./pages/auth/SignUp";
import Dashboard from "./components/layouts/Dashboard";
import AddAgentForm from "./pages/admin/repo-agent/add";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/Home/dashboard";
import RepoAgentList from "./pages/admin/repo-agent/all";

const App = () => {
  const auth = localStorage.getItem("token");

  const { message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    } else if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Signup />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={!auth} redirect="/dashboard">
              <SignIn />
            </ProtectedRoute>
          }
        />

        <Route
          path="/repo-agent/add"
          element={
            <ProtectedRoute isAuthenticated={!!auth} redirect="/login">
              <Dashboard>
                <AddAgentForm />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/repo-agent/all"
          element={
            <ProtectedRoute isAuthenticated={!!auth} redirect="/login">
              <Dashboard>
                <RepoAgentList />
              </Dashboard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={!!auth} redirect="/login">
              <Dashboard>
                <AdminDashboard />
              </Dashboard>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
