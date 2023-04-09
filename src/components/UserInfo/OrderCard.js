



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";



const OrderCard = ({ item }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if(!item || !item.details) {
            return;
        }

        let sum = 0;

        for(let detail of item.details) {
            sum += detail.unitPrice * detail.count;
        }
        
        setTotal(sum);
    }, [item]);

    if(!item) {
        return null;
    }

    return (
        <Link to={ `/orders/${ item.id }` } className='text-decoration-none'>
            <Card color="dark" inverse className="border border-light m-1">
                <CardHeader className="bg-secondary">{ (new Date(item.date)).toLocaleString() }</CardHeader>
                <CardBody>
                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col xs="12" sm="6" md="4">Id</Col>
                        <Col xs="12" sm="6" md="4">{ item.id }</Col>
                    </Row>
                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col xs="12" sm="6" md="4">Статус</Col>
                        <Col xs="12" sm="6" md="4">{ item.status && item.status.value }</Col>
                    </Row>
                    <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                        <Col xs="12" sm="6" md="4">Сума</Col>
                        <Col xs="12" sm="6" md="4" className="text-nowrap">{ total }&nbsp;&#8372;</Col>
                    </Row>
                </CardBody>
            </Card>
        </Link>
    );
}

export default OrderCard;