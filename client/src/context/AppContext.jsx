import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Base URL setup for Vite
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Create Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // Initialize state directly from localStorage so it's instantly available
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // ✅ Automatically sync axios headers and localStorage whenever the token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Run on load
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Context Value
  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
    fetchBlogs, // ✅ Exported so you can trigger a refresh from any component
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  return useContext(AppContext);
};