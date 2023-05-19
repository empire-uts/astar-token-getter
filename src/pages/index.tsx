import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Box, Typography } from '@mui/material';
import ButtonNav from '../components/ButtonNav';
import * as dotenv from 'dotenv'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          ASTAR TOKEN GETTER
        </Typography>
        <ButtonNav />
      </Box>
      </main>
    </>
  )
}
