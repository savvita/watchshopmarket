
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

import { selectCurrent as selectUser } from '../app/authSlice';
import { useSelector } from "react-redux";

const Admin = () => {
    const user = useSelector(selectUser);
    return (
        <div>
            { user && user.isAdmin && user.isActive ? 
                <div className="d-flex">
                    <div><AdminSidebar /></div>
                    <div className="flex-grow-1" style={{ maxWidth: '1320px' }}><Outlet /></div>
                </div>
                :
                <p className="text-white text-center">У вас немає прав для перегляду даної сторінки</p>
            }
        </div>
    );
}

export default Admin;