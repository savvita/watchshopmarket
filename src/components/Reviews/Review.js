

import { Card, CardBody, CardFooter, CardHeader, CardText } from "reactstrap";



const Review = ({ item }) => {


    return (
        <div>
            { item &&
                <Card className="mt-2 mb-2">
                    <CardHeader>{ item.userName }</CardHeader>
                    <CardBody>
                        <CardText>{ item.deleted ? 'Коментар видалено' : item.text }</CardText>
                    </CardBody>
                    <CardFooter>{ (new Date(item.date)).toLocaleString() }</CardFooter>
                </Card>
            }
        </div>
    );
}

export default Review;