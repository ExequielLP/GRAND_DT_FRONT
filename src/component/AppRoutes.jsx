import React, { lazy } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const ProtectRouters = lazy(() => import("../pages/ProtectedRoute"))
const PlayersPage = lazy(() => import("../pages/PlayersPage"))
const Profile = lazy(() => import("../pages/Profile"))
const Match = lazy(() => import("../pages/Match"))
const Home = lazy(() => import("../pages/Home"))    
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home/>} />
            <Route element={<ProtectRouters />}>
                <Route path="/players" element={<PlayersPage />} />   
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/match" element={<Match />} /> 
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AppRoutes