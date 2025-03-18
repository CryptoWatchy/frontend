'use client'

import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

export default function SideBar({
  setTab,
  tab,
}: {
  setTab: (tab: string) => void
  tab: string
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          top: '64px',
          height: 'calc(100vh - 64px)', // Full height minus NavBar
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={tab === 'pick-favourites'}
            onClick={() => setTab('pick-favourites')}
          >
            <ListItemText primary="Pick favourites" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            selected={tab === 'my-cryptocurrencies'}
            onClick={() => setTab('my-cryptocurrencies')}
          >
            <ListItemText primary="My cryptocurrencies" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
