

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

import { selectStatus as selectColorStatus, getByIdAsync } from '../../app/colorSlice';
import { getByFiltersAsync } from '../../app/orderSlice';
import ColorTypeDetailView from './ColorTypeDetailView';

const ColorDetailView = ({ id }) => {
    const [types, setTypes] = useState({
        'case': {},
        'dial': {},
        'strap': {}
    });

    const status = useSelector(selectColorStatus);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect (() => {
        if(!id) {
            return;
        }

        getTypes();
    }, [id]);

    const getTypes = async() => {
        const caseColor = await dispatch(getByIdAsync({ id: id, type: 'case' }));
        const dialColor = await dispatch(getByIdAsync({ id: id, type: 'dial' }));
        const strapColor = await dispatch(getByIdAsync({ id: id, type: 'strap' }));
        setTypes({
            'case': caseColor && caseColor.payload,
            'dial': dialColor && dialColor.payload,
            'strap': strapColor && strapColor.payload
        });
    }

    const getCaseColorOrders = async(id) => {
        if(!id) {
            return undefined;
        }

        const res = await dispatch(getByFiltersAsync({ caseColorId: id }));

        if(res && res.payload && res.payload.value) {
            return res.payload.value;
        }

        return undefined;
    }

    const getDialColorOrders = async(id) => {
        if(!id) {
            return undefined;
        }

        const res = await dispatch(getByFiltersAsync({ dialColorId: id }));

        if(res && res.payload && res.payload.value) {
            return res.payload.value;
        }

        return undefined;
    }

    const getStrapColorOrders = async(id) => {
        if(!id) {
            return undefined;
        }

        const res = await dispatch(getByFiltersAsync({ strapColorId: id }));

        if(res && res.payload && res.payload.value) {
            return res.payload.value;
        }

        return undefined;
    }

    return (
        <div className="text-white mt-3">
            <Button onClick={() => navigate(-1)}>Назад</Button>

            { types && types.case && <ColorTypeDetailView id={ id } title='Колір корпусу' value={ types.case } getOrders={ getCaseColorOrders } /> }

            { types && types.dial && <ColorTypeDetailView id={ id } title='Колір циферблату' value={ types.dial } getOrders={ getDialColorOrders } /> }

            { types && types.strap && <ColorTypeDetailView id={ id } title='Колір браслету/ремінця' value={ types.strap } getOrders={ getStrapColorOrders } /> }

        </div>
    );
}

export default ColorDetailView;