


import { Card, CardBody, CardHeader, CardText } from "reactstrap";



const ReviewCard = ({ item }) => {
    if(!item) {
        return null;
    }

    return (
        <Card color="dark" inverse className="border border-light m-1">
            <CardHeader className="bg-secondary">{ (new Date(item.date)).toLocaleString() }</CardHeader>
            <CardBody>
                <CardText>{ !item.deleted ? item.text : 'Коментар видалено' }</CardText>
            </CardBody>
        </Card>
    );
}

export default ReviewCard;