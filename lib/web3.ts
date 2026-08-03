
import { ethers } from "ethers";

export const connectWallet = async () => {
  console.log("Step 1");

  if (!window.ethereum) throw new Error("MetaMask is not installed");

  console.log("Step 2");

  const provider = new ethers.BrowserProvider(window.ethereum);

  console.log("Step 3");

  await provider.send("eth_requestAccounts", []);

  console.log("Step 4");

  const signer = await provider.getSigner();

  const address = await signer.getAddress();

  console.log("Step 5", address);

  return { provider, signer, address };
};