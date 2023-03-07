
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";


import { Row, Col } from 'reactstrap';

const Manager = () => {
    return (
        <div>
            <div className="d-flex">
                <div><ManagerSidebar /></div>
                <div className="flex-grow-1" style={{ maxWidth: '1320px' }}><Outlet /></div>
            </div>
        </div>
    );
}

export default Manager;