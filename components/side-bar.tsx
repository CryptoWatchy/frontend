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
          top: '100px',
          height: 'calc(100vh - 100px)', // Full height minus NavBar
          background: 'linear-gradient(to right, #34302f 30%, #505050 100%)',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <List
        sx={{
          color: '#000',
          background: 'linear-gradient(to right, #34302f 30%, #505050 100%)',
          mt: -1,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton
            selected={tab === 'pick-favourites'}
            onClick={() => setTab('pick-favourites')}
            sx={{
              '&.Mui-selected': {
                background: 'linear-gradient(to right, #808080, #d3d3d3)', // Background when selected
                color: '#000', // Text color when selected
              },
              '&:hover': {
                backgroundColor: '#555', // Hover background color
              },
            }}
          >
            <ListItemText
              primary="Pick favourites"
              sx={{
                color: tab === 'pick-favourites' ? '#000' : '#fff', // Change text color when active
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            selected={tab === 'my-cryptocurrencies'}
            onClick={() => setTab('my-cryptocurrencies')}
            sx={{
              '&.Mui-selected': {
                background: 'linear-gradient(to right, #808080, #d3d3d3)', // Background when selected
                color: '#000', // Text color when selected
              },
              '&:hover': {
                backgroundColor: '#555', // Hover background color
              },
            }}
          >
            <ListItemText
              primary="My cryptocurrencies"
              sx={{
                color: tab === 'my-cryptocurrencies' ? '#000' : '#fff', // Change text color when active
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
