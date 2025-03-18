import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

export default function SideBar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          top: '64px', // Adjust this to match your NavBar's height
          height: 'calc(100vh - 64px)', // Full height minus NavBar
        },
      }}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemText primary="Pick favourites" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="My cryptocurrencies" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
