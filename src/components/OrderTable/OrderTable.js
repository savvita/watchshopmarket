

import { Collapse, Navbar, NavbarToggler, Spinner, Table } from 'reactstrap';
import OrderTableRow from './OrderTableRow';

import { useSelector, useDispatch } from 'react-redux';

import { selectValues, selectStatus, getAsync, cancelAsync, acceptAsync, getNewAsync } from '../../app/orderSlice';
import { selectValues as selectStatusses, getAsync as getStatusses } from '../../app/orderstatusSlice';

import { useEffect, useState } from 'react';
import InfoModal from '../InfoModal';
import PerPageSelect from '../PerPageSelect';
import Pagination from '../Pagination';
import Filters from './Filters';

const OrderTable = ({ isManagerMode, isUserMode, statusses }) => {
    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);

    const orderStatusses = useSelector(selectStatusses);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [errorTxt, setErrorTxt] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    const [filters, setFilters] = useState({ user: '', statusses: [], startDate: '', endDate: '' });

    const toggleNavbar = () => setCollapsed(!collapsed);

    const load = async () => {
        const request = {};
        if(isManagerMode && isManagerMode === true) {
            request.isManager = true;
        }

        if(isUserMode && isUserMode === true) {
            request.isUser = true;
        }

        if(statusses) {
            request.statusses = [...statusses];
        }
        await dispatch(getAsync(request));
    }

    useEffect(() => {
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);

        dispatch(getStatusses());
    }, []);

    useEffect(() => {
        if(values) {
            setItems([...values]);
            setCurrentPage(1);
        }
    }, [values]);

    useEffect(() => {
        if(!items) {
            return;
        }
        
        setItemsPage(items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage));
    }, [currentPage, items, perPage]);

    useEffect(() => {
        load();
    }, [isManagerMode, isUserMode, statusses]);

    useEffect(() => {
        let w = values;
        
        if(filters.user) {
            w = w.filter( x => 
                x.userId.includes(filters.user));
        }

        if(filters.startDate) {
            w = w.filter( x => x.date >= filters.startDate);
        }


        if(filters.endDate) {
            w = w.filter( x => x.date <= filters.endDate);
        }

        if(filters.statusses.length > 0) {
            w = w.filter(x => filters.statusses.includes(x.status.id));
        }

        setItems(w);
    }, [filters]);

    useEffect(() => {
        if(items.length === 0) {
            setErrorTxt('Нічого не знайдено :(');
        }
        else {
            setCurrentPage(1);
            setErrorTxt('');
        }
    }, [items]);

    const cancelOrder = async (id) => {
        if(!id) {
            return;
        }

        const res = await dispatch(cancelAsync(id));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            await load();
        }
    }

    const acceptOrder = async (id) => {
        if(!id) {
            return;
        }

        const res = await dispatch(acceptAsync(id));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            await load();
            await dispatch(getNewAsync());
        }
    }

    const sort = (e, prop) => {
        if(!prop) {
            return;
        }

        const order = (e.target.dataset.order = -(e.target.dataset.order || -1));

        const comparator = (a, b) => {
            if (a[prop] < b[prop] ){
                return -1 * order;
            }
            if (a[prop] > b[prop] ){
                return 1 * order;
            }
            return 0;
        }

        const statusComparator = (a, b) => {
            if(a.status === null) {
                return 1 * order;
            }
            if(b.status === null) {
                return -1 * order;
            }
            if (a.status.value < b.status.value ){
                return -1 * order;
            }
            if (a.status.value > b.status.value ){
                return 1 * order;
            }
            return 0;
        }

        items.sort(prop !== 'status' ? comparator : statusComparator);

        setItems([...items]);

        for(const cell of e.target.parentNode.cells) {
            cell.classList.toggle('sorted', cell === e.target);
        }
    }

    return (
        <div className="text-white flex-grow-1">
            <h2 className="text-center mt-4">Замовлення</h2>
            <Navbar color="faded" light>
                <NavbarToggler onClick={ toggleNavbar } className="me-2 fs-6" style={{ backgroundColor: '#fff', padding: '5px 20px' }}>Фільтри</NavbarToggler>
                <Collapse isOpen={ !collapsed } navbar >
                    <Filters isManagerMode={ isManagerMode } statusses={ orderStatusses } onChange={ (items) => setFilters({...items, user: filters.user }) } />
                </Collapse>
            </Navbar>

            <div className="text-white">
                <p>{ errorTxt }</p>
            </div>

            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
            <Table dark className='mt-4 table_sort'  style={{ width: '100%' }}>
                <thead>
                    <tr className="text-center">
                        <th scope="col">№</th>
                        <th scope="col" className='sortable' onClick={ (e) => sort(e, 'id') }>Id</th>
                        <th scope="col" className='sortable' onClick={ (e) => sort(e, 'date') }>Дата створення</th>
                        { isManagerMode ? <th scope="col" className='sortable' onClick={ (e) => sort(e, 'userId') }>Користувач</th> : <th className="m-0 p-0"></th> }
                        <th scope="col" className='sortable' onClick={ (e) => sort(e, 'status') }>Статус</th>
                        <th scope="col">Сума</th>
                        <th scope="col">Переглянути</th>
                        
                        { isUserMode ? <th scope="col">Скасувати</th> : <th className="m-0 p-0"></th> }
                        { !isManagerMode && !isUserMode && statusses && statusses.includes(1) ? <th scope="col">Прийняти</th> : <th className="m-0 p-0"></th>}
                    </tr>
                </thead>
                <tbody>
                    { itemsPage && itemsPage.map((x, i) => <OrderTableRow key={ x.id } idx={ i + 1 } item={ x } isUserMode={ isUserMode } isManagerMode={ isManagerMode } statusses={ statusses } onCancel={ cancelOrder } onAccept={ acceptOrder } />) }
                </tbody>
            </Table>
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) } title={ infoHeader } text={ infoText } />
                <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                { items && <Pagination currentPage={ currentPage } hits={ items.length } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } /> }
        </div>
    );
}

export default OrderTable;