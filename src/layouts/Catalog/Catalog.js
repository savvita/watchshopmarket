
import WatchContainer from '../../components/WatchContainer/WatchContainer';
import Pagination from '../../components/Pagination';
import PerPageSelect from '../../components/PerPageSelect';

import { Spinner, Row, Col, Button } from 'reactstrap';

import { selectValues, selectStatus, getAsync } from '../../app/watchSlice';
import { useSelector, useDispatch } from 'react-redux';

import { useState, useEffect } from 'react';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';

import './Catalog.css';

const Catalog = () => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [hits, setHits] = useState(0);

    const [filters, setFilters] = useState({});

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
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
        dispatch(getAsync({ ...filters, page: currentPage, perPage: perPage }));
    }, [currentPage, perPage]);

    useEffect(() => {
        if(currentPage !== 1) {
            setCurrentPage(1);
        }
        else {
            dispatch(getAsync({ ...filters, page: currentPage, perPage: perPage }));
        }
    }, [filters]);

    const filter = (filters) => {
        setFilters({ ...filters });
    }

    return (
        <div>
            <Row>
                <Button className="catalog__sidebar-offcanvas-btn" onClick={ () => setIsOpen(!isOpen) }>Фільтри</Button>
            </Row>
            <Row className="position-relative">
                <Col lg="3" sm="12"  className={ isOpen ? "catalog__sidebar-offcanvas catalog__sidebar-offcanvas__opened" : "catalog__sidebar-offcanvas" }>
                    <FilterSidebar onFilter={ filter } />
                </Col>
                <Col lg="9" sm="12">
                    <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } />
                    <WatchContainer items={ values.value } />
                    <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                    <Pagination currentPage={ currentPage } hits={ hits } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } />
                </Col>
            </Row>
        </div>
    );
}

export default Catalog;