import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Base URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Create Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {

  const navigate = useNavigate(); // ✅ correct

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setBlogs(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Run on load
  useEffect(() => {
    fetchBlogs();

    const storedToken = localStorage.getItem("token"); // ✅ renamed
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = storedToken;
    }
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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook
export const useAppContext = () => {
  return useContext(AppContext); // ✅ now works
};