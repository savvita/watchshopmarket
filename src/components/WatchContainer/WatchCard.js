
import { Card, CardSubtitle, CardTitle, CardBody, CardText, Button } from 'reactstrap';

import './WatchContainer.css';

const WatchCard = ({ item, onBuyClick }) => {
    if(!item) {
        return null;
    }

    const buyClick = (e) => {
        e.stopPropagation();
        onBuyClick && onBuyClick(item);
    }

    return (
         <Card color="light m-2" style={{ width: '18rem' }} className="watch-container__card">
            { item.images && item.images.length > 0 ? <img alt={ item.title } src={ item.images[0].value} /> :
            <img src="images/No_image_available.png" alt={ item.title } /> }

            <CardBody style={{ height: '10rem' }}>
                <CardTitle tag="h5">{ item.title }</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">{ item.price }&nbsp;&#8372;</CardSubtitle>
                <Button className="watch-container__card-btn" onClick={ buyClick }>Купити</Button>
                <div className="position-relative">
                    <CardText className="watch-container__card-description">{ item.description }</CardText>
                </div>
            </CardBody>
        </Card>
    );
}

export default WatchCard;