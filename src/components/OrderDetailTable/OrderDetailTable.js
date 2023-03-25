

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Table } from 'reactstrap';
import OrderDetailTableRow from './OrderDetailTableRow';

import { selectCurrent as selectUser } from '../../app/authSlice';
import { cancelAsync, getByIdAsync, setStatusAsync } from '../../app/orderSlice';
import { useEffect, useState } from 'react';
import InfoModal from '../InfoModal';
import OrderStatusSelect from './OrderStatusSelect';


const OrderDetailTable = ({ item, isManagerMode, onClose, onCancel }) => {
    const [total, setTotal] = useState(0);
    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!item || !item.details) {
            return;
        }

        let sum = 0;
        for(let detail of item.details) {
            sum += detail.count * detail.unitPrice;
        }

        setTotal(sum);
    }, [item]);

    if(!item || !item.details) {
        return null;
    }

    const cancelOrder = async () => {
        if(!item) {
            return;
        }

        const res = await dispatch(cancelAsync(item.id));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            dispatch(getByIdAsync(item.id));
        }
    }

    const setStatus = async (statusId) => {
        if(!item || !statusId) {
            return;
        }

        const res = await dispatch(setStatusAsync({ id: item.id, statusId: statusId }));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            dispatch(getByIdAsync(item.id));
        }
    }

    const closeOrder = async () => {
        if(!item) {
            return;
        }

        const res = await dispatch(setStatusAsync({ id: item.id, statusId: 3 }));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            dispatch(getByIdAsync(item.id));
        }
    }

    return (
        <div>
            <Button onClick={() => navigate(-1)}>Назад</Button>
            <div className="d-flex justify-content-between">
                <div className="flex-grow-1">
                    <h3 className="text-white">Номер замовлення: { item.id }</h3>
                    <p className="text-white mb-1 mt-1">Дата: { (new Date(item.date)).toLocaleString() }</p>
                    { item.status && <OrderStatusSelect item={ item } isSelectable={ isManagerMode && item.status.id !== 3 && item.status.id !== 4 } onChange={ setStatus } /> }
                    <p className="text-white mb-1 mt-1">Отримувач: { item.fullName }, { item.phoneNumber }</p>
                    { item.payment && <p className="text-white mb-1 mt-1">Оплата: { item.payment.value }</p> }
                    { item.delivery && <p className="text-white mb-1 mt-1">Доставка: { item.delivery.value }{ item.delivery.id === 2 && ` (${ item.city && item.city.description }, ${ item.warehouse && item.warehouse.description })`}</p> }
                    { item.delivery && item.delivery.id === 2 && item.en && <p className="text-white mb-1 mt-1">Номер накладної: { item.en }</p>}
                </div>
                <div className="d-flex flex-column">
                    { isManagerMode && item.status && (item.status.id === 1 || item.status.id === 2) && <Button color="danger" className="m-1" onClick={ closeOrder }>Закрити</Button> }
                    { item.status && (item.status.id === 1 || item.status.id === 2) && <Button color="danger" className="m-1" onClick={ cancelOrder }>Скасувати</Button> }
                </div>
            </div>


            <Table dark style={{ minWidth: '300px' }} className="mt-5">
                <thead>
                    <tr className="text-center">
                        <th scope="col">№</th>
                        <th scope="col">Товар</th>
                        <th scope="col">Код товару</th>
                        <th scope="col">Кількість</th>
                        <th scope="col">Ціна</th>
                        <th scope="col">Разом</th>
                    </tr>
                </thead>
                <tbody>
                    { item.details.map((item, i) => 
                        <OrderDetailTableRow key={ item.id } idx={ i + 1 } item = { item } />
                    )}
                </tbody>
            </Table>
            <h3 className='text-white text-end text-nowrap'>Разом: { total } &#8372;</h3>
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) } title={ infoHeader } text={ infoText } />
        </div>
    );
}

export default OrderDetailTable;