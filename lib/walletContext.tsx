"use client";

import { createContext, useContext, useState } from "react";

type WalletContextType = {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used inside WalletProvider");
  }

  return context;
}