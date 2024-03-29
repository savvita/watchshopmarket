
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import { selectCurrent as selectUser } from '../app/authSlice';
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const Admin = () => {
    const user = useSelector(selectUser);
    const [collapsed, setCollapsed] = useState(false);


    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="flex-grow-1 d-flex">
                { user && user.isAdmin && user.isActive && !user.expired ? 
                    <div className="d-flex position-relative flex-grow-1">
                        <div className="d-flex flex-column">
                            <div className="overflow-hidden p-2 m-3 mb-0 sidebar__btn">
                                <FaBars className="property-table__icon" onClick={ () => setCollapsed(!collapsed) } />
                            </div>
                            <div className="position-relative flex-grow-1">
                                <div className={ collapsed ? "p-3 border-end sidebar__collapsed bg-dark h-100" : "p-3 border-end sidebar__collapsed sidebar__opened bg-dark h-100" }>
                                    <AdminSidebar />
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow-1 ps-4 pe-4" style={{ maxWidth: '1320px' }}><Outlet /></div>
                    </div>
                    :
                    <p className="text-white text-center mt-3">У вас немає прав для перегляду даної сторінки</p>
                }
            </div>
            <Footer />
        </div>
    );
}

export default Admin;