
import RadioFormGroup from './RadioFormGroup';
import InputFormGroup from './InputFormGroup';
import validation from '../../modules/validation';

import { Button, Form } from "reactstrap";

import { useSelector, useDispatch } from 'react-redux';

import { selectValues as selectDeliveries, getAsync as getDeliveries } from '../../app/deliverySlice';
import { selectValues as selectPayments, getAsync as getPayments } from '../../app/paymentSlice';
import { selectProfile as selectUser, selectCurrent, getProfileAsync as getUser, getProfileAsync } from '../../app/authSlice';
import { useEffect, useState } from "react";
import NPFormGroup from './NPFormGroup';

import './MakeOrderForm.css';
import InfoModal from '../InfoModal';

const MakeOrderForm = ({ onAccept, onCancel }) => {
    const payments = useSelector(selectPayments);
    const deliveries = useSelector(selectDeliveries);
    const profile = useSelector(selectUser);
    const user = useSelector(selectCurrent);
    const dispatch = useDispatch();

    const [order, setOrder] = useState({});
    const [np, setNp] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    useEffect(() => {
        dispatch(getDeliveries());
        dispatch(getPayments());
        if(user && user.userName) {
            dispatch(getUser(user.userName));
        }
    }, []);

    useEffect(() => {
        if(profile) {
            setOrder(
            { 
                ...order, 
                fullName: `${ profile.lastName ?? "" } ${ profile.firstName ?? "" } ${ profile.secondName ?? "" }`,
                phoneNumber: profile.phoneNumber ?? ""
            });
        }
    }, [profile]);

    const setPayment = (id) => {
        setOrder({ ...order, paymentId: id });
    }

    const setDelivery = (id) => {
        setOrder({ ...order, deliveryId: id })

        if(deliveries && deliveries.value) {
            const n = deliveries.value.find(x => x.value === 'Нова Пошта');
            if(n && n.id === id) {
                setNp(true);
            }
            else {
                setNp(false);
            }
        }
        else {
            setNp(false);
        }
    }

    const setName = (value) => {
        setOrder({ ...order, fullName: value});
    }

    const setPhone = (value) => {
        setOrder({ ...order, phoneNumber: value });
    }

    const setNpInfo = (info) => {
        if(!info) {
            return;
        }
        setOrder({ ...order, settlementRef: info.settlementRef, warehouseRef: info.warehouseRef });
    }

    const clearInfo = () => {
        setOrder({});
        setNp(false);
        onCancel && onCancel();
    }

    const acceptOrder = () => {
        if(validate(order)) {
            onAccept && onAccept(order);
        }
        else {
            showError('Помилка', 'Не всі обов’язкові поля заповнені');
        }
    }

    const validate = () => {
        const isTextValid = validation.notEmptyValidationRule(order.fullName) && validation.digitsOnlyValidationRule(order.phoneNumber) && order.phoneNumber.length === 10;

        const isDeliveryValid = deliveries && deliveries.value && deliveries.value.find(x => x.id === order.deliveryId) !== undefined;
        const isPaymentValid = payments && payments.value && payments.value.find(x => x.id === order.paymentId) !== undefined;

        const isNpValid = np === true ? order.settlementRef !== undefined && order.warehouseRef !== undefined : true;

        const val = isTextValid && isDeliveryValid && isPaymentValid && isNpValid;

        return val;
    };

    const showError = (title, text) => {
        setInfoHeader(title ?? 'Інформація');
        setInfoText(text);
        setInfoModal(true);
    }

    return (
        <Form className="text-white mt-2">
            <fieldset className="fs-6 border border-light rounded-1 p-3 pt-1 mb-3">
                <legend>Контактна інформація</legend>
                <InputFormGroup name='fullname' initialValue={ order.fullName } title='Прізвище, ім’я, по-батькові' validationRule={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onChange={ setName } />
                <InputFormGroup name='phone' initialValue={ order.phoneNumber } title='Номер телефону' validationRule={ validation.digitsOnlyValidationRule } validationErrorText='Формат: 0123456789' onChange={ setPhone } />
            </fieldset>
            
            { deliveries && deliveries.value && 
                <RadioFormGroup items={ deliveries.value } initialValue={ order.deliveryId } title='Доставка' onChange={ setDelivery }>
                    <NPFormGroup className={ np && 'expanded' } onSet={ setNpInfo } />
                </RadioFormGroup>
            }

            { payments && payments.value && <RadioFormGroup items={ payments.value } initialValue={ order.paymentId } title='Оплата' onChange={ setPayment } /> }

            <Button className='m-2' onClick={ acceptOrder }>Надіслати замовлення</Button>
            <Button className='m-2' onClick={ clearInfo }>Скасувати</Button>
    
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) } title={ infoHeader } text={ infoText } />
        </Form>
    );
}

export default  MakeOrderForm;