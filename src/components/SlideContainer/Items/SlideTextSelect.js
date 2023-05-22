
import { Col, Row } from "reactstrap";




const SlideTextSelect = ({ items, onDelete }) => {
    const remove = (item) => {
        onDelete && onDelete(item);
    }

    return (
        <div>
            <fieldset>
                <legend className="fs-5">Текст на слайді</legend>
                <Row>
                    <Col>
                        <div className="p-0 mb-2 me-0 overflow-auto" style={{ maxHeight: '7rem' }}>
                            { items && items.map((item, idx) => 
                                <div key={ idx } className="pointer m-0 mt-1 me-1 border p-1 rounded-1">
                                    <div className="position-relative">
                                        <p className="m-0">{ item.text && (item.text.length > 10 ? item.text.substring(0, 10) + '...' : item.text ) }&nbsp;</p>
                                        <span className="position-absolute top-50 end-0 translate-middle-y text-danger pointer" onClick={ () => remove(item) }>X</span>
                                    </div>
                                </div>)
                            }
                        </div>
                    </Col>
                </Row>
            </fieldset>

        </div>
    );
}

export default SlideTextSelect;