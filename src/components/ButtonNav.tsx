import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, BottomNavigation } from '@mui/material';
import { ethers } from 'ethers';
import { Web3Provider, BaseProvider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';


// const { ethereum } = window as unknown as { ethereum: BaseProvider }
declare global {
  interface Window {
    ethereum: any
  }
}

const ButtonNav: React.FC = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [provider, setProvider] = useState<window.ethereum | null>(null);


  useEffect(() => {
    if (provider) {
      setIsWalletConnected(true);
    } else {
      setIsWalletConnected(false);
    }
  }, [provider]);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      // MetaMaskがインストールされている場合
      try {
        // MetaMaskにアクセス許可を求める
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        

        if (window.ethereum) {
          // MetaMaskをプロバイダーとして使用する
          const newProvider = new Web3Provider(window.ethereum);
          setProvider(newProvider);
          console.log("Connected!");

        } else {
          console.error('window.ethereum is undefined');
        }
      } catch (error) {
        console.error('MetaMaskへの接続に失敗しました:', error);
      }
    } else {
      // MetaMaskがインストールされていない場合、WalletConnectを使用する
      const walletConnectProvider = new WalletConnectProvider({
        infuraId: process.env.NEXT_PUBLIC_KEY,
      });
  
      await walletConnectProvider.enable();
      const newProvider = new Web3Provider(walletConnectProvider);
      setProvider(newProvider);
      console.log("Connected!");
    }
  };
  

  return (
    <BottomNavigation 
      sx={{ width: 500 }}
    >
      {isWalletConnected ? (
        <Button variant="contained" size="large">Wallet Connected</Button>
      ) : (
        <Button variant="contained" size="large" onClick={connectWallet}>Connect Wallet</Button>
      )}
    </BottomNavigation>
  );
};

export default ButtonNav;
