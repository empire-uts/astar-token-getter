import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
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
  const [provider, setProvider] = useState<Web3Provider | null>(null);


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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <Typography>
        {isWalletConnected ? 'Wallet Connected!!' : 'Connect Wallet!'}
      </Typography>
      {isWalletConnected ? (
        <Button>Wallet Connected</Button>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Box>
  );
};

export default ButtonNav;
