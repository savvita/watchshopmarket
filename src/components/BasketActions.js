

import { Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';

import { selectValues, deleteAsync, updateAsync, getAsync } from '../app/basketSlice';
import { useEffect } from 'react';

const BasketActions = ({ onOrdering }) => {
    const basket = useSelector(selectValues);
    const dispatch = useDispatch();

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
            <Button className='m-2' onClick={ updateBasket }>Зберегти</Button>
            <Button className='m-2' onClick={ clearBasket } disabled={ basket && basket.details && basket.details.length === 0 }>Очистити</Button>
            <Button className='m-2' disabled={ basket && basket.details && basket.details.length === 0 } onClick={ onOrdering }>Оформити замовлення</Button>
        </div>
    );
}

export default BasketActions;