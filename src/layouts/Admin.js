
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import { selectCurrent as selectUser } from '../app/authSlice';
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";

const Admin = () => {
    const user = useSelector(selectUser);
    return (
        <div>
            <Header />
            { user && user.isAdmin && user.isActive && !user.expired ? 
                <div className="d-flex">
                    <div className="p-3"><AdminSidebar /></div>
                    <div className="flex-grow-1 ps-4 pe-4" style={{ maxWidth: '1320px' }}><Outlet /></div>
                </div>
                :
                <p className="text-white text-center mt-3">У вас немає прав для перегляду даної сторінки</p>
            }
        </div>
    );
}

export default Admin;