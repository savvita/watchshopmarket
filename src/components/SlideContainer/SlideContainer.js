import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FormGroup, Input, Label, Spinner, UncontrolledTooltip } from "reactstrap";
import Pagination from "../Pagination";
import PerPageSelect from "../PerPageSelect";
import SlideCard from "./SlideCard";


import { selectValues, selectStatus, getAllAsync, createAsync, updateAsync } from '../../app/slideSlice';
import InfoModal from "../InfoModal";
import { useDispatch, useSelector } from "react-redux";
import SlideForm from "./SlideForm";

import db from '../../db/db_access';



const SlideContainer = () => {
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

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [item, setItem] = useState(null);

    const [formModal, setFormModal] = useState(false);

    const [activeOnly, setActiveOnly] = useState(false);

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

        let filtered = [...values];

        if(activeOnly === true) {
            filtered = values.filter(x => x.isActive === true);
        }

        setItems(filtered);
    }, [activeOnly]);

    const cancel = () => {
        setItem(null);
        setFormModal(false);
    }

    const saveItem = async (item) => {
        setFormModal(false);
        setItem(null);
        if(!item) {
            return;
        }

        if(item && item.imageUrl && item.imageUrl.file) {
            const filesRes = await db.Files.upload([item.imageUrl.file]);
            if(!filesRes) {
                showError();
                return;
            }

            if(filesRes.value) {
                item.imageUrl = filesRes.value[0];
            }
        }

        const res = await dispatch(createAsync(item));

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

    const update = async (item) => {
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

    const showError = (title, text) => {
        setInfoHeader(title ?? 'Інформація');
        setInfoText(text ?? 'Ой, щось пішло не так :( Спробуйте пізніше');
        setInfoModal(true);
    }

    return (
        <div className="text-white">
            <div className='d-flex align-items-baseline mt-4'>
                <h2 className="text-center m-0 text-white">Слайди</h2>
                <FaPlus id="property-table__caption__add" className="property-table__icon ms-2" onClick={ () => setFormModal(true) } />
                <UncontrolledTooltip placement="right" target="property-table__caption__add">Додати новий слайд</UncontrolledTooltip>     
            </div>
            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
            <FormGroup switch className="mt-2">
                <Input type="switch" value={ activeOnly } onChange={ () => setActiveOnly(!activeOnly) } />
                <Label check>Тільки опубліковані</Label>
            </FormGroup>
            <div className="d-flex justify-content-center flex-wrap">
            { 
                itemsPage &&itemsPage.map((item, i) => 
                    item && <SlideCard key={ item.id } item={ item } onUpdate={ update } />)
            }
            </div>
            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
            <div className="mt-5">
                <p>{ errorTxt }</p>
            </div>
            <Pagination currentPage={ currentPage } hits={ hits } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
            <InfoModal isOpen={ infoModal } onAccept={ () => setInfoModal(false) }  text={ infoText } title={ infoHeader } />
            <SlideForm isOpen={ formModal } item={ item } onCancel={ cancel } onAccept={ saveItem } />
        </div>
    );
}

export default SlideContainer;