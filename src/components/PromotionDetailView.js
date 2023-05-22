import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Col, Row } from "reactstrap";
import InfoModal from "./InfoModal";
import PromotionForm from "./PromotionTable/PromotionForm";




const PromotionDetailView = ({ item, isManagerMode, onUpdate }) => {
    const navigate = useNavigate();

    const [formModal, setFormModal] = useState(false);

    const saveItem = (item) => {
        setFormModal(false);
        item && onUpdate && onUpdate(item);
    }

    const remove = () => {
        item && onUpdate && onUpdate({ ...item, isActive: false });
    }

    const restore = () => {
        item && onUpdate && onUpdate({ ...item, isActive: true });
    }

    
    if(!item) {
        return null;
    }


    return (
        <div className="text-white">
            { isManagerMode && <Button onClick={ () => navigate(-1) }>Назад</Button> }
            <h3 className="mt-3">{ item.title }{ !item.isActive && <Badge className="ms-2 fs-6" color="danger">Не діє</Badge> }</h3>
            <Row>
                <Col lg="9" md="7" sm="6" xs="12">
                    { item.brand && <p className="mb-0">Виробник: { item.brand.value }</p> }
                    <p>Знижка: { item.discountValue }%</p>
                    { item.startDate && <p className="small m-0">Початок акції: { (new Date(item.startDate)).toLocaleDateString() }</p> }
                    { item.endDate && <p className="small m-0">Кінець акції: { (new Date(item.endDate)).toLocaleDateString() }</p> }
                </Col>
                { isManagerMode && 
                <Col lg="3" md="5" sm="6" xs="12">
                    <div className="d-flex flex-column">
                        <Button className="m-2" onClick={ () => setFormModal(true) }>Редагувати</Button>
                        { item.isActive ? <Button color="danger" className="m-2" onClick={ remove }>Видалити</Button> : <Button color="warning" className="m-2" onClick={ restore }>Відновити</Button> }
                    </div>
                </Col> }
            </Row> 

            <hr />
            <p>{ item.description }</p>
            <PromotionForm isOpen={ formModal } item={ item } onAccept={ saveItem } onCancel={ () => setFormModal(false) } />
        </div>
    );
}

export default PromotionDetailView;