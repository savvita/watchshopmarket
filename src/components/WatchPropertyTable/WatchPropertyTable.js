import tbl from '../../modules/sort'; 

import WatchPropertyTableRow from './WatchPropertyTableRow';
import Pagination from '../Pagination';
import ConfirmDeletingModal from '../ConfirmDeletingModal';
import InfoModal from '../InfoModal';
import WatchForm from '../WatchForm/WatchForm';

import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import React from 'react';

import { Table, Spinner, UncontrolledTooltip, Input, Row, Col, FormFeedback, FormGroup } from 'reactstrap';
import { FaPlus } from "react-icons/fa";
import PerPageSelect from '../PerPageSelect';


const WatchPropertyTable = ({ selectValues, selectStatus, title, get, getValueById, update, create, remove, saveFiles }) => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [addMode, setAddMode] = useState(false);

    const [modal, setModal] = useState(false);
    const [watchModal, setWatchModal] = useState(false);
    const [item, setItem] = useState({});

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [searchTxt, setSearchTxt] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [hits, setHits] = useState(0);

    useEffect(() => {
        if(!get) {
            return;
        }
        dispatch(get({ page: 1, perPage: perPage }));
        pages.splice(0, pages.length);
        pages.push(5);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
    }, []);

    useEffect(() => {
        if(values) {
            setHits(values.hits);
        }
    }, [values]);

    useEffect(() => {
        dispatch(get({ page: currentPage, perPage: perPage }));
    }, [currentPage, perPage]);



    // useEffect(() => {
    //     if(values && values.value) {
    //         setItems(values.value.filter(i => i.value.toLowerCase().includes(searchTxt)));
    //         setCurrentPage(1);
    //     }
    // }, [searchTxt]);

    const deleteItem = async () => {
        setModal(false);

        if(!item || !remove) {
            showError();
            return;
        }
        const res = await dispatch(remove(item.id));
        if(!res.payload) {
            showError();
            return;
        }

        if(res.payload.value === false) {
            showError(undefined, 'Рядок не знайдено у базі даних. Можливо її було видалено іншим користувачем');
            return;
        }

        if(get) {
            await dispatch(get());
        }
    }

    const saveItem = async (item, files) => {
        setAddMode(false);

        if(!item) {
            showError();
            return;
        }

        if(!item.id) {
            if(!create || !saveFiles) {
                showError();
                return;
            }

            if(files) {
                const filesRes = await saveFiles(files);
                if(!filesRes) {
                    showError();
                    return;
                }

                if(filesRes.value) {
                    item.images = filesRes.value.map(item => { return { value: item } });
                }

            }
            const res = await dispatch(create(item));
            if(!res.payload || res.payload.status) {
                showError();
                return;
            }

            await dispatch(get());
        }
        else {
            //TODO add update handling
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
                await dispatch(get({ page: 1, perPage: perPage }));
            }
        }
    }

    const showCofirmModal = (item) => {
        if(!item) {
            showError();

            return;
        }

        setItem(item);
        setModal(true);
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

    const editItem = async (id) => {
        if(!getValueById) {
            return;
        }
        const res = await dispatch(getValueById(id));

        if(!res || !res.payload || !res.payload.value) {
            showError();
            return;
        }
        
        setItem(res.payload.value);
        setWatchModal(true);
    }

    return (
        <>
            <Table dark hover className="property-table__table table_sort watch-table__table">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row>
                        <Col>
                            { title }
                            <FaPlus id="property-table__caption__add" className="property-table__icon ms-2" onClick={ () => setWatchModal(true) } />
                            <UncontrolledTooltip placement="right" target="property-table__caption__add">Додати нове значення</UncontrolledTooltip>
                        </Col>
                    </Row>
                    <Row className="pe-2">
                        <Col sm="6" xs="12">
                            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                        </Col>
                        <Col sm="6" xs="12">
                            <FormGroup  className="position-relative">
                                <Input name="search" placeholder="Search" type="search" value={ searchTxt } onInput={ (e) => setSearchTxt(e.target.value.toLowerCase()) } invalid={ hits === 0 }  />
                                <FormFeedback tooltip className="text-white">{ 'Не знайдено :(' }</FormFeedback>
                            </FormGroup>
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr>
                        <th className='text-center sortable' onClick={ tbl.sort }>№</th>
                        <th className="sortable" onClick={ tbl.sort }>Id</th>
                        <th className="sortable" onClick={ tbl.sort }>Назва</th>
                        <th className="sortable" onClick={ tbl.sort }>Модель</th>
                        <th className="sortable" onClick={ tbl.sort }>Ціна</th>
                        <th className="sortable" onClick={ tbl.sort }>Знижка(%)</th>
                        <th>В&nbsp;наявності</th>
                        <th>В&nbsp;продажі</th>
                        <th>TOP</th>
                        <th colSpan="3" className="text-center property-table__collapse__collapsed">Дії</th>
                        <th className='property-table__collapse__expanded'>Переглянути</th>
                        <th className='property-table__collapse__expanded'>Редагувати</th>
                    </tr>
                </thead>
                <tbody>
                    { values && values.value && values.value.map((item, idx) => 
                        item && <WatchPropertyTableRow key={ item.id } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } onDelete={ (item) => showCofirmModal(item) } onEdit={ editItem } />)
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="11">
                            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                            <Pagination currentPage={ currentPage } hits={ hits } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
                        </td>
                    </tr>
                </tfoot>
            </Table>
            <ConfirmDeletingModal isOpen={ modal } onCancel={ () => setModal(false) } onAccept={ () => deleteItem() } item={ item } />
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
            <WatchForm isOpen={ watchModal } item={ item } onCancel={ () => setWatchModal(false) } onAccept={ saveItem } />
        </>
    );
}

export default WatchPropertyTable;