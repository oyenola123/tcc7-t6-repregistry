"use client";

import { useWallet } from "@/lib/walletContext";

export default function WalletConnect() {
  const { walletAddress, setWalletAddress } = useWallet();

  const handleDisconnect = () => {
    setWalletAddress("");
  };

  return (
    <>
      {walletAddress ? (
        <button
          onClick={handleDisconnect}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Disconnect ({walletAddress.slice(0, 6)}...)
        </button>
      ) : (
        <div className="text-gray-400 text-sm">
          Connect using the Register Property section.
        </div>
      )}
    </>
  );
}