import OrderTable from "../components/OrderTable/OrderTable";



import { selectCurrent as selectUser } from '../app/authSlice';
import { useSelector } from "react-redux";



const Orders = ({ isManagerMode, isUserMode, statusses }) => {
    const user = useSelector(selectUser);

    return (
        <div>
            { user && user.isActive ? 
                <div className="d-flex">
                    <div><OrderTable isManagerMode={ isManagerMode } isUserMode={ isUserMode } statusses={ statusses } /></div>
                </div>
                :
                <p className="text-white text-center">У вас немає прав для перегляду даної сторінки</p>
            }
        </div>
    );
}

export default Orders;