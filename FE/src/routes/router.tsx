import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/landing/LandingPage";
import CreatePage from "../pages/create/CreatePage";
import AccessPage from "../pages/access/AccessPage";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import { MY_ROUTE } from "./const";
import Layout from "../components/layout/layout";
import LayoutDashboard from "../components/layout/dashboard";
import TransferPage from "../pages/transfer/Transfer";
import HistoryPage from "../pages/history/History";
import BuyPage from "../pages/buy/Buy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: MY_ROUTE.LANDING, element: <LandingPage /> }],
  },
  {
    path: "/create",
    element: <Layout />,
    children: [{ path: MY_ROUTE.CREATE_WALLET, element: <CreatePage /> }],
  },
  {
    path: "/access",
    element: <Layout />,
    children: [{ path: MY_ROUTE.ACCESS_WALLET, element: <AccessPage /> }],
  },
  {
    path: "/dashboard",
    element: <LayoutDashboard />,
    children: [{ path: MY_ROUTE.DASHBOARD, element: <Dashboard /> }],
  },
  {
    path: "/transfer",
    element: <LayoutDashboard />,
    children: [{ path: MY_ROUTE.TRANSFER, element: <TransferPage /> }],
  },
  {
    path: "/history",
    element: <LayoutDashboard />,
    children: [{ path: MY_ROUTE.HISTORY, element: <HistoryPage /> }],
  },
  {
    path: "/buy",
    element: <LayoutDashboard />,
    children: [{ path: MY_ROUTE.BUY, element: <BuyPage /> }],
  },
  {
    path: "/*",
    element: <NotFoundPage />,
  },
]);

export default router;
