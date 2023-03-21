

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { selectValues, getAsync, set, updateAsync } from '../app/basketSlice';
import { selectValues as selectOrder, createAsync as makeOrder } from '../app/orderSlice';
import { selectCurrent as selectUser } from '../app/authSlice';

import BasketActions from '../components/BasketActions';
import BasketTable from '../components/BasketTable/BasketTable';
import MakeOrderForm from '../components/MakeOrderForm/MakeOrderForm';
import InfoModal from '../components/InfoModal';

const Basket = () => {
    const basket = useSelector(selectValues);
    const user = useSelector(selectUser);
    const order = useSelector(selectOrder);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [orderDetailShow, setOrderDetailShow] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    useEffect(() => {
        dispatch(getAsync());
    }, []);

    useEffect(() => {
        if(!user || !user.isUser || !user.isActive) {
            navigate("/signin");
        }
    }, [user]);

    const changeBasket = async (id, count) => {
        if(!basket || !basket.details || !id || count === undefined) {
            return;
        }
        await dispatch(set({ ...basket, details: basket.details.map(item => { 
            return item.id !== id ? item : { ...item, count: count }
        })}));
    }

    const removeFromBasket = async (id) => {
        await dispatch(updateAsync({ ...basket, details: basket.details.map(item => { 
            return item.id !== id ? item : { ...item, count: 0 }
        })}));
        await dispatch(getAsync());
    }

    const cancelOrdering = () => {
        setOrderDetailShow(false);
    }

    const acceptOrder = async (info) => {
        if(!info) {
            return;
        }

        const res = await dispatch(makeOrder(info));

        if(res && res.payload && res.payload.value) {
            setInfoHeader('Нове замовлення');
            setInfoText(`Створено нове замовлення №${ res.payload.value.id }`);
            setInfoModal(true);
            setOrderDetailShow(false);
            dispatch(getAsync());
        }
        else {
            setInfoHeader('Помилка');
            setInfoText(`Виникла помилка. Спробуйте пізніше`);
            setInfoModal(true);
        }
    }

    return (
        <div>
            { basket && basket.details && basket.details.length === 0 ? <p className="text-white">Кошик порожній</p>
            :
            <div>
                <BasketTable basket={ basket } onChange={ changeBasket } onDelete={ removeFromBasket } />
                <BasketActions onOrdering={ () => setOrderDetailShow(true) } />
                { orderDetailShow && <MakeOrderForm onAccept={ acceptOrder } onCancel={ cancelOrdering } /> }
            </div>
            }
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) } title={ infoHeader } text={ infoText } />
        </div>
    );
}

export default Basket;