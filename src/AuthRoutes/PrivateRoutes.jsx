/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const PrivateRoutes = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL + "api/auth/verify";
  const token = localStorage.getItem("walletToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIsAuthenticated = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("walletToken");
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkIsAuthenticated();
  }, [navigate, token, url]);

  if (loading) {
    return <Loader />;
  }

  return isAuthenticated ? children : navigate("/login");
};

export default PrivateRoutes;
