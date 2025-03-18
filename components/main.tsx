import React, { useState } from 'react'
import { Typography, Card, CardContent, IconButton } from '@mui/material'
import {
  ArrowBack,
  ArrowForward,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material'
import Box from '@mui/material/Box'

const cryptocurrencies = [
  {
    name: 'Ethereum (ETH)',
    price: '$93,200.00',
    lastCheck: '12/31/2024 8:20 p.m.',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026',
  },
  {
    name: 'Bitcoin (BTC)',
    price: '$3,200.00',
    lastCheck: '12/31/2024 8:20 p.m.',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026',
  },
  {
    name: 'Solana (SOL)',
    price: '$200.00',
    lastCheck: '12/31/2024 8:20 p.m.',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=026',
  },
]

export default function Main() {
  const [selected, setSelected] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const handleNext = () =>
    setSelected((prev) => (prev + 1) % cryptocurrencies.length)
  const handlePrev = () =>
    setSelected(
      (prev) => (prev - 1 + cryptocurrencies.length) % cryptocurrencies.length,
    )
  const toggleFavorite = (index: number) => {
    setFavorites((prev) =>
      prev.includes(index)
        ? prev.filter((fav) => fav !== index)
        : [...prev, index],
    )
  }

  return (
    <div>
      <Box component="main" sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
        <Typography variant="h4">Pick favourites</Typography>
        <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
          <IconButton onClick={handlePrev}>
            <ArrowBack />
          </IconButton>
          <Card
            sx={{
              minWidth: 275,
              p: 2,
              textAlign: 'center',
              background: '#333',
              color: '#fff',
            }}
          >
            <CardContent>
              <img
                src={cryptocurrencies[selected].icon}
                alt={cryptocurrencies[selected].name}
                width={50}
                height={50}
              />
              <Typography variant="h6">
                {cryptocurrencies[selected].name}
              </Typography>
              <Typography>
                Current price: {cryptocurrencies[selected].price}
              </Typography>
              <Typography>
                Last check: {cryptocurrencies[selected].lastCheck}
              </Typography>
              <IconButton
                onClick={() => toggleFavorite(selected)}
                color="error"
              >
                {favorites.includes(selected) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </CardContent>
          </Card>
          <IconButton onClick={handleNext}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Box>
    </div>
  )
}
