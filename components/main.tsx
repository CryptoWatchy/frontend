'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { toggleFavorite } from '@/store/favoritesSlice'
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  Button,
} from '@mui/material'
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

export default function Main({ tab }: { tab: string }) {
  const favorites = useSelector((state: RootState) => state.favorites.favorites)
  const dispatch = useDispatch()

  // Filter cryptocurrencies based on favorites when in "My Cryptocurrencies"
  const favoriteCryptos = cryptocurrencies.filter((_, index) =>
    favorites.includes(index),
  )
  const currentList =
    tab === 'my-cryptocurrencies' ? favoriteCryptos : cryptocurrencies

  const [selected, setSelected] = useState(0)

  // Reset selected index when tab changes
  useEffect(() => {
    setSelected(0)
  }, [tab])

  // Handle selection within the current list safely
  const handleNext = () =>
    setSelected((prev) => (prev + 1) % currentList.length)
  const handlePrev = () =>
    setSelected((prev) => (prev - 1 + currentList.length) % currentList.length)

  // If "My Cryptocurrencies" is selected and there are no favorites, show message
  if (tab === 'my-cryptocurrencies' && favoriteCryptos.length === 0) {
    return (
      <Typography sx={{ mt: 'calc(35vh)', textAlign: 'center' }} variant="h6">
        Currently, you have no favorite cryptocurrencies.
      </Typography>
    )
  }

  // Ensure we don't access undefined index
  if (!currentList[selected]) {
    return null
  }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      <Typography variant="h4">
        {tab === 'pick-favourites' ? 'Pick favourites' : 'My cryptocurrencies'}
      </Typography>

      {/* Display Card */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Card
          sx={{
            minWidth: 275,
            minHeight: 300,
            p: 2,
            textAlign: 'center',
            background: '#333',
            color: '#fff',
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={100}
            >
              <img
                src={currentList[selected].icon}
                alt={currentList[selected].name}
                width={50}
                height={50}
              />
            </Box>
            <Typography variant="h6">{currentList[selected].name}</Typography>
            <Typography>
              Current price: {currentList[selected].price}
            </Typography>

            {tab === 'pick-favourites' ? (
              <IconButton
                onClick={() =>
                  dispatch(
                    toggleFavorite(
                      cryptocurrencies.indexOf(currentList[selected]),
                    ),
                  )
                }
                color="error"
              >
                {favorites.includes(
                  cryptocurrencies.indexOf(currentList[selected]),
                ) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            ) : (
              <>
                <Typography>
                  Value in USD:{' '}
                  {parseFloat(currentList[selected].price.replace('$', '')) *
                    10}
                </Typography>
                <TextField label="Amount" fullWidth margin="dense" />
                <TextField label="Unit" fullWidth margin="dense" />
                <TextField label="Comment" fullWidth margin="dense" />
                <Button variant="contained" color="success">
                  Submit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Navigation buttons */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <IconButton onClick={handlePrev} disabled={currentList.length <= 1}>
          <ArrowBack sx={{ color: '#fff' }} />
        </IconButton>
        <IconButton onClick={handleNext} disabled={currentList.length <= 1}>
          <ArrowForward sx={{ color: '#fff' }} />
        </IconButton>
      </Box>
    </Box>
  )
}
