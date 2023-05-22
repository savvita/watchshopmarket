

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, Row, Col, Spinner, Table, UncontrolledTooltip, Tooltip } from 'reactstrap';
import { getAllAsync, createAsync, updateAsync, selectValues, selectStatus } from '../../app/promotionSlice';
import PerPageSelect from '../PerPageSelect';
import Filters from './Filters';
import PromotionTableRow from './PromotionTableRow';

import Pagination from '../Pagination';
import InfoModal from '../InfoModal';
import PromotionForm from './PromotionForm';
import { FaInfoCircle, FaPlus } from 'react-icons/fa';

import './PromotionTable.css';

const PromotionTable = () => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);
    const [hits, setHits] = useState(0);

    const [errorTxt, setErrorTxt] = useState([]);
    const [collapsed, setCollapsed] = useState(true);
    const [filters, setFilters] = useState({ text: '', brandId: [], activeOnly: false });
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [formModal, setFormModal] = useState(false);

    const [item, setItem] = useState(null);

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    useEffect(() => {
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
        dispatch(getAllAsync());
    }, []);

    useEffect(() => {
        if(values) {
            setItems([...values]);
            setHits(values.length);
            setCurrentPage(1);
        }
    }, [values]);

    useEffect(() => {
        if(items.length > 0) {
            setItemsPage(items.slice((currentPage - 1) * perPage, currentPage * perPage));
            setErrorTxt("");
        } else {
            setItemsPage([]);
            setErrorTxt("Нічого не знайдено :(");
        }
    }, [currentPage, perPage, items]);

    useEffect(() => {
        if(!values) {
            return;
        } 
        let filtered = [ ...values ];
        
        if(filters.text) {
            filtered = filtered.filter( x => 
                x.title.toLowerCase().includes(filters.text));
        }

        if(filters.brandId && filters.brandId.length > 0) {
            filtered = filtered.filter( x => x.brand && filters.brandId.find(y => y === x.brand.id) !== undefined);
        }

        if(filters.activeOnly === true) {
            filtered = filtered.filter(x => x.isActive === true);
        }

        setItems(filtered);
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

        const brandComparator = (a, b) => {
            if(a.brand === null) {
                return 1 * order;
            }
            if(b.brand === null) {
                return -1 * order;
            }
            if (a.brand.value < b.brand.value ){
                return -1 * order;
            }
            if (a.brand.value > b.brand.value ){
                return 1 * order;
            }
            return 0;
        }

        items.sort(prop !== 'brand' ? comparator : brandComparator);

        setItems([...items]);

        for(const cell of e.target.parentNode.cells) {
            cell.classList.toggle('sorted', cell === e.target);
        }
    }

    const showPromotionForm = (item) => {
        setItem({ ...item });
        setFormModal(true);
    }

    const saveItem = async (item) => {
        setFormModal(false);
        setItem(null);
        if(!item) {
            return;
        }
        
        let res = null;
        if(item.id && item.id !== 0) {
            const newItem = { ...item, description: item.description === '' ? null : item.description }
            res = await dispatch(updateAsync(newItem));
        }
        else {
            const updatedItem = { ...item, description: item.description === '' ? null : item.description }
            res = await dispatch(createAsync(updatedItem));
        }

        if(!res || !res.payload || !res.payload.value) {
            setInfoHeader('Помилка');
            setInfoText('Щось пішло не так. Спробуйте пізніше');
            setInfoModal(true);
        }
        else {
            if(res.payload.value) {
                if(res.payload.value.code === 404) {
                    setInfoHeader('Помилка');
                    setInfoText('Запис було видалено іншим користувачем');
                    setInfoModal(true);
                }
    
                if(res.payload.value.code === 409) {
                    setInfoHeader('Помилка');
                    setInfoText('Запис було змінено іншим користувачем');
                    setInfoModal(true);
                }
            }

            dispatch(getAllAsync());
        }
    }

    const cancel = () => {
        setItem(null);
        setFormModal(false);
    }

    return (
        <div>
            <div className='d-flex align-items-baseline mt-4'>
                <h2 className="text-center m-0 text-white">Акції</h2>
                <FaPlus id="property-table__caption__add" className="property-table__icon ms-2" onClick={ () => setFormModal(true) } />
                <UncontrolledTooltip placement="right" target="property-table__caption__add">Додати нову акцію</UncontrolledTooltip>
                <FaInfoCircle id="promotionRules" className="property-table__icon ms-2" />
                <Tooltip isOpen={ tooltipOpen } target="promotionRules" toggle={ toggleTooltip } placement="right" style={{ width: '40rem' }}>
                    <h4>Правила застосування знижок</h4>
                    <ol>
                        <li>Якщо не вказано виробника, знижка встановлються для всіх товарів. Всі інші акції стають неактуальними</li>
                        <li>Якщо вказано виробника, знижка встановлються для всіх товарів даного виробника. Всі інші акції для цього виробника стають неактуальними</li>
                        <li>При сказуванні акції скасовуються всі знижки на товари, які були задіяні в цій акції</li>
                    </ol>
                </Tooltip>
                
            </div>
            <Navbar color="faded" light>
                <NavbarToggler onClick={ toggleNavbar } className="me-2 fs-6" style={{ backgroundColor: '#fff', padding: '5px 20px' }}>Фільтри</NavbarToggler>
                <Collapse isOpen={ !collapsed } navbar >
                    <Filters onChange={ (items) => setFilters({...items }) } />
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
                        <th className='sortable' style={{ width: '100%' }} onClick={ (e) => sort(e, 'title') }>Назва</th>
                        <th className="sortable" onClick={ (e) => sort(e, 'brand') }>Виробник</th>
                        <th className="text-nowrap sortable" onClick={ (e) => sort(e, 'discountValue') }>Знижка (%)</th>
                        <th className="sortable" onClick={ (e) => sort(e, 'isActive') }>Актуальна</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {itemsPage &&itemsPage.map((item, i) => 
                        item && <PromotionTableRow key={ item.id } idx={ (currentPage - 1) * perPage + i + 1 } item={ item } onEdit={ showPromotionForm } onChange={ saveItem } />)
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
            <PromotionForm isOpen={ formModal } item={ item } onAccept={ saveItem } onCancel={ cancel } />
        </div>
    );
}

export default PromotionTable;