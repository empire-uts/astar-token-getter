import React, { useState, useEffect } from 'react';
import { Button, Box, TextField, Typography, BottomNavigation, Link } from '@mui/material';
import { ethers, Provider } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import contractJson from '../ABI/Authentification.json';

declare global {
  interface Window {
    ethereum: any
  }
}

const ButtonNav: React.FC = () => {
  const [provider, setProvider] = useState<any | null>(null);
  const [signer, setSigner] = useState<any | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState(0);
  const [snsId, setSnsId] = useState("");
  const [userName, setUserName] = useState("");
  const [mintStatus, setMintStatus] = useState("Mint NFT!");
  const contractAddress = "0x150C0c9DeCa023aB20b9eCfdaB97cB42165C030c";
  const contractABI = contractJson.output.abi;

  useEffect(() => {
    const newProvider = new Web3Provider(window.ethereum);
    if (provider == newProvider)
      setProvider(newProvider);
  }, []);

  useEffect(() => {
    if (provider) {
      const signer = provider.getSigner();
      setSigner(signer);
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract);
    }
  }, [provider]);

  useEffect(() => {
    fetchBalance();
    fetchData();
  }, [signer, contract]);

  if (contract) {
    contract.on("minted", (owner, tokenId, event) => {
      fetchBalance();
      fetchData();
    });
  };

  const fetchBalance = async () => {
    if (signer && contract) {
      const address = await signer.getAddress();
      const balance = await contract.balanceOf(address);
      setBalance(balance);
    }
  };

  const fetchData = async () => {
    if (balance && contract) {
      const address = await signer.getAddress();
      const userData = await contract.viewUserData(address);
      console.log("currentAccount: ", address, typeof(address), "\ncurrentAccount'sBalance: ", balance, typeof(balance), "\nuserData: ", userData);
      setSnsId(userData[1]);
      setUserName(userData[0]);
    }
  };

  const handleMintNFT = async () => {
    if (signer && contract) {
      const address = await signer.getAddress();
      await contract.safeMint(address, snsId, userName);
      const newBalance = await contract.balanceOf(address);
      setMintStatus("Minting now...");
      setBalance(newBalance);
    }
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const newProvider = new Web3Provider(window.ethereum);
        setProvider(newProvider);
      } catch (error) {
        console.error('Failed to connect with MetaMask:', error);
      }
    } else {
      try {
        const walletConnectProvider = new WalletConnectProvider({
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
        });
        await walletConnectProvider.enable();
        const newProvider = new Web3Provider(walletConnectProvider);
        setProvider(newProvider);
      } catch (error) {
        console.error('Failed to connect with WalletConnect:', error);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" >
      {provider ? (
        <>
          <Button variant="contained" size="large">Wallet Connected</Button>
          {!balance
            ? (
              <>
                <TextField label="SNS ID" value={snsId} onChange={(e) => setSnsId(e.target.value)} />
                <TextField label="User Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <Button onClick={handleMintNFT}>{mintStatus}</Button>
              </>
            ) : (
              <>
                <Typography variant="h4" align="center">Welcome &ldquo;{userName}&rdquo;!</Typography>
                <Link variant="h4" align="center" href={snsId} target="_blank" rel="noopener noreferrer" underline="none">(your Identity)</Link>
                <Typography variant="h5" align="center" gutterBottom>
                  This is an token-price-getter from off chain database made by kii(supported by enmai@devellage.inc).
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                  If you want to try out, click the link below, input date like &quot;2022-12-29 09:50:12&quot; and token address you want to get the price like &quot;0x...&quot;
                </Typography>
                <Button variant="contained" size="large" target="_blank" href="https://70ohfhttgg.execute-api.ap-northeast-1.amazonaws.com/prod/docs">GO to DOCS</Button>
              </>
          )}
        </>
      ) : (
        <Button variant="contained" size="large" onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Box>
  );
};

export default ButtonNav;
