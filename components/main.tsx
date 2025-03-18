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
  const handleNext = () => {
    if (selected < currentList.length - 1) {
      setSelected((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (selected > 0) {
      setSelected((prev) => prev - 1)
    }
  }

  // Ensure that after unfavoriting the last item, selected is updated accordingly
  useEffect(() => {
    if (tab === 'my-cryptocurrencies' && favoriteCryptos.length > 0) {
      // If there are no favorites left, reset selected index to 0
      if (selected >= favoriteCryptos.length) {
        setSelected(favoriteCryptos.length - 1)
      }
    }
  }, [favorites, tab, selected, favoriteCryptos.length])

  if (tab === 'my-cryptocurrencies' && favoriteCryptos.length === 0) {
    return (
      <Typography sx={{ mt: 'calc(35vh)', textAlign: 'center' }} variant="h6">
        Currently, you have no favorite cryptocurrencies.
      </Typography>
    )
  }

  if (!currentList[selected]) return null

  const prevIndex = selected > 0 ? selected - 1 : null
  const nextIndex = selected < currentList.length - 1 ? selected + 1 : null

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, textAlign: 'center', mt: 15 }}
    >
      <Typography sx={{ color: '#fff' }} variant="h4">
        {tab === 'pick-favourites' ? 'Pick favourites' : 'My cryptocurrencies'}
      </Typography>

      {/* Carousel */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={3}
        sx={{ gap: 2, position: 'relative' }}
      >
        {/* Left card */}
        {prevIndex !== null && (
          <Card
            sx={{
              minWidth: 250,
              minHeight: 250,
              p: 2,
              textAlign: 'center',
              background: '#454344',
              color: '#ccc',
              // opacity: 0.5,
              transform: 'scale(0.9)',
              position: 'absolute',
              left: tab === 'my-cryptocurrencies' ? 150 : 370,
              zIndex: 1,
              border: 1,
              borderColor: '#3f3d3e',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={currentList[prevIndex].icon}
                  alt={currentList[prevIndex].name}
                  width={50}
                  height={50}
                />
              </Box>

              <Typography sx={{ mt: 2 }} variant="h6">
                {currentList[prevIndex].name}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: '13px', color: '#ccc' }}>
                Current price: {currentList[prevIndex].price}
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#ccc' }}>
                Last check: {currentList[prevIndex].lastCheck}
              </Typography>

              <IconButton
                color="error"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                }}
              >
                {favorites.includes(
                  cryptocurrencies.indexOf(currentList[prevIndex]),
                ) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>

              {tab === 'my-cryptocurrencies' ? (
                <div className="">
                  <div className="w-[350px] h-[360px] flex flex-col mb-[-40px] px-7">
                    <Typography>
                      Value in USD:{' '}
                      {parseFloat(
                        currentList[prevIndex].price.replace('$', ''),
                      ) * 10}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>Amount:</Typography>
                    <TextField
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiOutlinedInput-root': {
                          height: '100%',
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#979695',
                          },
                          '&:hover fieldset': {
                            borderColor: '#979695',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#979695',
                          },
                        },
                        '& .MuiInputBase-input': {
                          height: '100%',
                          padding: '12px',
                        },
                      }}
                      fullWidth
                      margin="dense"
                      disabled
                    />

                    <Typography>Unit:</Typography>
                    <TextField
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiOutlinedInput-root': {
                          height: '100%',
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#979695',
                          },
                          '&:hover fieldset': {
                            borderColor: '#979695',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#979695',
                          },
                        },
                        '& .MuiInputBase-input': {
                          height: '100%',
                          padding: '12px',
                        },
                      }}
                      fullWidth
                      margin="dense"
                      disabled
                    />

                    <Typography>Comment:</Typography>
                    <TextField
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiOutlinedInput-root': {
                          height: '100%',
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#979695',
                          },
                          '&:hover fieldset': {
                            borderColor: '#979695',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#979695',
                          },
                        },
                        '& .MuiInputBase-input': {
                          height: '100%',
                          padding: '12px',
                        },
                      }}
                      fullWidth
                      margin="dense"
                      disabled
                    />
                  </div>
                  <div className="flex justify-end mb-6">
                    <Button variant="contained" color="success" disabled>
                      Submit
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}

        {/* Main Card (Active) */}
        <Card
          sx={{
            minWidth: 250,
            minHeight: 250,
            p: 2,
            textAlign: 'center',
            background: '#322e2d',
            color: '#fff',
            position: 'relative',
            zIndex: 2,
            border: 1,
            borderColor: '#000',
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                src={currentList[selected].icon}
                alt={currentList[selected].name}
                width={50}
                height={50}
              />
            </Box>

            <Typography sx={{ mt: 2 }} variant="h6">
              {currentList[selected].name}
            </Typography>
            <Typography sx={{ mt: 2, fontSize: '13px', color: '#ccc' }}>
              Current price: {currentList[selected].price}
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#ccc' }}>
              Last check: {currentList[selected].lastCheck}
            </Typography>

            <IconButton
              onClick={() =>
                dispatch(
                  toggleFavorite(
                    cryptocurrencies.indexOf(currentList[selected]),
                  ),
                )
              }
              color="error"
              sx={{
                position: 'absolute',
                bottom: 10,
                right: 10,
              }}
            >
              {favorites.includes(
                cryptocurrencies.indexOf(currentList[selected]),
              ) ? (
                <Favorite />
              ) : (
                <FavoriteBorder />
              )}
            </IconButton>

            {tab === 'my-cryptocurrencies' ? (
              <div className="">
                <div className="w-[350px] h-[360px] flex flex-col mb-[-40px] px-7">
                  <Typography>
                    Value in USD:{' '}
                    {parseFloat(currentList[selected].price.replace('$', '')) *
                      10}
                  </Typography>

                  <Typography sx={{ mt: 2 }}>Amount:</Typography>
                  <TextField
                    sx={{
                      backgroundColor: '#545454',
                      borderRadius: '10px',
                      height: '40px',
                      '& .MuiOutlinedInput-root': {
                        height: '100%',
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: '#979695',
                        },
                        '&:hover fieldset': {
                          borderColor: '#979695',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#979695',
                        },
                      },
                      '& .MuiInputBase-input': {
                        height: '100%',
                        padding: '12px',
                      },
                    }}
                    fullWidth
                    margin="dense"
                  />

                  <Typography>Unit:</Typography>
                  <TextField
                    sx={{
                      backgroundColor: '#545454',
                      borderRadius: '10px',
                      height: '40px',
                      '& .MuiOutlinedInput-root': {
                        height: '100%',
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: '#979695',
                        },
                        '&:hover fieldset': {
                          borderColor: '#979695',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#979695',
                        },
                      },
                      '& .MuiInputBase-input': {
                        height: '100%',
                        padding: '12px',
                      },
                    }}
                    fullWidth
                    margin="dense"
                  />

                  <Typography>Comment:</Typography>
                  <TextField
                    sx={{
                      backgroundColor: '#545454',
                      borderRadius: '10px',
                      height: '40px',
                      '& .MuiOutlinedInput-root': {
                        height: '100%',
                        borderRadius: '10px',
                        '& fieldset': {
                          borderColor: '#979695',
                        },
                        '&:hover fieldset': {
                          borderColor: '#979695',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#979695',
                        },
                      },
                      '& .MuiInputBase-input': {
                        height: '100%',
                        padding: '12px',
                      },
                    }}
                    fullWidth
                    margin="dense"
                  />
                </div>
                <div className="flex justify-end mb-6">
                  <Button variant="contained" color="success">
                    Submit
                  </Button>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Right card */}
        {nextIndex !== null && (
          <Card
            sx={{
              minWidth: 250,
              minHeight: 250,
              p: 2,
              textAlign: 'center',
              background: '#454344',
              color: '#ccc',
              // opacity: 0.5,
              transform: 'scale(0.9)',
              position: 'absolute', // Position it to the right
              right: tab === 'my-cryptocurrencies' ? 150 : 370,
              border: 1,
              zIndex: 1,
              borderColor: '#3f3d3e',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  src={currentList[nextIndex].icon}
                  alt={currentList[nextIndex].name}
                  width={50}
                  height={50}
                />
              </Box>

              <Typography sx={{ mt: 2 }} variant="h6">
                {currentList[nextIndex].name}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: '13px', color: '#ccc' }}>
                Current price: {currentList[nextIndex].price}
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#ccc' }}>
                Last check: {currentList[nextIndex].lastCheck}
              </Typography>

              {/* Heart button for both tabs */}
              <IconButton
                color="error"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                }}
              >
                {favorites.includes(
                  cryptocurrencies.indexOf(currentList[nextIndex]),
                ) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>

              {tab === 'my-cryptocurrencies' ? (
                <div className="">
                  <div className="w-[350px] h-[360px] flex flex-col mb-[-40px] px-7">
                    <Typography>
                      Value in USD:{' '}
                      {parseFloat(
                        currentList[nextIndex].price.replace('$', ''),
                      ) * 10}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>Amount:</Typography>
                    <TextField
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiOutlinedInput-root': {
                          height: '100%',
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#979695',
                          },
                          '&:hover fieldset': {
                            borderColor: '#979695',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#979695',
                          },
                        },
                        '& .MuiInputBase-input': {
                          height: '100%',
                          padding: '12px',
                        },
                      }}
                      fullWidth
                      margin="dense"
                      disabled
                    />

                    <Typography>Unit:</Typography>
                    <TextField
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiOutlinedInput-root': {
                          height: '100%',
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#979695',
                          },
                          '&:hover fieldset': {
                            borderColor: '#979695',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#979695',
                          },
                        },
                        '& .MuiInputBase-input': {
                          height: '100%',
                          padding: '12px',
                        },
                      }}
                      fullWidth
                      margin="dense"
                      disabled
                    />

                    <Typography>Comment:</Typography>
                    <TextField
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiOutlinedInput-root': {
                          height: '100%',
                          borderRadius: '10px',
                          '& fieldset': {
                            borderColor: '#979695',
                          },
                          '&:hover fieldset': {
                            borderColor: '#979695',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#979695',
                          },
                        },
                        '& .MuiInputBase-input': {
                          height: '100%',
                          padding: '12px',
                        },
                      }}
                      fullWidth
                      margin="dense"
                      disabled
                    />
                  </div>
                  <div className="flex justify-end mb-6">
                    <Button variant="contained" color="success" disabled>
                      Submit
                    </Button>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Navigation buttons */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <IconButton onClick={handlePrev} disabled={selected === 0}>
          <ArrowBack sx={{ color: selected === 0 ? '#888' : '#fff' }} />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={selected === currentList.length - 1}
        >
          <ArrowForward
            sx={{
              color: selected === currentList.length - 1 ? '#888' : '#fff',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  )
}
