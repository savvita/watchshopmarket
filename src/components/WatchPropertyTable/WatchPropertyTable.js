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


const WatchPropertyTable = ({ selectValues, selectCurrent, selectStatus, title, get, getValueById, setCurrent, update, create, remove, restore, saveFiles }) => {
    const values = useSelector(selectValues);
    const current = useSelector(selectCurrent);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [watchModal, setWatchModal] = useState(false);

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
        if(!get) {
            return;
        }

        dispatch(get({ page: currentPage, perPage: perPage }));
    }, [currentPage, perPage]);



    // useEffect(() => {
    //     if(values && values.value) {
    //         setItems(values.value.filter(i => i.value.toLowerCase().includes(searchTxt)));
    //         setCurrentPage(1);
    //     }
    // }, [searchTxt]);

     const deleteItem = async () => {
    //     setModal(false);

    //     if(!item || !remove) {
    //         showError();
    //         return;
    //     }
    //     const res = await dispatch(remove(item.id));
    //     if(!res.payload) {
    //         showError();
    //         return;
    //     }

    //     if(res.payload.value === false) {
    //         showError(undefined, 'Рядок не знайдено у базі даних. Можливо її було видалено іншим користувачем');
    //         return;
    //     }

    //     if(get) {
    //         await dispatch(get());
    //     }
     }

     const createItem = async (item, files) => {
        if(!create) {
            showError();
            return;
        }

        const watch = { ...item };
        if(files && files.length > 0 && saveFiles) {
            const filesRes = await saveFiles(files);
            if(!filesRes) {
                showError();
                return;
            }

            if(filesRes.value) {
                watch.images = filesRes.value.map(item => { return { value: item } });
            }
        }

        const res = await dispatch(create(watch));
        if(!res.payload || res.payload.status) {
            showError();
            return;
        }
     }

     const updateItem = async (item, files) => {

        if(!update) {
            showError();
            return;
        }

        const watch = { ...item };

        if(files && files.length > 0 && saveFiles) {
            const filesRes = await saveFiles(files);
            if(!filesRes) {
                showError();
                return;
            }

            if(filesRes.value) {
                if(item.images) {
                    watch.images = item.images.filter(img => !img.file);
                }
                else {
                    watch.images = [];
                }
                watch.images.push(filesRes.value.map(item => { return { value: item } }));
            }
        }

        const res = await dispatch(update(watch));

        if(!res.payload || !res.payload) {
            showError();
            return;
        }

        if(res.payload.status >= 400) {
            showError();
            return;
        }

        if(res.payload.value) {
            if(res.payload.value.code === 404) {
                showError("Помилка", "Запис було видалено іншим користувачем");
                return;
            }

            if(res.payload.value.code === 409) {
                showError("Помилка", "Запис було змінено іншим користувачем");
                return;
            }
        }
     }

     const saveItem = async (item, files) => {
        if(!item) {
            showError();
            return;
        }

        if(!item.id) {
            await createItem(item, files);
        }
        else {
           await updateItem(item, files);
        }

        setWatchModal(false);
        await dispatch(get({ page: currentPage, perPage: perPage }));
        dispatch(setCurrent(null));
     }

    const onOnSaleChange = async (id, value) => {
        if(value === true && restore) {
            const res = await dispatch(restore(id));
            if(!res || !res.payload) {
                return false;
            }
            return res.payload.value;
        }

        if(value === false && remove) {
            const res = await dispatch(remove(id));
            if(!res || !res.payload) {
                return false;
            }
            return res.payload.value;
        }
    }

    const onIsTopChange = async (id, value) => {
        if(!getValueById || !update) {
            return;
        }

        const watchSelector = await dispatch(getValueById(id));

        if(!watchSelector || !watchSelector.payload || !watchSelector.payload.value) {
            showError();
            return false;
        }

        const res = await dispatch(update({ ...watchSelector.payload.value, isTop: value }));
        if(!res || !res.payload) {
            showError();
            return false;
        }

        if(res.payload.value) {
            if(res.payload.value.code === 404) {
                showError("Помилка", "Запис було видалено іншим користувачем");
                return false;
            }

            if(res.payload.value.code === 409) {
                showError("Помилка", "Запис було змінено іншим користувачем");
                return false;
            }
        }

        return true;
    }

    const showError = (title, text) => {
        setInfoHeader(title ?? 'Інформація');
        setInfoText(text ?? 'Ой, щось пішло не так :( Спробуйте пізніше');
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
        
        setWatchModal(true);
     }

     const onCancel = () => {
        dispatch(setCurrent(null));
        setWatchModal(false);
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
                        item && <WatchPropertyTableRow key={ item.id } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } onEdit={ editItem } onOnSaleChange={ onOnSaleChange } onIsTopChange={ onIsTopChange } />)
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
            <ConfirmDeletingModal isOpen={ modal } onCancel={ () => setModal(false) } onAccept={ () => deleteItem() } item={ current } />
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
            <WatchForm isOpen={ watchModal } item={ current } onCancel={ onCancel } onAccept={ saveItem } setItem={ setCurrent } />
        </>
    );
}

export default WatchPropertyTable;