// import React from "react";
// import { Box, IconButton, Tooltip, Typography } from "@mui/material";
// import { useDemoRouter } from "@toolpad/core/internal";
// import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { AppProvider, Navigation } from "@toolpad/core/AppProvider";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// // Define the navigation for the dashboard
// const NAVIGATION: Navigation = [
//   {
//     kind: "header",
//     title: "Main items",
//   },
//   {
//     segment: "dashboard",
//     title: "Dashboard",
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: "orders",
//     title: "Orders",
//     icon: <ShoppingCartIcon />,
//   },
// ];

// export default function DashboardLayoutWithoutThemeSwitcher({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useDemoRouter("/dashboard");

//   return (
//     <AppProvider navigation={NAVIGATION} router={router}>
//       <DashboardLayout>{children}</DashboardLayout>
//     </AppProvider>
//   );
// }
