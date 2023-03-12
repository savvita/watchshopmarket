
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";

import { selectCurrent as selectUser } from '../app/authSlice';
import { useSelector } from "react-redux";

const Manager = () => {
    const user = useSelector(selectUser);
    return (
        <div>
            { user && user.isManager && user.isActive ? 
                <div className="d-flex">
                    <div><ManagerSidebar /></div>
                    <div className="flex-grow-1" style={{ maxWidth: '1320px' }}><Outlet /></div>
                </div>
                :
                <p className="text-white text-center">У вас немає прав для перегляду даної сторінки</p>
            }
        </div>
    );
}

export default Manager;