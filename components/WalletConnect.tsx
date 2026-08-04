

"use client";

import { connectWallet } from "@/lib/web3";
import { useWallet } from "@/lib/walletContext";

export default function WalletConnect() {
  const { walletAddress, setWalletAddress } = useWallet();

  const handleConnect = async () => {
    try {
      const wallet = await connectWallet();
      if (wallet.address) {
        setWalletAddress(wallet.address);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnect = () => {
    setWalletAddress("");
  };

  return (
    <>
      {walletAddress ? (
        <button
          onClick={handleDisconnect}
          className="rounded-md bg-red-600 px-4 py-2 text-white"
        >
          Disconnect ({walletAddress.slice(0, 6)}...)
        </button>
      ) : (
        <button
          onClick={handleConnect}
          className="rounded-md bg-[#C1863E] px-4 py-2 font-semibold text-[#241505]"
        >
          Connect Wallet
        </button>
      )}
    </>
  );
}