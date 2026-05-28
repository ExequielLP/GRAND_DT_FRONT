import React, { lazy } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import ScrollToTop from './ScrollToTop'
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const ProtectRouters = lazy(() => import("./ProtectedRoute"))
const PlayersPage = lazy(() => import("../pages/PlayersPage"))
const Profile = lazy(() => import("../pages/Profile"))
const Match = lazy(() => import("../pages/Match"))
const Home = lazy(() => import("../pages/Home"))
const Admin = lazy(() => import("../pages/admin/Admin"))
const Resultados = lazy(() => import("../pages/admin/Resultados"))
const ListUserAdmin = lazy(() => import("../pages/admin/ListUserAdmin"))
const AppRoutes = () => {
    return (
        <>
        <ScrollToTop />
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home/>} />
            <Route element={<ProtectRouters />}>
                <Route path="/players" element={<PlayersPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/match" element={<Match />} />
            </Route>
            <Route element={<ProtectRouters requiredRole="ADMIN" />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/resultados" element={<Resultados />} />
                <Route path="/listUsers" element={<ListUserAdmin />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </>
    )
}

export default AppRoutes