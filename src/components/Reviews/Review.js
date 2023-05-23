

import { Card, CardBody, CardFooter, CardHeader, CardText } from "reactstrap";

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

const Review = ({ item }) => {
    return (
        <div>
            { item &&
                <Card className="mt-2 mb-2">
                    <CardHeader>{ item.userName }</CardHeader>
                    <CardBody className="pt-0">
                        { item.rate && <Rater total={ 5 } rating={ item.rate } interactive={ false } style={{ fontSize: '2rem' }} /> }
                        <CardText className="mt-2">{ item.deleted ? 'Коментар видалено' : item.text }</CardText>
                    </CardBody>
                    <CardFooter>{ (new Date(item.date)).toLocaleString() }</CardFooter>
                </Card>
            }
        </div>
    );
}

export default Review;