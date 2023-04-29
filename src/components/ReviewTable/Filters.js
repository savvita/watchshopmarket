import { Input, FormGroup, Label, ButtonGroup, Row, Col } from 'reactstrap';
import { useEffect, useState } from 'react';

const Filters = ({ isManagerMode, statusses, onChange }) => {

    const [filters, setFilters] = useState({ statusses: [], startDate: '', endDate: '', text: '' });

    const changeStatuses = (id) => {
        if(filters.statusses.find(x => x === id)) {
            setFilters({...filters, statusses: filters.statusses.filter(x => x !== id )});
        }
        else {
            setFilters({...filters, statusses: [...filters.statusses, id] });
        }
    }

    const setStartDate = (date) => {
        setFilters({...filters, startDate: date});
    }

    const setEndDate = (date) => {
        setFilters({...filters, endDate: date});
    }

    useEffect(() => {
        onChange && onChange(filters);
    }, [filters]);

    return (
        <div className='ps-5 mt-3 text-white d-flex flex-column border-bottom border-light'>
            <Row>
                <div className='me-4'>
                    <FormGroup  className="position-relative">
                        <Input name="search" placeholder="Шукати у тексті" type="search" onInput={ (e) => setFilters({ ...filters, text: e.target.value.toLowerCase() }) } />
                    </FormGroup>
                </div>
            </Row>
            <Row>
                <Col sm="6">

                    <Row>
                        <div className="me-4">
                            <p className="m-0">Початкова дата</p>
                            <FormGroup>
                                <Input name="date" type="date" onChange={ (e) => setStartDate(e.target.value) } />
                            </FormGroup>
                        </div>
                        <div className="me-4">
                            <p className="m-0">Кінцева дата</p>
                            <FormGroup>
                                <Input name="date" type="date" onChange={ (e) => setEndDate(e.target.value) } />
                            </FormGroup>
                        </div>
                    </Row>
                </Col>
                { isManagerMode !== true && 
                <Col sm="6">
                    <div className="me-4 ms-4">
                        <p className="m-0">Статус</p>
                        <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                            { 
                                statusses && statusses.map(item => 
                                    <FormGroup key={ item.id } check className="pointer">
                                        <Input type="checkbox" id={ `status${item.id}` } className="pointer" onChange={ () => changeStatuses(item.id) } />
                                        {' '}
                                        <Label check for={ `status${item.id}` } className="pointer">
                                            { item.value }
                                        </Label>
                                    </FormGroup>
                                ) 
                            }
                        </ButtonGroup>
                    </div>
                </Col> }
            </Row>
            
        </div>
    );
}

export default Filters;