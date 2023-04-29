
import AccountMenu from './AccountMenu';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Input, NavLink, Button, Row, Col, Badge } from 'reactstrap';

import { FaShoppingBasket } from 'react-icons/fa';

import { useEffect, useState } from 'react';
import { NavLink as RRNavLink, useLocation, Link } from 'react-router-dom';

import { selectValue, set } from '../../app/filterSlice';
import { selectCurrent as selectUser } from '../../app/authSlice';
import { getAsync as getBasket, selectCount } from '../../app/basketSlice';


import { useSelector, useDispatch } from 'react-redux';

import './Header.css';

const Header = () => {
    const location = useLocation();

    const filters = useSelector(selectValue);
    const user = useSelector(selectUser);
    const count = useSelector(selectCount);

    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(true);
    const toggleNavbar = () => setCollapsed(!collapsed);

    const [searchTxt, setSearchTxt] = useState('');

    const search = () => {
        dispatch(set({ ...filters, model: searchTxt }));
    }

    useEffect(() => {
        if(user) {
            dispatch(getBasket());
        }
    }, [user]);

    useEffect(() => {
        if(! filters.model || filters.model === "") {
            setSearchTxt("");
        }
    }, [filters]);

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
                    { user && user.userName !== '' && <NavLink tag={RRNavLink} to="/user/profile" className="pt-1 pb-1 text-white pe-4">{ user.userName }</NavLink> }
                    <div className="position-relative">
                        <Link to="/basket"><FaShoppingBasket className="header__basket-icon"/></Link>
                        { count > 0 &&
                            <Badge color="danger" className="position-absolute top-0 end-0 translate-middle-y p-1 ps-2 pe-2">
                                { count }
                            </Badge>
                        }
                    </div>
                </div> }
        </header>
    );
}

export default Header;