'use client'

import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { getTotalValue } from '../utils/apiService'

export default function NavBar() {
  const [totalValue, setTotalValue] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTotalValue = async () => {
      try {
        const value = await getTotalValue()
        setTotalValue(value)
      } catch (err) {
        setError('Failed to load wallet value')
      } finally {
        setLoading(false)
      }
    }

    fetchTotalValue()

    const intervalId = setInterval(fetchTotalValue, 60000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex z-10">
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          mb: 3,
          background: '#322e2d',
          height: '100px',
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            CryptoWatcher
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {loading
              ? 'Loading...'
              : error
                ? error
                : `My wallet USD value: $${totalValue}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
