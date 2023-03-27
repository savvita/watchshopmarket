import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Col, ListGroup, ListGroupItem, ListGroupItemHeading, Row } from "reactstrap";


import './Footer.css';

const Footer = () => {
    return (
        <Row className="footer border-top border-light">
            <Col sm="12" md="6" lg="4" className="border-end border-light">             
                <ListGroup className="text-center">
                    <ListGroupItemHeading className="text-white">Наші контакти</ListGroupItemHeading>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0">XXX-XXX-XX-XX</ListGroupItem>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0">XXX-XXX-XX-XX</ListGroupItem>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0">XXX-XXX-XX-XX</ListGroupItem>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0">XXX-XXX-XX-XX</ListGroupItem>
                </ListGroup>
            </Col>
            <Col sm="12" md="6" lg="4" className="border-end border-light">
                <ListGroup className="text-center">
                    <ListGroupItemHeading className="text-white">Магазин</ListGroupItemHeading>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0"><Link to="about" className="text-decoration-none text-white">Про нас</Link></ListGroupItem>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0"><Link to="payment" className="text-decoration-none text-white">Оплата і доставка</Link></ListGroupItem>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0"><Link to="return" className="text-decoration-none text-white">Повернення товару</Link></ListGroupItem>
                </ListGroup>
            </Col>
            <Col sm="12" md="6" lg="4">
                <ListGroup className="text-center">
                    <ListGroupItemHeading className="text-white">Приєднуйтесь до нас</ListGroupItemHeading>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0"><Link to="https://uk-ua.facebook.com/" className="text-decoration-none text-white fs-6"><FaFacebook /></Link></ListGroupItem>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0"><Link to="https://www.instagram.com/" className="text-decoration-none text-white fs-6"><FaInstagram /></Link></ListGroupItem>
                    <ListGroupItem className="bg-dark text-white pt-0 pb-0"><Link to="https://twitter.com/?lang=ru" className="text-decoration-none text-white fs-6"><FaTwitter /></Link></ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    );
}

export default Footer;