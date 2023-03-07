import React, { useState } from 'react';
import { Collapse as BCollapse, Button, NavLink, ButtonGroup } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import './Collapse.css';

const Collapse = ({ heading, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <ButtonGroup vertical className="collapsed-group">
            <Button color="dark" onClick={ toggle } className={ isOpen ? 'rounded-0 pe-4 collapsed-group__heading opened text-start' : 'rounded-0 pe-4 collapsed-group__heading text-start' }>{ heading }</Button>
            <BCollapse isOpen={ isOpen } style={{ width: '100%' }}>
                <ButtonGroup vertical style={{ width: '100%' }} className="border-bottom border-light">
                    { items && items.map((item, idx) => 
                    <Button key={ idx } color="dark" className='rounded-0 text-start ps-4'>
                        <NavLink tag={RRNavLink} to={ item.link }>{ item.heading }</NavLink>
                    </Button>
                    ) }
                </ButtonGroup>
            </BCollapse>
        </ButtonGroup>
    );
}

export default Collapse;