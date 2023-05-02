import { Col, Collapse, Navbar, NavbarToggler, Row, Spinner, Table } from "reactstrap";
import Pagination from "../Pagination";
import ReviewTableRow from "./ReviewTableRow";

import { getAllAsync, selectValues, selectStatus, updateAsync, deleteAsync, getByUserAsync } from '../../app/reviewSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InfoModal from "../InfoModal";

import PerPageSelect from "../PerPageSelect";
import ConfirmDeletingModal from "./ConfirmDeletingModal";
import Filters from "./Filters";



const ReviewTable = ({ isManagerMode }) => {

    const items = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [values, setValues] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [hits, setHits] = useState(0);

    const [modal, setModal] = useState(false);
    const [item, setItem] = useState({});

    const reviewStatusses = [
        {
            id: 1,
            value: 'Очікує розгляду'
        },
        {
            id: 2,
            value: 'Розглянуто'
        }
    ];

    const [errorTxt, setErrorTxt] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    const [filters, setFilters] = useState({ text: '', statusses: [], startDate: '', endDate: '' });

    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);

        if(isManagerMode === true) {
            dispatch(getAllAsync(false));
        }
        else {
            dispatch(getByUserAsync());
        }
    }, [isManagerMode]);

    useEffect(() => {
        if(items && items.value) {
            setCurrentPage(1);
            setHits(items.hits);
            setValues([...items.value]);
        }
    }, [items]);

    useEffect(() => {
        if(values.length > 0) {
            setItemsPage(values.slice((currentPage - 1) * perPage, currentPage * perPage));
            setErrorTxt("");
        } else {
            setItemsPage([]);
            setErrorTxt("Нічого не знайдено :(");
        }
    }, [currentPage, perPage, values]);

    const accept = async(item) => {
        if(!item) {
            return;
        }

        const res = await dispatch(updateAsync({ ...item, checked: true }));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            dispatch(getAllAsync(false));
        }
    }

    const showCofirmModal = (item) => {
        if(!item) {
            return;
        }

        setItem(item);
        setModal(true);
    }

    const remove = async (item) => {
        setModal(false);
        if(!item) {
            return;
        }

        const res = await dispatch(deleteAsync(item.id));
        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            if(isManagerMode === true) {
                dispatch(getAllAsync(false));
            }
            else {
                dispatch(getByUserAsync());
            }
        }
    }

    const update = async(item) => {

        if(!item) {
            return;
        }

        const res = await dispatch(updateAsync(item));

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            dispatch(getByUserAsync());
        }
    }

    
    useEffect(() => {
        if(!items || !items.value) {
            return;
        } 
        let w = items.value;
        
        if(filters.text) {
            w = w.filter( x => 
                x.text.includes(filters.text));
        }

        if(filters.startDate) {
            w = w.filter( x => x.date >= filters.startDate);
        }


        if(filters.endDate) {
            w = w.filter( x => x.date <= filters.endDate);
        }

        if(filters.statusses.length > 0) {
            const isWaiting = filters.statusses.includes(1);
            const isChecked = filters.statusses.includes(2);

            w = w.filter(x => {
                let res;
                if(isWaiting ^ isChecked) {
                    res = x.checked === isChecked;
                } else {
                    res = true;
                }

                return res;
            });
        }

        setValues(w);
    }, [filters]);

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

        values.sort(comparator);

        setValues([...values]);

        for(const cell of e.target.parentNode.cells) {
            cell.classList.toggle('sorted', cell === e.target);
        }
    }

    return (
        <>
            <h2 className="text-center mt-4 text-white">Відгуки</h2>
            <Navbar color="faded" light>
                <NavbarToggler onClick={ toggleNavbar } className="me-2 fs-6" style={{ backgroundColor: '#fff', padding: '5px 20px' }}>Фільтри</NavbarToggler>
                <Collapse isOpen={ !collapsed } navbar >
                    <Filters isManagerMode={ isManagerMode } statusses={ reviewStatusses } onChange={ (items) => setFilters({...items }) } />
                </Collapse>
            </Navbar>

            <div className="text-white">
                <p>{ errorTxt }</p>
            </div>
            <Table dark hover className="property-table__table table_sort watch-table__table">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row className="pe-2">
                        <Col>
                            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr>
                        <th className='text-center'>№</th>
                        { isManagerMode === true && <th className="sortable" onClick={ (e) => sort(e, 'userName') }>Username</th> }
                        <th className="sortable" onClick={ (e) => sort(e, 'date') }>Дата</th>
                        <th className="sortable" onClick={ (e) => sort(e, 'text') }>Текст</th>
                        <th>Товар</th>
                        { isManagerMode !== true && <th>Статус</th>}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {itemsPage &&itemsPage.map((item, i) => 
                        item && <ReviewTableRow key={ item.id } idx={ (currentPage - 1) * perPage + i + 1 } item={ item } onCheck={ accept } onDelete={ showCofirmModal } isManagerMode={ isManagerMode } onUpdate={ update } />)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">
                            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                            <Pagination currentPage={ currentPage } hits={ hits } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
            <ConfirmDeletingModal isOpen={ modal } onCancel={ () => setModal(false) } onAccept={ () => remove(item) } />
        </>
    );
}

export default ReviewTable;