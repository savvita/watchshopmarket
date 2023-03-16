
import RadioFormGroup from './RadioFormGroup';
import InputFormGroup from './InputFormGroup';
import validation from '../../modules/validation';

import { Form, FormGroup, Label, Input } from "reactstrap";

import { useSelector, useDispatch } from 'react-redux';

import { selectValues as selectDeliveries, getAsync as getDeliveries } from '../../app/deliverySlice';
import { selectValues as selectPayments, getAsync as getPayments } from '../../app/paymentSlice';
import { useEffect, useState } from "react";



const MakeOrderForm = () => {
    const payments = useSelector(selectPayments);
    const deliveries = useSelector(selectDeliveries);
    const dispatch = useDispatch();

    const [order, setOrder] = useState({});

    useEffect(() => {
        dispatch(getDeliveries());
        dispatch(getPayments());
    }, []);


    const setPayment = (id) => {
        setOrder({ ...order, paymentId: id })
    }

    const setDelivery = (id) => {
        setOrder({ ...order, deliveryId: id })
    }

    const setName = (value) => {
        setOrder({ ...order, fullName: value});
    }

    const setPhone = (value) => {
        setOrder({ ...order, phone: value });
    }

    return (
        <Form className="text-white">
            <fieldset className="fs-6 border border-light rounded-1">
                <legend>Контактна інформація</legend>
                <InputFormGroup name='fullname' title='Прізвище, ім’я, по-батькові' validationRule={ validation.notEmptyValidationRule } validationErrorText='Обов’язкове поле' onChange={ setName } />
                <InputFormGroup name='phone' title='Номер телефону' validationRule={ validation.digitsOnlyValidationRule } validationErrorText='Формат: 0123456789' onChange={ setPhone } />
            </fieldset>
            
            { deliveries && deliveries.value && 
                <RadioFormGroup items={ deliveries.value } title='Доставка' onChange={ setDelivery }>
                    
                </RadioFormGroup>
            }
            { payments && payments.value && <RadioFormGroup items={ payments.value } title='Оплата' onChange={ setPayment } /> }
    
        </Form>
    );
}

export default  MakeOrderForm;