import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Col, FormGroup, Input, Label, Row } from "reactstrap";



import { selectValues as selectBrands, getAsync as getBrands } from '../../app/brandSlice';


const Filters = ({ onChange }) => {
    const brands = useSelector(selectBrands);
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({ text: '', brandId: [], activeOnly: false });

    useEffect(() => {
        dispatch(getBrands());
    }, []);


    useEffect(() => {
        onChange && onChange(filters);
    }, [filters]);

    const setBrand = (id) => {
        if(filters.brandId.find(x => x === id) === undefined) {
            setFilters({ ...filters, brandId: [...filters.brandId, id] });
        } else {
            setFilters({ ...filters, brandId: filters.brandId.filter(x => x != id) });
        }
    }

    return (
        <div className='ps-5 mt-3 text-white border-bottom border-light'>
            <Row>
                <div className='d-flex align-items-center'>
                    <p className="m-0">Назва</p>
                    <FormGroup  className="position-relative flex-grow-1 ms-3">
                        <Input name="search" placeholder="Шукати" type="search" onInput={ (e) => setFilters({ ...filters, text: e.target.value.toLowerCase() }) } />
                    </FormGroup>
                </div>
            </Row>
            <Row>
                <Col xs="12" sm="6" md="5" lg="4" xl="3">
                    { brands && brands.value && <div className="me-4">
                        <p className="m-0">Виробник</p>
                        <ButtonGroup vertical className="p-1 mb-2 d-flex justify-content-start me-0 overflow-auto" style={{ maxHeight: '7rem' }}>
                            { brands.value.map((item => 
                            <FormGroup key={ item.id } check className='flex-shrink-0'>
                                <Input type="checkbox" id={ `brand${item.id}` } className="pointer" onChange={ () => setBrand(item.id) } />
                                {' '}
                                <Label check for={ `brand${item.id}` }>{ item.value }</Label>
                            </FormGroup>)) }
                        </ButtonGroup>
                    </div> }
                </Col>
                <Col xs="12" sm="6" md="7" lg="8" xl="9">
                    <div className="me-4">
                        <FormGroup switch>
                            <Input id="activeOnly" type="switch" onChange={ () => setFilters({ ...filters, activeOnly: !filters.activeOnly }) } />
                            <Label check for="activeOnly">Тільки актуальні</Label>
                        </FormGroup>
                    </div> 
                </Col>
            </Row>         
        </div>
    );
}

export default Filters;