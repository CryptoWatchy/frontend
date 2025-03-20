import axios from 'axios'
import { CreateTokenTxDto, UpdateFavoriteDto } from '../interfaces/types'

export const getTokens = async () => {
  try {
    const response = await axios.get('http://localhost:3001/token')

    return response.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const getTotalValue = async () => {
  try {
    const response = await axios.get('http://localhost:3001/token/total-value')

    return response.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const updateFavoriteStatus = async (
  unit: string,
  updateFav: UpdateFavoriteDto,
) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/token/${unit}/favorite`,
      updateFav,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error:', error)
  }
}

export const saveTokenTransaction = async (
  unit: string,
  tokenTxData: CreateTokenTxDto,
) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/token/${unit}`,
      tokenTxData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (error) {
    console.error('Error saving token transaction:', error)
    throw new Error('Failed to save token transaction')
  }
}
