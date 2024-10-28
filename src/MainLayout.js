import React from 'react';
import Sidenav from './Sidenav';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 sidenav-container">
                    <Sidenav />
                </div>
                <div className="col-md-9 main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
