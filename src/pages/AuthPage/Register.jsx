import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import InputField from "../../components/TextField/InputField";
import CheckEnvironment from "../../Hook/CheckEnvironment/CheckEnvironment";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { base_url } = CheckEnvironment();


  let navigate = useNavigate();
  const registerMutation = useMutation({
    mutationFn: async ({name, email, password }) => {
      const response = await axios.post(`${base_url}/api/register`, {
        name,
        email,
        password,
      });
      return response.data; // Return response data
    },
    // eslint-disable-next-line no-unused-vars
    onSuccess: (data) => {
      alert("Register successful!");
      navigate('/login')

      // console.log("Login success:", data);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Trigger the mutation
    registerMutation.mutate({name, email, password });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <InputField
              nameTitle="Name"
              placeHolder="Enter Name"
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="flex justify-center">
            <Link
              to="/login"
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Already have an account? Login
            </Link>
         
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <div>
              <button
                type="submit"
                disabled={registerMutation.isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {registerMutation.isLoading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
