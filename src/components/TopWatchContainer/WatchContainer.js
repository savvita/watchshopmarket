

import WatchCard from './WatchCard';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";

import { selectValues as selectBasket, updateAsync } from '../../app/basketSlice';
import { selectValues as selectWatches, selectStatus, getAsync } from '../../app/watchSlice';

import './WatchContainer.css';


const WatchContainer = () => {
    const basket = useSelector(selectBasket);
    const items = useSelector(selectWatches);
    const status = useSelector(selectStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsync({ page: 1, perPage: 9, onSale: [ true ], isTop: [ true ] }));
    }, []);

    const addToBasket = (item) => {
        if(!item) {
            return;
        }
        dispatch(updateAsync({ ...basket, details: [...basket.details, { watchId: item.id, count: 1 }] }));
    }

    return (
        <>
            <div className={ status === 'loading' ? 'd-none' : "bg-dark d-flex flex-wrap justify-content-around" }>
                { items && items.value && items.value.map(item => <WatchCard key={ item.id } item={ item } onBuyClick={ addToBasket } />)}
            </div>
            <div className={ status === 'loading' ? 'd-flex justify-content-center mt-3' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
        </>
    );
}

export default WatchContainer;