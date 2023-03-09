

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectValues, getAsync, set } from '../app/basketSlice';

import BasketActions from '../components/BasketActions';
import BasketTable from '../components/BasketTable/BasketTable';

const Basket = () => {
    const basket = useSelector(selectValues);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsync());
    }, []);

    const changeBasket = (id, count) => {
        if(!basket || !basket.details || !id || !count) {
            return;
        }
        dispatch(set({ ...basket, details: basket.details.map(item => { 
                return item.id !== id ? item : { ...item, count: count 
            }
        })}));
    }

    return (
        <div>
            { basket && basket.details && basket.details.length === 0 ? <p className="text-white">Кошик порожній</p>
            :
            <div>
                <BasketTable basket={ basket } onChange={ changeBasket } />
                <BasketActions />
            </div>
        }
        </div>
    );
}

export default Basket;