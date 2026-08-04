# Real Estate Property Registry

A decentralized application (DApp) built on the Ethereum Sepolia Testnet for secure property registration, ownership verification, and ownership transfer. The project leverages blockchain technology to provide transparency, immutability, and trust in real estate record management.

---

## Project Overview

The Real Estate Property Registry enables users to securely register properties on the blockchain, verify ownership records, and transfer property ownership without relying on a centralized authority. By utilizing Ethereum smart contracts, the system ensures that property records are transparent, tamper-resistant, and permanently stored on-chain.

---

## Features

- Connect wallet using MetaMask
- Register new properties
- View registered properties
- Verify property ownership
- Transfer property ownership
- Secure blockchain transactions
- Immutable ownership history
- Responsive web interface

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Ethers.js

### Blockchain
- Solidity
- Foundry
- OpenZeppelin Contracts
- Ethereum Sepolia Testnet

### Deployment
- Vercel

---

## Project Architecture

```
Frontend (Next.js)
        │
        ▼
 MetaMask Wallet
        │
        ▼
PropertyRegistry Smart Contract
        │
        ▼
Ethereum Sepolia Test Network
```


Transaction Flow

          Frontend

‎      │

‎      ▼

‎Connect Wallet (MetaMask)

‎      │

‎      ▼

‎PropertyRegistry Smart Contract (SOURCE OF TRUTH)

‎      │

‎      ├── Registers property

‎      ├── Verifies ownership

‎      ├── Transfers ownership

‎      └── Emits blockchain events

‎      │

‎      ▼

‎Backend API (Prisma/PostgreSQL)

‎      │

‎      ├── Stores owner profile

‎      ├── Stores property images

‎      ├── Stores documents

‎      ├── Stores metadata

‎      └── Caches application data

## Smart Contract

**Network:** Ethereum Sepolia Testnet

**Contract Address**

```
0x82170E307157812954F3D80D2B7Ce5A0052949c2
```

---

## Live Demo

**Vercel Deployment**

https://tcc7-t6-repregistry.vercel.app

---

## GitHub Repository

https://github.com/oyenola123/tcc7-t6-repregistry

---

## Installation

Clone the repository

```bash
git clone https://github.com/oyenola123/tcc7-t6-repregistry.git
```

Navigate into the project

```bash
cd tcc7-t6-repregistry
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## Environment Variables

Created a `.env.local` file and configure:

```env
NEXT_PUBLIC_PROPERTY_REGISTRY_ADDRESS=_DEPLOYED_CONTRACT_ADDRESS
DATABASE_URL=YOUR_DATABASE_URL
```

---

## How to Use

1. Open the application.
2. Connect your MetaMask wallet.
3. Register a new property.
4. View registered properties.
5. Verify property ownership.
6. Transfer ownership securely through blockchain transactions.

---

## Team

### Team Lead

**Lawal Oyenola R.**

### Team Members

**TechCrush Web3 Cohort 7 – Team 6**

---

## Future Improvements

- IPFS integration for property documents
- Property image uploads
- Property search and filtering
- Transaction history dashboard
- Multi-wallet support
- Role-based access control
- Improved user experience
- QR code verification
- Admin dashboard with analytics.
- NFT certificates representing property ownership.

‎

## License

This project was developed as a Capstone Project for the **TechCrush Web3 Cohort 7** Blockchain Development Program.

MIT License.