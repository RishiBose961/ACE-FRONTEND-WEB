/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import InputField from "../../components/TextField/InputField";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loginUserAction } from "../../slice/authSlice";
import { Link, Navigate } from "react-router";
import CheckEnvironment from "../../Hook/CheckEnvironment/CheckEnvironment";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {gapi} from 'gapi-script'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { base_url } = CheckEnvironment();

  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );

  const clientId = import.meta.env.VITE_GOOGLE_PRESET_CLIENT_ID;
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

 
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        password,
      });
      dispatch(loginUserAction(response.data));
      return response.data; // Return response data
    },
    // eslint-disable-next-line no-unused-vars
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

 
    const responseSuccessGoogle = async (res) => {
      const token = res?.credential;
      
      if (!token) {
        console.error("Google authentication token is missing.");
        return;
      }
  
      try {
        const response = await axios.post(`${base_url}/api/google_signing`, {
          credential:token,
        });
        dispatch(loginUserAction(response.data));
        return response.data;
      } catch (error) {
        console.error(
          "Error during Google sign-in:",
          error?.response?.data?.message || error.message || error
        );
      }
    };
  
    const responseErrorGoogle = () => {
      alert("Google authentication failed. Please try again.");
    };
  

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-800/50 p-8 backdrop-blur-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Login</h2>
            <p className="mt-2 text-sm text-gray-400">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
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
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-between">
              <Link
                to="/register"
                className="text-sm text-blue-500 hover:text-blue-700"
              >
                Don’t have an account? Join
              </Link>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-700">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              {loginMutation.isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_GOOGLE_PRESET_CLIENT_ID}
          >
            <GoogleLogin
              //  responseSuccessGoogle
              className="w-full"
              onSuccess={responseSuccessGoogle}
              onError={responseErrorGoogle}
              useOneTap
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  );
}
