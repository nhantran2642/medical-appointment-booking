import React from 'react'
import { Outlet } from 'react-router-dom'
import Topmost from '../components/Topmost'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'

const HomeLayout = () => {
    return (
        <div>
            <Topmost />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default HomeLayout