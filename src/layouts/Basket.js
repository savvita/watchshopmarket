

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { selectValues, getAsync, set } from '../app/basketSlice';
import { selectCurrent as selectUser } from '../app/authSlice';

import BasketActions from '../components/BasketActions';
import BasketTable from '../components/BasketTable/BasketTable';
import MakeOrderForm from '../components/MakeOrderForm/MakeOrderForm';

const Basket = () => {
    const basket = useSelector(selectValues);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAsync());
    }, []);

    useEffect(() => {
        if(!user || !user.isUser || !user.isActive) {
            navigate("/signin");
        }
    }, [user]);

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
                <MakeOrderForm />
            </div>
        }
        </div>
    );
}

export default Basket;