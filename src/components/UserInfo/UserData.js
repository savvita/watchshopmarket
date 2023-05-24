import { Col, Row } from "reactstrap";




const UserData = ({ item }) => {
    if(!item) {
        return null;
    }

    return (
        <div className="text-white">
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Id:</Col>
                <Col xs="12" sm="6" md="8">{ item.id }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Username:</Col>
                <Col xs="12" sm="6" md="8">{ item.userName }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Ім’я:</Col>
                <Col xs="12" sm="6" md="8">{ item.firstName }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">По-батькові:</Col>
                <Col xs="12" sm="6" md="8">{ item.secondName }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Прізвище:</Col>
                <Col xs="12" sm="6" md="8">{ item.lastName }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Email:</Col>
                <Col xs="12" sm="6" md="8">{ item.email }</Col>
            </Row>

            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Телефон:</Col>
                <Col xs="12" sm="6" md="8">{ item.phoneNumber }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Адміністратор:</Col>
                <Col xs="12" sm="6" md="8">{ item.isAdmin ? 'Так' : 'Ні' }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Менеджер:</Col>
                <Col xs="12" sm="6" md="8">{ item.isManager ? 'Так' : 'Ні' }</Col>
            </Row>
            <Row className="p-2 border-bottom ms-2 me-2 userprofile-table__row">
                <Col xs="12" sm="6" md="4">Заблоковано:</Col>
                <Col xs="12" sm="6" md="8">{ !item.isActive ? 'Так' : 'Ні' }</Col>
            </Row>

        </div>
    );
}

export default UserData;