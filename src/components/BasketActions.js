

import { Button } from 'reactstrap';

import { useSelector, useDispatch } from 'react-redux';

import { selectValues, deleteAsync, updateAsync, getAsync } from '../app/basketSlice';

const BasketActions = () => {
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
            <Button onClick={ updateBasket }>Зберегти</Button>
            <Button onClick={ clearBasket }>Очистити</Button>
            <Button>Оформити замовлення</Button>
        </div>
    );
}

export default BasketActions;