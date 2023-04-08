import { Input, FormGroup, Label, ButtonGroup, Row, Col } from 'reactstrap';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Filters = ({ onChange }) => {

    const roles = [
        {
            id: 1,
            title: "Адміністратор",
            value: "admin"
        },
        {
            id: 2,
            title: "Менеджер",
            value: "manager"
        }
    ];

    const [filters, setFilters] = useState({ roles: [], bans: [] });

    const changeRoles = (id) => {
        if(filters.roles.includes(id)) {
            setFilters({ ...filters, roles: filters.roles.filter(x => x !== id) });
        }
        else {
            setFilters({ ...filters, roles: [...filters.roles, id] });
        }
    }

    const changeBans = (ban) => {
        if(filters.bans.includes(ban)) {
            setFilters({ ...filters, bans: filters.bans.filter(x => x !== ban) });
        }
        else {
            setFilters({ ...filters, bans: [...filters.bans, ban] });
        }
    }

    useEffect(() => {
        onChange && onChange(filters);
    }, [filters]);

    return (
        <div className='ps-5 mt-3 text-white d-flex justify-content-start border-bottom border-light'>
            <Row>
                {/* <Col sm="6">
                    <Row>
                        <div className='me-4'>
                            <p className="m-0">Користувач</p>
                            <FormGroup  className="position-relative">
                                <Input name="search" placeholder="Шукати" type="search" onInput={ (e) => setFilters({ ...filters, user: e.target.value.toLowerCase() }) } />
                            </FormGroup>
                        </div> 
                    </Row>
                </Col> */}
                <Col sm="6">
                    <div className="me-4 ms-4">
                        <p className="m-0">Права</p>
                        <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                            { 
                                roles.map(item => 
                                    <FormGroup key={ item.id } check className="pointer">
                                        <Input type="checkbox" id={ `role${item.id}` } className="pointer" onChange={ () => changeRoles(item.id) } />
                                        {' '}
                                        <Label check for={ `role${item.id}` } className="pointer">
                                            { item.title }
                                        </Label>
                                    </FormGroup>
                                ) 
                            }
                        </ButtonGroup>
                    </div>
                </Col>
                <Col sm="6">
                    <div className="me-4 ms-4">
                        <p className="m-0">Бан</p>
                        <ButtonGroup vertical className="p-0 mb-2 d-flex justify-content-center me-0">
                            <FormGroup check className="pointer">
                                <Input type="checkbox" id='ban_yes' className="pointer" onChange={ () => changeBans(true) } />
                                {' '}
                                <Label check for='ban_yes' className="pointer">
                                    Так
                                </Label>
                            </FormGroup>
                            <FormGroup check className="pointer">
                                <Input type="checkbox" id='ban_no' className="pointer" onChange={ () => changeBans(false) } />
                                {' '}
                                <Label check for='ban_no' className="pointer">
                                    Ні
                                </Label>
                            </FormGroup>
                        </ButtonGroup>
                    </div>
                </Col>
            </Row>
            
        </div>
    );
}

export default Filters;