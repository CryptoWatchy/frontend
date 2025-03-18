'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import SideBar from '@/components/side-bar'
import Main from '@/components/main'

export default function Home() {
  const [tab, setTab] = useState('pick-favourites')

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box component="header"></Box>

      {/* Main Content Wrapper */}
      <Box display="flex" flexGrow={1}>
        {/* Sidebar on the left */}
        <SideBar setTab={setTab} tab={tab} />

        {/* Main content on the right */}
        <Box component="section" flexGrow={1}>
          <Main tab={tab} />
        </Box>
      </Box>
    </Box>
  )
}
