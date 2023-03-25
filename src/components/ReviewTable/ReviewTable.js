import { Col, Row, Spinner, Table } from "reactstrap";
import Pagination from "../Pagination";
import ReviewTableRow from "./ReviewTableRow";

import { getAllAsync, selectValues, selectStatus, updateAsync, deleteAsync } from '../../app/reviewSlice';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import InfoModal from "../InfoModal";

import tbl from '../../modules/sort';
import PerPageSelect from "../PerPageSelect";



const ReviewTable = () => {

    const items = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [values, setValues] = useState([]);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [hits, setHits] = useState(0);

    useEffect(() => {
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);

        dispatch(getAllAsync(false));
    }, []);

    useEffect(() => {
        if(items && items.value) {
            setHits(items.hits);
            setValues(items.value.slice((currentPage - 1) * perPage, currentPage * perPage));
        }
    }, [items]);

    useEffect(() => {
        if(items && items.value) {
            setValues(items.value.slice((currentPage - 1) * perPage, currentPage * perPage));
        }
    }, [currentPage, perPage]);

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

    const remove = async (item) => {
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
            dispatch(getAllAsync(false));
        }
    }

    return (
        <>
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
                        <th className='text-center sortable' onClick={ tbl.sort }>№</th>
                        <th className="sortable" onClick={ tbl.sort }>Username</th>
                        <th className="sortable" onClick={ tbl.sort }>Дата</th>
                        <th className="sortable">Текст</th>
                        <th>Товар</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { values && values.map((item, i) => 
                        item && <ReviewTableRow key={ item.id } idx={ (currentPage - 1) * perPage + i + 1 } item={ item } onCheck={ accept } onDelete={ remove } />)
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
        </>
    );
}

export default ReviewTable;