import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../types/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../features/auth/services/AuthService";
import { toast } from "react-toastify";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  registerUser: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  loginUser: (username: string, password: string) => Promise<void>;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
};

type Props = {
  children: React.ReactNode;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res) {
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
        };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        toast.success("Te-ai înregistrat cu succes!");
        navigate("/");
      }
    } catch (error) {
      toast.warning("A apărut o eroare!");
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res) {
        const userObj = {
          userName: res.data.userName,
          email: res.data.email,
        };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj));
        toast.success("Te-ai logat cu succes!");
        navigate("/");
      }
    } catch (error) {
      toast.warning("A apărut o eroare!");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Te-ai deconectat cu succes!");
    navigate("/login");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        logoutUser,
        isLoggedIn,
      }}
    >
      {isReady ? children : <div>Loading...</div>}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
