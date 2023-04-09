
import AccountMenu from './AccountMenu';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Input, NavLink, Button, Row, Col } from 'reactstrap';

import { FaShoppingBasket } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { NavLink as RRNavLink, useLocation, Link } from 'react-router-dom';

import { selectValue, set } from '../../app/filterSlice';
import { selectCurrent as selectUser } from '../../app/authSlice';


import { useSelector, useDispatch } from 'react-redux';

import './Header.css';

const Header = () => {
    const location = useLocation();

    const filters = useSelector(selectValue);
    const user = useSelector(selectUser);

    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [searchTxt, setSearchTxt] = useState('');

    const search = () => {
        dispatch(set({ ...filters, model: searchTxt }));
    }

    return (
        <header className="border-bottom border-light pt-2 pb-5">
            <Navbar dark expand={"lg"} className="p-3">
                    <NavbarBrand tag={RRNavLink} to="/" className="fs-1 fw-weight-bold">Watch Market</NavbarBrand>
                    <NavbarToggler onClick={ toggleNavbar } />
                    <Collapse navbar isOpen={ !collapsed }>
                        <Nav className="flex-grow-1" navbar>
                            <NavLink tag={RRNavLink} to="/">Головна</NavLink>
                            <NavLink tag={RRNavLink} to="/catalog">Каталог</NavLink>
                            <NavLink tag={RRNavLink} to="/about">Про нас</NavLink>

                            <AccountMenu />
                            { location.pathname === '/catalog' && 
                                <Row className='flex-grow-1'>
                                    <Col md="12" lg="9">
                                        <Input name="search" placeholder="Пошук" type="search" value={ searchTxt } onInput={ (e) => setSearchTxt(e.target.value) } /> 
                                    </Col>
                                    <Col md="12" lg="3">
                                        <Button onClick={ search }>Шукати</Button> 
                                    </Col>
                                </Row>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                
                { location.pathname.startsWith('/manager') && <h5 className="text-white text-end">Панель менеджера</h5> }
                { location.pathname.startsWith('/admin') && <h5 className="text-white text-end">Панель адміністратора</h5> }
              
                { user && user.isUser && user.isActive && !user.expired && 
                <div className="d-flex justify-content-end pe-6">
                    <p className="text-white pe-4">{ user.userName !== '' && `${ user.userName }` }</p>
                    <Link to="/basket"><FaShoppingBasket className="header__basket-icon"/></Link>
                </div> }
        </header>
    );
}

export default Header;