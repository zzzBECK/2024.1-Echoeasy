import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { UserService } from "../service/UserService";

interface User {
  name: string;
  lastname: string;
  email: string;
  cellphone: string;
  role: string;
  firebaseId: string;
}

interface GlobalContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const initialize = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        setIsLogged(true);
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
    } catch (error) {
      console.error('Error removing token from AsyncStorage:', error);
    } finally {
      setToken(null);
      setIsLogged(false);
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {

      try {
        const userService = new UserService();
        const response = await userService.getMe();
        setUser(response.data);
        setIsLogged(true);
      } catch (error) {
        console.error('Error fetching user:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <GlobalContext.Provider value={{ token, setToken, isLogged, setIsLogged, user, setUser, loading, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
