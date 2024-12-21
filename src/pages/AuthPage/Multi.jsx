import axios from "axios";
import { useEffect, useState } from "react";
import CheckEnvironment from "../../Hook/CheckEnvironment/CheckEnvironment";
import { useMutation } from "@tanstack/react-query";
import { loginUserAction, logoutUserAction } from "../../slice/authSlice";
import { useDispatch } from "react-redux";

const Multi = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [activeAccount, setActiveAccount] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { base_url } = CheckEnvironment();

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(`${base_url}/api/login`, {
        email,
        password,
      });
      dispatch(loginUserAction(response.data)); // Update Redux store
      return response.data;
    },
    onSuccess: (data) => {
      alert("Add Account successful!");

      console.log(data);

      const accountExists = accounts.some(
        (acc) => acc?.email === data?.user?.email
      );

      if (!accountExists) {
        // Add the account to the accounts list
        setAccounts((prevAccounts) => [...prevAccounts, data]);
      }

     // Set the new account as active
      setActiveAccount(data);
    },
    onError: (error) => {
      setError(error?.response?.data?.message || "An error occurred");
    },
  });

  //   // Switch account function
  const switchAccount = (email) => {
    const selectedAccount = accounts.find(
      (account) => account?.email === email
    );
    if (selectedAccount) {
      setActiveAccount(selectedAccount);
      dispatch(loginUserAction(selectedAccount)); // Update Redux state
    }
  };

  // Remove account function
  const removeAccount = (email) => {
    const updatedAccounts = accounts.filter(
      (account) => account?.email !== email
    );
    setAccounts(updatedAccounts);

    if (activeAccount?.email === email) {
      setActiveAccount(updatedAccounts[0] || null);
      if (updatedAccounts.length > 0) {
        dispatch(loginUserAction(updatedAccounts[0]));
      } else {
        dispatch(logoutUserAction());
      }
    }
  };

  // Handle form submission
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
    // Load accounts and active account from localStorage on component mount
    const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const storedActiveAccount =
      JSON.parse(localStorage.getItem("activeAccount")) || null;

    if (storedAccounts.length > 0) {
      setAccounts(storedAccounts);
    }

    if (storedActiveAccount) {
      setActiveAccount(storedActiveAccount);
    }
  }, []);

  useEffect(() => {
    // Persist accounts in localStorage only if they exist
    if (accounts.length > 0) {
      localStorage.setItem("accounts", JSON.stringify(accounts));
    } else {
      localStorage.removeItem("accounts");
    }

    if (activeAccount) {
      localStorage.setItem("activeAccount", JSON.stringify(activeAccount));
    } else {
      localStorage.removeItem("activeAccount");
    }
  }, [accounts, activeAccount]);

  return (
    <>
      <div className="flex  flex-col md:flex-row px-2">
        {/* Left Panel */}
        <div className="flex flex-1 items-center justify-center bg-gradient-to-r from-blue-600
         to-purple-600 p-8 rounded-3xl text-white">
          <div className="max-w-md">
            <div className="mb-4">
              {activeAccount ? (
                <h2>
                  Active Account:{" "}
                  <span className=" font-bold">{activeAccount?.email}</span>
                </h2>
              ) : (
                <h2>No Active Account</h2>
              )}
            </div>

            <ul>
              {accounts.map((account) => (
                <li
                  key={account.email}
                  className="flex items-center justify-between py-2 ring-white px-4 ring-2 mb-4
               hover:bg-[#ff7b7b] rounded-lg transition-colors duration-200"
                >
                  <span
                    className={`cursor-pointer ${
                      activeAccount?.email === account.email
                        ? "font-bold text-black"
                        : "text-white"
                    }`}
                    onClick={() => switchAccount(account.email)}
                  >
                    {account.email}
                  </span>
                  <button
                    onClick={() => removeAccount(account.email)}
                    className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-white hover:bg-red-600 rounded border border-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="mb-8 text-2xl font-semibold ">Add your account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm ">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2  placeholder-gray-400 focus:border-[#ff7b7b] focus:outline-none focus:ring-1 focus:ring-[#ff7b7b]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm ">
                  Password
                </label>
                <input
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2  placeholder-gray-400 focus:border-[#ff7b7b] focus:outline-none focus:ring-1 focus:ring-[#ff7b7b]"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <p
                  className="mt-2 text-center text-sm text-red-600"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loginMutation.isLoading}
                className="w-full rounded-full bg-[#ff7b7b] px-4 py-3 text-white transition-colors hover:bg-[#ff6b6b] focus:outline-none focus:ring-2 focus:ring-[#ff7b7b] focus:ring-offset-2"
              >
                {loginMutation.isLoading ? "Adding Account..." : "Add Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Multi;
