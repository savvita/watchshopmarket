

import { selectCurrent as selectUser } from '../../app/authSlice';
import { useSelector } from 'react-redux';
import { Badge, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';


const WatchCard = ({ item, onBuyClick }) => {
    const user = useSelector(selectUser);

    const [buyDisabled, setBuyDisabled] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(!item) {
            return;
        }

        setBuyDisabled(item.available === 0 || item.onSale !== true);
    }, [item]);

    const buyClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(!user || !user.isUser || !user.isActive) {
            navigate("/signin");
        }
        else {
            onBuyClick && onBuyClick(item);
        }
    }

    return (
        <Link to={ `/watches/${ item.id }`} className="watch-container__link">
            <Card color="light m-2" className="watch-container__card top-watch-container__card">
                <Row className="g-0">
                    <Col md="4" sm="12">
                        <div className="watch-container__card-img">
                            { item.images && item.images.length > 0 ? <img alt={ item.title } src={ item.images[0].value} /> :
                            <img src="images/No_image_available.png" alt={ item.title } /> }
                        </div>
                    </Col>
                    <Col md="8" sm="12">
                        <CardBody className="top-watch-container__card-body">
                            <CardTitle tag="h5">{ item.title }</CardTitle>
                            { item.votes > 0 && 
                                <div>
                                    <Rater total={ 5 } rating={ item.rate } interactive={ false } style={{ fontSize: '1.2rem' }} />
                                    <span>({ item.votes })</span>
                                </div>  
                            }
                            <div className="d-flex top-watch-container__card-text">
                                <CardSubtitle className={ item && item.discount ? "mb-2 me-4 text-decoration-line-through text-muted" : "mb-2 text-muted" } tag="h5">{ item.price }&nbsp;&#8372;</CardSubtitle>
                                { item && item.discount && <CardSubtitle className="mb-2 text-muted" tag="h5">{ item.price - item.price * item.discount / 100 }&nbsp;&#8372;</CardSubtitle> }
                            </div>
                            <Button className="watch-container__card-btn" onClick={ buyClick } disabled={ buyDisabled }>Купити</Button>
                            <div className="position-relative">
                                <CardText className="watch-container__card-description">{ item.description }</CardText>
                            </div>
                        </CardBody>
                    </Col>
                </Row>
                { item && item.isTop && <Badge color="danger" className="position-absolute top-0 end-0 fs-3">TOP</Badge> }
                { item && item.discount > 0 && <Badge color="warning" className="position-absolute top-0 start-0 fs-3">-{ item.discount }%</Badge> }
            </Card>         
        </Link>
    );
}


export default WatchCard;