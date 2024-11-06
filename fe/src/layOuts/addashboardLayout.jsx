import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/adsidebar';
import './AdLayout.scss';

const AdLayout = () => {
    return (
        <div className="ad-layout">
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default AdLayout;
