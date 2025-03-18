import React from 'react'
import { AppBar, Toolbar, Typography } from '@mui/material'

export default function NavBar() {
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
            My wallet USD value: $93,200.00
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
