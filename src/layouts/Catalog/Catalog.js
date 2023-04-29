
import WatchContainer from '../../components/WatchContainer/WatchContainer';
import Pagination from '../../components/Pagination';
import PerPageSelect from '../../components/PerPageSelect';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';

import { Spinner, Row, Col, Button, UncontrolledTooltip } from 'reactstrap';

import { selectValues, selectStatus, getAsync } from '../../app/watchSlice';
import { selectValue as selectFilters, set } from '../../app/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

import { useState, useEffect } from 'react';

import './Catalog.css';
import { FaRegWindowClose } from 'react-icons/fa';
import GoTop from '../../components/GoTop';

const Catalog = () => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    const [clear, setClear] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [pages, setPages] = useState([]);

    const [hits, setHits] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    
    const [filterText, setFilterText] = useState([]);

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
        dispatch(getAsync({ ...filters, page: currentPage, perPage: perPage, onSale: [ true ] }));
    }, [currentPage, perPage]);

    useEffect(() => {
        setClear(false);
        if(currentPage !== 1) {
            setCurrentPage(1);
        }
        else {
            dispatch(getAsync({ ...filters, page: currentPage, perPage: perPage, onSale: [ true ] }));
        }
    }, [filters]);

    const filter = async (selectedFilters, text) => {
        await dispatch(set({ ...filters, ...selectedFilters }));     

        filterText.splice(0, filterText.length);

        for(let key in text) {
            if(text[key].length > 0) {
                filterText.push(`${ key }: ${ text[key] }`)
            }
        }
        setFilterText(filterText);
    }

    const clearFilters = async () => {
        await dispatch(set({ }));     
        setFilterText([]);
        setClear(true);
    }

    return (

        <div className="pt-4">
            <Row>
                <Button className="catalog__sidebar-offcanvas-btn" onClick={ () => setIsOpen(!isOpen) }>Фільтри</Button>
            </Row>
            <Row className="position-relative">
                <Col lg="3" sm="12"  className={ isOpen ? "catalog__sidebar-offcanvas catalog__sidebar-offcanvas__opened" : "catalog__sidebar-offcanvas" }>
                    <h3 className="text-white">Фільтри</h3>
                    <FilterSidebar onFilter={ filter } clear={ clear } />
                </Col>
                <Col lg="9" sm="12">
                    { filterText.length > 0 &&
                        <div className="text-white">
                            <div className='d-flex align-items-center'>
                                <h5 className='mb-0'>Застосовані фільтри:</h5>
                                <div id='clear-filters-icon' className="d-inline-block overflow-hidden p-1 ms-2">
                                    <FaRegWindowClose className="property-table__icon"  onClick={ clearFilters } />
                                </div>
                                <UncontrolledTooltip placement="right" target='clear-filters-icon'>
                                    Очистити фільтри
                                </UncontrolledTooltip>
                            </div>
                            { filterText.map((item, idx) => <p key={ idx } className="m-1 border border-light rounded-5 p-2 ps-3 pe-3 d-inline-block">{ item }</p>) }
                        </div>
                    }
                    <div className="text-white d-flex justify-content-end mb-2">
                    <PerPageSelect values={ pages } onChange={ (idx) => setPerPage(pages[idx]) } /></div>
                    <WatchContainer items={ values.value } />
                    <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
                    { values.hits > 0 ? 
                        <Pagination currentPage={ currentPage } hits={ hits } perPage={ perPage } className={ status !== 'idle' && 'd-none' } onPageChanged={ (page) => setCurrentPage(page) } /> 
                        :
                        <p className="text-white text-center fs-4">{ 'Не знайдено :(' }</p>
                    }
                </Col>
            </Row>
                <GoTop />
        </div>
    );
}

export default Catalog;