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

// import PickFav from "@/components/pick-fav";
// import MyCrypto from "@/components/my-crypto";

// import * as React from 'react';
// import { AppBar, Toolbar } from "@mui/material";
// import Typography from '@mui/material/Typography';
// import Main from "@/components/main";

// export default function Home() {
//   const num = 10

//   return (
//     <main className="flex flex-col items-center">
//       <AppBar position="relative">
//           <Toolbar>
//           <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
//             Title
//           </Typography>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             My wallet USD value: {num}
//           </Typography>
//           </Toolbar>
//       </AppBar>
//       <Main />
//       <PickFav />
//       <MyCrypto />
//     </main>
//   );
// }
