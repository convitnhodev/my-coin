// authContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { Wallet } from "../types/wallet";

interface AuthContextProps {
  getWalletAddress: () => string | null;
  isAuthenticated: () => boolean;
  signIn: (wallet: Wallet | null) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getWalletAddress = (): string | null => {
    const walletData = localStorage.getItem("walletAddress");
    console.log("walletData", walletData);
    if (walletData) {
      return walletData;
    }
    return null;
  };

  const isAuthenticated = (): boolean => {
    const walletData = localStorage.getItem("walletAddress");
    if (walletData) {
      return true;
    }
    return false;
  };

  const signIn = (newWallet: Wallet | null) => {
    if (newWallet) {
      localStorage.setItem("walletAddress", newWallet.address);
    } else {
      localStorage.removeItem("walletAddress");
    }
  };

  const signOut = () => {
    localStorage.removeItem("walletAddress");
  };

  return (
    <AuthContext.Provider
      value={{ getWalletAddress, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
