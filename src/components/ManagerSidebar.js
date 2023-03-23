
import Collapse from './Collapse/Collapse';

import { useSelector, useDispatch } from 'react-redux';

import { selectNewOrders, getNewAsync } from '../app/orderSlice';
import { useEffect } from 'react';

const ManagerSidebar = () => {
    const values = useSelector(selectNewOrders);
    const dispatch = useDispatch();

    const orders = [
        { 
            heading: 'Нові замовлення',
            link: 'orders/new',
            badge: values ? values.length : null
        },
        { 
            heading: 'Мої замовлення',
            link: 'orders'
        }
    ];

    useEffect(() => {
        dispatch(getNewAsync());
    }, []);


    const properties = [
        {
            heading: 'Водозахист',
            link: 'waterresistance'
        },
        {
            heading: 'Стиль',
            link: 'style'
        },
        {
            heading: 'Форма корпусу',
            link: 'caseshape'
        },
        {
            heading: 'Колекція',
            link: 'collection'
        },
        {
            heading: 'Колір',
            link: 'color'
        },
        {
            heading: 'Країна',
            link: 'country'
        },
        {
            heading: 'Вид циферблату',
            link: 'dialtype'
        },
        {
            heading: 'Функції',
            link: 'function'
        },
        {
            heading: 'Стать',
            link: 'gender'
        },
        {
            heading: 'Скло',
            link: 'glasstype'
        },
        {
            heading: 'Інкрустація',
            link: 'incrustationtype'
        },
        {
            heading: 'Матеріал',
            link: 'material'
        },
        {
            heading: 'Тип механізму',
            link: 'movementtype'
        },
        {
            heading: 'Браслет/ремінець',
            link: 'straptype'
        },
        {
            heading: 'Виробник',
            link: 'brand'
        }
    ].sort((a, b) => a.heading.localeCompare(b.heading));

    const articles = [
        { 
            heading: 'Годинники',
            link: 'watch' 
        }
    ];

    return (
        <div className='d-flex flex-column'>
            <Collapse heading='Характеристики' items={ properties } />
            <Collapse heading='Товари' items={ articles } />
            <Collapse heading='Замовлення' items={ orders } />
        </div>
    );
}

export default ManagerSidebar;