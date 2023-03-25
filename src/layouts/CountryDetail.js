

import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { selectValue, selectStatus, getByIdAsync } from '../app/countrySlice';
import { selectStatus as selectOrderStatus, getByFiltersAsync } from '../app/orderSlice';
import PropertyDetailView from "../components/PropertyDetailView/PropertyDetailView";



const CountryDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const getSales = async(id) => {
        const res = await dispatch(getByFiltersAsync({ countryId: id }));
        if(res && res.payload && res.payload.value) {
            return res.payload.value;
        }
        return undefined;
    }

    return (
        <PropertyDetailView id={ params.id } title="Країна" selectValue={ selectValue } selectStatus={ selectStatus } get={ getByIdAsync } getOrders={ getSales } selectOrderStatus={ selectOrderStatus } />
    );
}

export default CountryDetail;