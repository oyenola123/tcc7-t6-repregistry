"use client";

import { useState } from "react";
import { connectWallet } from "@/lib/web3";
import { useWallet } from "@/lib/walletContext";
import { getPropertyRegistryContract } from "@/lib/contract";

export default function RegisterPropertyForm() {
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState("");
const [title, setTitle] = useState("");
const [propertyType, setPropertyType] = useState("");
const [location, setLocation] = useState("");
const [size, setSize] = useState("");
const [metadataHash, setMetadataHash] = useState("");
  const { walletAddress, setWalletAddress } = useWallet();
  const handleRegister = async () => {
  try {
    setLoading(true);

    const contract = await getPropertyRegistryContract();

  const tx = await contract.registerProperty(
  propertyId,
  title,
  location,
  Number(size),
  0,
  metadataHash
);

    console.log("Transaction:", tx.hash);

    await tx.wait();

    alert("Property registered successfully!");
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="rounded-lg border border-white/10 bg-[#16241C] p-6">
      <h2 className="mb-4 text-xl font-semibold text-[#F3EEDD]">
        Register Property
      </h2>

      <div className="space-y-4 mb-6">
  <input
    type="text"
    placeholder="Property ID"
    value={propertyId}
    onChange={(e) => setPropertyId(e.target.value)}
    className="w-full rounded-md border border-gray-600 bg-[#0F1813] p-2 text-white"
  />

  <input
    type="text"
    placeholder="Property Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full rounded-md border border-gray-600 bg-[#0F1813] p-2 text-white"
  />

  <input
    type="text"
    placeholder="Property Type"
    value={propertyType}
    onChange={(e) => setPropertyType(e.target.value)}
    className="w-full rounded-md border border-gray-600 bg-[#0F1813] p-2 text-white"
  />

  <input
    type="text"
    placeholder="Location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="w-full rounded-md border border-gray-600 bg-[#0F1813] p-2 text-white"
  />

  <input
    type="text"
    placeholder="Size"
    value={size}
    onChange={(e) => setSize(e.target.value)}
    className="w-full rounded-md border border-gray-600 bg-[#0F1813] p-2 text-white"
  />

  <input
    type="text"
    placeholder="Metadata Hash"
    value={metadataHash}
    onChange={(e) => setMetadataHash(e.target.value)}
    className="w-full rounded-md border border-gray-600 bg-[#0F1813] p-2 text-white"
  />
</div>

      <button
        type="button"
        onClick={handleRegister}
        disabled={loading}
        className="rounded-md bg-[#C1863E] px-4 py-2 font-semibold text-[#241505]"
      >
        {!walletAddress && (
  <>
    {loading ? "Processing..." : "Connect Wallet"}
  </>
)}
      </button>
    </div>
  );
}