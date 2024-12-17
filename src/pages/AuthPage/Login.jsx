/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import InputField from "../../components/TextField/InputField";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUserAction } from "../../slice/authSlice";
import { Link, Navigate, Outlet } from "react-router";
import CheckEnvironment from "../../Hook/CheckEnvironment/CheckEnvironment";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { base_url } = CheckEnvironment();


  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        password,
      });
      dispatch(loginUserAction(response.data));
      return response.data; // Return response data
    },
    onSuccess: (data) => {
      alert("Login successful!");

      // console.log("Login success:", data);
    },
    onError: (error) => {
      setError(error.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Trigger the mutation
    loginMutation.mutate({ email, password });
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  if (isAuthenticated) {
    return isAuthenticated ? (
      <Navigate to={`/${user.username}`} replace />
    ) : (
      <Navigate to="/login" replace />
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <p className="text-center  mb-8">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <InputField
              nameTitle="Email"
              placeHolder="Enter Email"
              type={"text"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <InputField
              nameTitle="Password"
              type={"password"}
              placeHolder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <Link to='/register' className="text-sm text-blue-500 hover:text-blue-700">
              Don’t have an account? Join
            </Link>
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <div>
              <button
                type="submit"
                disabled={loginMutation.isPending }
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loginMutation.isPending  ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
