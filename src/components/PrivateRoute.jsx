import { Navigate, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "../slice/authSlice";
import {jwtDecode} from "jwt-decode";  // Ensure this is imported correctly

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Function to check if the token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;

    const decoded = jwtDecode(token);
    const expirationTime = decoded.exp * 1000; // Convert to milliseconds

    return expirationTime < Date.now();
  };

  // Token and authentication check
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
    const token = parsedUserInfo?.token;

    if (token && isTokenExpired(token)) {
      // Token is expired, clear user info and redirect to login
      localStorage.removeItem("userInfo");
      dispatch(loadUser());  // Optionally clear the user state
    } else {
      // Load user only if the token is valid
      dispatch(loadUser());
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
