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
      alert("Login successful!");

      console.log(data);
      


      const accountExists = accounts.some(
        (acc) => acc?.email === data?.user?.email
      );

      if (!accountExists) {
        // Add the account to the accounts list
        setAccounts((prevAccounts) => [...prevAccounts, data]);
      }

    //   // Set the new account as active
      setActiveAccount(data);
    },
    onError: (error) => {
      setError(error?.response?.data?.message || "An error occurred");
    },
  });

//   // Switch account function
  const switchAccount = (email) => {
    const selectedAccount = accounts.find((account) => account?.email === email);
    if (selectedAccount) {
      setActiveAccount(selectedAccount);
      dispatch(loginUserAction(selectedAccount)); // Update Redux state
    }
  };

  // Remove account function
  const removeAccount = (email) => {
    const updatedAccounts = accounts.filter((account) => account?.email !== email);
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
    const storedActiveAccount = JSON.parse(localStorage.getItem("activeAccount")) || null;
  
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
    <div>
      <h1>Multi-Account Manager</h1>
      {activeAccount ? (
        <h2>Active Account: {activeAccount?.email}</h2>
      ) : (
        <h2>No Active Account</h2>
      )}

      <ul>
        {accounts.map((account) => (
          <li key={account?.email}>
            <span
              style={{
                fontWeight:
                  activeAccount?.email === account?.email ? "bold" : "normal",
                cursor: "pointer",
              }}
              onClick={() => switchAccount(account?.email)}
            >
              {account?.email}
            </span>
            <button
              onClick={() => removeAccount(account?.email)}
              style={{ marginLeft: "10px" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Multi;
