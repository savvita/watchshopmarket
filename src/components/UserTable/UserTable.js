import UserTableRow from "./UserTableRow";

import { selectValues, selectStatus, getAsync, updateAsync, deleteAsync, restoreAsync } from '../../app/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { Col, Collapse, FormFeedback, FormGroup, Input, Navbar, NavbarToggler, Row, Spinner, Table } from "reactstrap";
import PerPageSelect from "../PerPageSelect";
import { useEffect, useState } from "react";
import InfoModal from "../InfoModal";
import Pagination from "../Pagination";
import Filters from "./Filters";

import tbl from '../../modules/sort'; 



const UserTable = () => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);
    const [itemsPage, setItemsPage] = useState([]);

    const [infoModal, setInfoModal] = useState(false);
    const [infoHeader, setInfoHeader] = useState('');
    const [infoText, setInfoText] = useState('');

    const [searchTxt, setSearchTxt] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [filters, setFilters] = useState({ user: '', roles: [], bans: [] });
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    useEffect(() => {
        dispatch(getAsync());
        pages.splice(0, pages.length);
        pages.push(10);
        pages.push(20);
        pages.push(50);
        setPages(pages);
    }, []);

    useEffect(() => {
        if(values && values.value) {
            setItems([...values.value]);
            setCurrentPage(1);
        }
    }, [values]);

    useEffect(() => {
        setItemsPage(items.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage));
    }, [currentPage, items, perPage]);


    useEffect(() => {
        if(values && values.value) {
            setFilters({ ...filters, user: searchTxt });
            setCurrentPage(1);
        }
    }, [searchTxt]);

    useEffect(() => {
        if(!values || !values.value) {
            return;
        }

        let w = values.value;
        if(filters.user) {
            w = w.filter( x => 
                x.userName && x.userName.toLowerCase().includes(filters.user.toLowerCase()));
        }

        if(filters.roles.length > 0) {
            if(filters.roles.includes(1)) {
                w = w.filter(x => x.isAdmin);
            }
            if(filters.roles.includes(2)) {
                w = w.filter(x => x.isManager);
            }
        }

        if(filters.bans.length > 0) {
            if(filters.bans.includes(true)) {
                w = w.filter(x => x.isActive === false);
            }
            if(filters.bans.includes(false)) {
                w = w.filter(x => x.isActive === true);
            }
        }

        setItems(w);
    }, [filters]);

    useEffect(() => {
        if(items.length > 0) {
            setCurrentPage(1);
        }
    }, [items]);

    const update = async(item) => {
        if(!item) {
            return;
        }

        const res = await dispatch(updateAsync(item));

        if(res && res.payload && res.payload.value) {
            dispatch(getAsync());
        }
        else {
            if(res && res.payload && res.payload.code === 'user-not-found') {
                setInfoHeader('Помилка');
                setInfoText('Користувача не знайдено');
                setInfoModal(true);
            }
            else {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
            }
        }
    }

    const banChanged = async(id, value) => {
        if(!id || value === undefined) {
            return;
        }
        let res;

        if(value === true) {
            res = await dispatch(deleteAsync(id));
        }
        else {
            res = await dispatch(restoreAsync(id));
        }

        if(res && res.payload && res.payload.value) {
            dispatch(getAsync());
        }
        else {
            if(res && res.payload && res.payload.code === 'user-not-found') {
                setInfoHeader('Помилка');
                setInfoText('Користувача не знайдено');
                setInfoModal(true);
            }
            else {
                setInfoHeader('Помилка');
                setInfoText('Щось пішло не так. Спробуйте пізніше');
                setInfoModal(true);
            }
        }
    }

    return (
        <>
            <Row>
                <Col sm="12" md="6">
                    <h2 className='property-table__caption ps-2 fs-3 text-white mt-3'>Користувачі</h2>
                </Col>
                <Col sm="12" md="6">
                    <FormGroup  className="position-relative mt-3">
                        <Input name="search" placeholder="Шукати" type="search" value={ searchTxt } onInput={ (e) => setSearchTxt(e.target.value.toLowerCase()) } invalid={ items.length === 0 }  />
                        <FormFeedback tooltip className="text-white">{ 'Не знайдено :(' }</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="12">
                    <Navbar color="faded" light className="mt-3">
                    <NavbarToggler onClick={ toggleNavbar } className="me-2 fs-6" style={{ backgroundColor: '#fff', padding: '5px 20px' }}>Фільтри</NavbarToggler>
                    <Collapse isOpen={ !collapsed } navbar >
                        <Filters onChange={ (items) => setFilters({...items, user: searchTxt }) } />
                    </Collapse>
                </Navbar>
                </Col>
            </Row>

            <Table dark hover className="property-table__table table_sort">
                <caption className='property-table__caption ps-2 fs-3'>
                    <Row className="pe-2">
                        <Col sm="6" xs="12">
                            <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                        </Col>
                    </Row>
                </caption>
                <thead>
                    <tr className="text-center fs-6">
                        <th scope="col" className='sortable' onClick={ tbl.sort }>№</th>
                        <th scope="col" className='sortable' onClick={ tbl.sort }>Логін</th>
                        <th scope="col" className='sortable' onClick={ tbl.sort }>Email</th>
                        <th scope="col" className='sortable' onClick={ tbl.sort }>Менеджер</th>
                        <th scope="col" className='sortable' onClick={ tbl.sort }>Адмін</th>
                        <th scope="col" className='sortable' onClick={ tbl.sort }>Заблоковано</th>
                    </tr>
                </thead>
                <tbody>
                    { itemsPage && itemsPage.map((item, idx) => 
                        item && <UserTableRow key={ item.id } idx={ (currentPage - 1) * perPage + idx + 1 } item={ item } onUpdate={ update } onBanChanged={ banChanged } />)
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

export default UserTable;