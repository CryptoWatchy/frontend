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
  MenuItem,
  Select,
} from '@mui/material'
import {
  ArrowBack,
  ArrowForward,
  FavoriteBorder,
  Favorite,
} from '@mui/icons-material'
import Box from '@mui/material/Box'
import {
  getTokens,
  updateFavoriteStatus,
  saveTokenTransaction,
} from '@/utils/apiService'
import { CreateTokenTxDto, UpdateFavoriteDto } from '@/interfaces/types'

const icons: Record<string, string> = {
  Bitcoin: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=026',
  Ethereum: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026',
  Polygon: 'https://cryptologos.cc/logos/polygon-matic-logo.png?v=026',
  Polkadot: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=026',
  Solana: 'https://cryptologos.cc/logos/solana-sol-logo.png?v=026',
}

export default function Main({ tab }: { tab: string }) {
  const favorites = useSelector((state: RootState) => state.favorites.favorites)
  const dispatch = useDispatch()

  const [selectedUnit, setSelectedUnit] = useState('Bitcoin')
  const [cryptocurrencies, setCryptocurrencies] = useState<any[]>([])
  const [inputValues, setInputValues] = useState<{
    [key: string]: { amount: string; comment: string }
  }>({})

  useEffect(() => {
    const fetchTokens = async () => {
      const tokens = await getTokens()
      setCryptocurrencies(tokens)
      console.log('FETCHED TOKENS: ', tokens)
    }

    // Fetch tokens on initial load
    fetchTokens()

    // Set an interval to fetch tokens every 10 minutes (600000ms)
    const interval = setInterval(() => {
      fetchTokens()
    }, 600000)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval)
  }, [])

  const getTokenIcon = (unit: string) => {
    return icons[unit] || '/default-icon.png'
  }

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
      <Typography
        sx={{ mt: 'calc(35vh)', textAlign: 'center', color: '#fff' }}
        variant="h6"
      >
        Currently, you have no favorite cryptocurrencies.
      </Typography>
    )
  }

  if (!currentList[selected]) return null

  const prevIndex = selected > 0 ? selected - 1 : null
  const nextIndex = selected < currentList.length - 1 ? selected + 1 : null

  const handleSubmit = async () => {
    try {
      const selectedCryptoUnit = currentList[selected]?.unit
      console.log('CURRENT TOKEN: ', selectedCryptoUnit)

      if (!selectedCryptoUnit) {
        alert('Please select a cryptocurrency')
        return
      }

      const selectedInput = inputValues[selectedUnit]

      if (!selectedInput || !selectedInput.amount || !selectedInput.comment) {
        alert('All fields are required')
        return
      }

      if (isNaN(Number(selectedInput.amount))) {
        alert('Amount must be a valid number')
        return
      }

      const createTokenTxDto: CreateTokenTxDto = {
        amount: Number(selectedInput.amount),
        comment: selectedInput.comment,
      }

      await saveTokenTransaction(selectedCryptoUnit, createTokenTxDto)

      setInputValues((prev) => ({
        ...prev,
        [selectedCryptoUnit]: { amount: '', comment: '' },
      }))
    } catch (error) {
      console.error('Error during transaction submission:', error)
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value
    setInputValues((prev) => ({
      ...prev,
      [selectedUnit]: {
        ...prev[selectedUnit],
        amount: newAmount,
      },
    }))
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value
    setInputValues((prev) => ({
      ...prev,
      [selectedUnit]: {
        ...prev[selectedUnit],
        comment: newComment,
      },
    }))
  }

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
                  src={getTokenIcon(currentList[prevIndex].unit)}
                  alt={currentList[prevIndex].unit}
                  width={50}
                  height={50}
                />
              </Box>

              <Typography sx={{ mt: 2 }} variant="h6">
                {currentList[prevIndex].unit}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: '13px', color: '#ccc' }}>
                Current price: {currentList[prevIndex].price}
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#ccc' }}>
                Last check: {currentList[prevIndex].priceUpdateDate}
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
                      Value in USD: ${currentList[prevIndex].value}
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
                    <Select
                      value={currentList[prevIndex].unit}
                      disabled
                      fullWidth
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiSelect-root': {
                          height: '100%',
                        },
                      }}
                    >
                      {favoriteCryptos.map((item) => (
                        <MenuItem key={item.unit} value={item.unit}>
                          {item.unit}
                        </MenuItem>
                      ))}
                    </Select>

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
                src={getTokenIcon(currentList[selected].unit)}
                alt={currentList[selected].unit}
                width={50}
                height={50}
              />
            </Box>

            <Typography sx={{ mt: 2 }} variant="h6">
              {currentList[selected].unit}
            </Typography>
            <Typography sx={{ mt: 2, fontSize: '13px', color: '#ccc' }}>
              Current price: {currentList[selected].price}
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#ccc' }}>
              Last check: {currentList[selected].priceUpdateDate}
            </Typography>

            <IconButton
              onClick={async () => {
                const newFavoriteStatus = !favorites.includes(
                  cryptocurrencies.indexOf(currentList[selected]),
                )

                const updateFav: UpdateFavoriteDto = {
                  favorite: newFavoriteStatus,
                }

                await updateFavoriteStatus(
                  currentList[selected].unit,
                  updateFav,
                )

                dispatch(
                  toggleFavorite(
                    cryptocurrencies.indexOf(currentList[selected]),
                  ),
                )
              }}
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
                    Value in USD: $
                    {(
                      Number(inputValues[selectedUnit]?.amount || 0) *
                      Number(currentList[selected].price)
                    ).toFixed(2)}
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
                    value={inputValues[selectedUnit]?.amount || ''}
                    onChange={handleAmountChange}
                  />

                  <Typography>Unit:</Typography>
                  <Select
                    value={currentList[selected].unit}
                    onChange={(e) => {
                      const newUnit = e.target.value
                      setSelectedUnit(newUnit)

                      // Find the index of the selected unit from the 'crypto' array
                      const newIndex = currentList.findIndex(
                        (item) => item.unit === newUnit,
                      )

                      // Update the selected card index
                      setSelected(newIndex)
                    }}
                    fullWidth
                    sx={{
                      backgroundColor: '#545454',
                      borderRadius: '10px',
                      height: '40px',
                      '& .MuiSelect-root': {
                        height: '100%',
                      },
                    }}
                  >
                    {favoriteCryptos.map((item) => (
                      <MenuItem key={item.unit} value={item.unit}>
                        {item.unit}
                      </MenuItem>
                    ))}
                  </Select>

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
                    value={inputValues[selectedUnit]?.comment || ''}
                    onChange={handleCommentChange}
                  />
                </div>
                <div className="flex justify-end mb-6">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
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
                  src={getTokenIcon(currentList[nextIndex].unit)}
                  alt={currentList[nextIndex].unit}
                  width={50}
                  height={50}
                />
              </Box>

              <Typography sx={{ mt: 2 }} variant="h6">
                {currentList[nextIndex].unit}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: '13px', color: '#ccc' }}>
                Current price: {currentList[nextIndex].price}
              </Typography>
              <Typography sx={{ fontSize: '13px', color: '#ccc' }}>
                Last check: {currentList[nextIndex].priceUpdateDate}
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
                      Value in USD: ${currentList[nextIndex].value}
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
                    <Select
                      value={currentList[nextIndex].unit}
                      disabled
                      fullWidth
                      sx={{
                        backgroundColor: '#545454',
                        borderRadius: '10px',
                        height: '40px',
                        '& .MuiSelect-root': {
                          height: '100%',
                        },
                      }}
                    >
                      {favoriteCryptos.map((item) => (
                        <MenuItem key={item.unit} value={item.unit}>
                          {item.unit}
                        </MenuItem>
                      ))}
                    </Select>

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
