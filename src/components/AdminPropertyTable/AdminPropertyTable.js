
import AdminPropertyTableRow from './AdminPropertyTableRow';
import Pagination from '../Pagination';
import InfoModal from '../InfoModal';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import React from 'react';

import { Table, Spinner, UncontrolledTooltip, Input, Row, Col, FormFeedback, FormGroup, Label } from 'reactstrap';
import { FaPlus } from "react-icons/fa";
import PerPageSelect from '../PerPageSelect';


const AdminPropertyTable = ({ selectValues, selectStatus, title, get, update, create, remove }) => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [addMode, setAddMode] = useState(false);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [searchTxt, setSearchTxt] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [activeOnly, setActiveOnly] = useState(false);

    useEffect(() => {
        if(!get) {
            return;
        }
        dispatch(get(true));
        pages.splice(0, pages.length);
        pages.push(5);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
    }, []);

    useEffect(() => {
        if(values && values.value) {
            const items = activeOnly === true ? values.value.filter(item => item.isActive === true) : [...values.value];
            setItems(items);
            setCurrentPage(1);
        }
    }, [values]);

    useEffect(() => {
        setItemsPage(items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage));
    }, [currentPage, items, perPage]);


    useEffect(() => {
        if(values && values.value) {
            const items = activeOnly === true ? values.value.filter(item => item.isActive === true) : [...values.value];
            setItems(items.filter(i => i.value.toLowerCase().includes(searchTxt)));
            setCurrentPage(1);
        }
    }, [searchTxt, activeOnly]);

    const deleteItem = async (id) => {

        if(!id || !remove) {
            showError();
            return;
        }
        const res = await dispatch(remove(id));
        if(!res.payload) {
            showError();
            return;
        }

        if(res.payload.value === false) {
            showError(undefined, 'Рядок не знайдено у базі даних. Можливо його було видалено іншим користувачем');
            return;
        }

        if(get) {
            await dispatch(get(true));
        }
    }

    const restoreItem = async (item) => {

        if(!item || !update) {
            showError();
            return;
        }
        const res = await dispatch(update({ ...item, isActive: true }));
        if(!res.payload) {
            showError();
            return;
        }

        if(res.payload.value === false) {
            showError(undefined, 'Рядок не знайдено у базі даних. Можливо його було видалено іншим користувачем');
            return;
        }

        if(get) {
            await dispatch(get(true));
        }
    }

    const saveItem = async (item) => {
        setAddMode(false);

        if(!item) {
            showError();
            return;
        }

        if(!item.id) {
            if(!create) {
                showError();
                return;
            }

            const res = await dispatch(create(item));
            if(!res.payload || res.payload.status) {
                showError();
                return;
            }

            await dispatch(get(true));
        }
        else {
            if(!update) {
                showError();
                return;
            }

            const res = await dispatch(update(item));
            if(!res.payload || !res.payload) {
                showError();
                return;
            }

            if(get) {
                await dispatch(get(true));
            }
        }
    }

    const showError = (title, text) => {
        setInfoHeader(title ?? 'Інформація');
        setInfoText(text ?? 'Ой, щось пішло не так :( Спробуйте пізніше');
        setInfoModal(true);
    }

    const onError = (text) => {
        setInfoHeader('Інформація');
        setInfoText(text);
        setInfoModal(true);
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

        items.sort(comparator);

        setItems([...items]);

        for(const cell of e.target.parentNode.cells) {
            cell.classList.toggle('sorted', cell === e.target);
        }
    }

    return (
        <>
            <Table dark hover className="property-table__table table_sort">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row>
                        <Col>
                            { title }
                            <FaPlus id="property-table__caption__add" className="property-table__icon ms-2" onClick={ () => setAddMode(true) } />
                            <UncontrolledTooltip placement="right" target="property-table__caption__add">Додати нове значення</UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row className="pe-2">
                        <Col sm="6" xs="12">
                            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                        </Col>
                        <Col sm="6" xs="12">
                            <FormGroup  className="position-relative">
                                <Input name="search" placeholder="Шукати" type="search" value={ searchTxt } onInput={ (e) => setSearchTxt(e.target.value.toLowerCase()) } invalid={ items.length === 0 }  />
                                <FormFeedback tooltip className="text-white">{ 'Не знайдено :(' }</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='fs-6'>
                        <Col>
                            <FormGroup switch>
                                <Input id="activeOnly" type="switch" checked={ activeOnly } onChange={() => { setActiveOnly(!activeOnly); }} />
                                <Label for="activeOnly" check>Тільки актуальні</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr>
                        <th className='text-center'>№</th>
                        <th className="sortable" onClick={ (e) => sort(e, 'id') }>Id</th>
                        <th className="sortable" onClick={ (e) => sort(e, 'value') }>Значення</th>
                        <th className="sortable" onClick={ (e) => sort(e, 'isActive') }>Актуальне</th>
                        <th colSpan="3" className="text-center property-table__collapse__collapsed">Дії</th>
                        <th className='property-table__collapse__expanded'>Редагувати</th>
                        <th className='property-table__collapse__expanded'>Видалити</th>
                        <th className='property-table__collapse__expanded'>Відновити</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminPropertyTableRow className={ addMode ? '' : 'd-none' } onCancel={ () => setAddMode(false) } onAccept={ saveItem } onError={ onError } />
                    { itemsPage && itemsPage.map((item, idx) => 
                        item && <AdminPropertyTableRow key={ item.id } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } onDelete={ (id) => deleteItem(id) } onAccept={ saveItem } onError={ onError } onRestore={ restoreItem } />)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">
                            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                            <Pagination currentPage={ currentPage } hits={ items.length } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
        </>
    );
}

export default AdminPropertyTable;