"use client";

import { useState } from "react";
import { connectWallet } from "@/lib/web3";
import { useWallet } from "@/lib/walletContext";

export default function RegisterPropertyForm() {
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <div className="rounded-lg border border-white/10 bg-[#16241C] p-6">
      <h2 className="mb-4 text-xl font-semibold text-[#F3EEDD]">
        Register Property
      </h2>

      <p className="text-sm text-[#9CA79B] mb-4">
        Smart contract integration will be added here.
      </p>

      <button
         type="button"
onClick={async () => {
  try {
    setLoading(true);

    const wallet = await connectWallet();

    setWalletAddress(wallet.address);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}}
  disabled={loading}
  className="rounded-md bg-[#C1863E] px-4 py-2 text-[#241505] font-semibold"
>
        {walletAddress ? "Connected" : loading ? "Processing..." : "Connect Wallet"}
      </button>
    </div>
  );
}