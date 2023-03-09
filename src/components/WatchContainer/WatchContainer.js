
import WatchCard from './WatchCard';

import { updateAsync, selectValues as selectBasket } from '../../app/basketSlice';
import { useSelector, useDispatch } from 'react-redux';

const WatchContainer = ({ items }) => {
    const basket = useSelector(selectBasket);
    const dispatch = useDispatch();

    const addToBasket = (item) => {
        if(!item) {
            return;
        }
        dispatch(updateAsync({ ...basket, details: [...basket.details, { watchId: item.id, count: 1 }] }));
    }

    return (
        <div className="bg-dark d-flex flex-wrap justify-content-around">
            { items && items.map(item => <WatchCard key={ item.id } item={ item } onBuyClick={ addToBasket } />)}
        </div>
    );
}

export default WatchContainer;