


import { useSelector } from 'react-redux';
import Review from './Review';

import { selectCurrent } from '../../app/authSlice';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';

const Reviews = ({ items, onAccept }) => {
    const user = useSelector(selectCurrent);

    const [reviews, setReviews] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);

    useEffect(() => {
        if(!items) {
            return;
        }

        setReviews(items.filter(x => x.checked).slice((currentPage - 1) * perPage, currentPage * perPage));
    }, [items, currentPage]);


    return (
        <div className="p-3">
            { reviews && reviews.length > 0 ? reviews.map(item => <Review key={ item.id } item={ item } onAccept={ onAccept } />) :
            <p className='text-white mt-2 mb-2'>На цей товар ще немає відгуків</p> }
            { user && user.isUser && user.isActive && <Review onAccept={ onAccept } /> }
            { items && items.length > perPage && <Pagination currentPage={ currentPage } hits={ items.length } perPage={ perPage } onPageChanged={ (page) => setCurrentPage(page) } /> }
        </div>
    );
}

export default Reviews;