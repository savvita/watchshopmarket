
import { Outlet } from "react-router-dom";

import { selectCurrent as selectUser } from '../app/authSlice';
import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import UserSidebar from "../components/UserSidebar";

const Admin = () => {
    const user = useSelector(selectUser);

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="flex-grow-1">
                { user && user.isActive && !user.expired ? 
                    <div className="d-flex">
                        <div className="p-3"><UserSidebar /></div>
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