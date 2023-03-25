

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

import { selectStatus as selectMaterialStatus, getByIdAsync } from '../../app/materialSlice';
import { getByFiltersAsync } from '../../app/orderSlice';
import MaterialTypeDetailView from './MaterialTypeDetailView';

const MaterialDetailView = ({ id }) => {
    const [types, setTypes] = useState({
        'case': {}
    });

    const status = useSelector(selectMaterialStatus);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect (() => {
        if(!id) {
            return;
        }

        getTypes();
    }, [id]);

    const getTypes = async() => {
        const caseMaterial = await dispatch(getByIdAsync({ id: id, type: 'case' }));
        setTypes({
            'case': caseMaterial && caseMaterial.payload
        });
    }

    const getCaseMaterialOrders = async(id) => {
        if(!id) {
            return undefined;
        }

        const res = await dispatch(getByFiltersAsync({ caseMaterialId: id }));

        if(res && res.payload && res.payload.value) {
            return res.payload.value;
        }

        return undefined;
    }

    return (
        <div className="text-white mt-3">
            <Button onClick={() => navigate(-1)}>Назад</Button>

            { types && types.case && <MaterialTypeDetailView id={ id } title='Матеріал корпусу' value={ types.case } getOrders={ getCaseMaterialOrders } /> }

        </div>
    );
}

export default MaterialDetailView;