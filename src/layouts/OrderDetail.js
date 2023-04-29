

import OrderDetailTable from "../components/OrderDetailTable/OrderDetailTable";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrent, selectStatus, getByIdAsync } from '../app/orderSlice';
import { selectCurrent as selectUser } from '../app/authSlice';
import { Spinner } from "reactstrap";
import { useEffect } from "react";


const OrderDetail = ({ isManagerMode, viewOnly }) => {
    const params = useParams();

    const item = useSelector(selectCurrent);
    const status = useSelector(selectStatus);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    if(!user || !user.isActive) {
        navigate("/signin");
    }

    useEffect(() => {
        dispatch(getByIdAsync(params.id));
    }, []);

    return (
        <div>
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
            { item &&
                <div className={ status !== 'idle' ? 'd-none' : 'mt-4' }>
                    <OrderDetailTable item={ item } isManagerMode={ isManagerMode } viewOnly={ viewOnly } />
                </div>
            }
        </div>
    );
}


export default OrderDetail;