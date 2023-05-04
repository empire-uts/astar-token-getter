import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Box, Typography } from '@mui/material';
import ButtonNav from '../components/ButtonNav';
import APIDocs from '../components/APIDocs';
import * as dotenv from 'dotenv'

const inter = Inter({ subsets: ['latin'] })
 const url = 'https://70ohfhttgg.execute-api.ap-northeast-1.amazonaws.com/prod';


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
        <ButtonNav />
        <Typography variant="h2" align="center" gutterBottom>
          ASTAR TOKEN GETTER
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Pleaze input the date like "2022-12-29 09:50:12" and token-address you will get like "0x..."
        </Typography>
        <Button variant="contained" size="large" target="_blank" href="https://70ohfhttgg.execute-api.ap-northeast-1.amazonaws.com/prod/docs">GO to DOCs</Button>
      </Box>
      </main>
    </>
  )
}
