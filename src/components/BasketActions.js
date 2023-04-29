

import { Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';

import { selectValues, deleteAsync, updateAsync, getAsync, selectValid } from '../app/basketSlice';
import { useEffect, useState } from 'react';

const BasketActions = ({ onOrdering }) => {
    const basket = useSelector(selectValues);
    const validBasket = useSelector(selectValid);
    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(validBasket.length === 0) {
            setIsValid(false);
        }
        else if(validBasket.some(item => item.valid !== true)) {
            setIsValid(false);
        }
        else {
            setIsValid(true);
        }
    }, [validBasket]);

    const clearBasket = async () => {
        await dispatch(deleteAsync());
        await dispatch(getAsync());
    }

    const updateBasket = async () => {
        await dispatch(updateAsync(basket));
        await dispatch(getAsync());
    }

    return (
        <div>
            <Button className='m-2' onClick={ updateBasket } disabled={ !isValid }>Зберегти</Button>
            <Button className='m-2' onClick={ clearBasket } disabled={ basket && basket.details && basket.details.length === 0 }>Очистити</Button>
            <Button className='m-2' onClick={ onOrdering } disabled={ !isValid }>Оформити замовлення</Button>
        </div>
    );
}

export default BasketActions;