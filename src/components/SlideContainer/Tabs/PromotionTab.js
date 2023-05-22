


import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Input, Label, Row, TabPane } from 'reactstrap';

import { selectValues as selectPromotions, getAsync as getPromotions } from '../../../app/promotionSlice';


const PromotionTab = ({ tabId, onChange }) => {
    const promotions = useSelector(selectPromotions);
    const dispatch = useDispatch();

    const [value, setValue] = useState(null);

    useEffect(() => {
        dispatch(getPromotions());
    }, []);

    const selectPromotion = (e) => {
        const id = e.target.value;
        if(id == 0) {
            setValue(null);
        } else {
            const promotion = promotions.find(x => x.id == id);

            if(promotion === undefined) {
                return;
            }
            setValue({ ...promotion });
        }
    }

    useEffect(() => {
        onChange && onChange({ ...value });
    }, [value]);

    if(!tabId) {
        return null;
    }

    return (
        <TabPane tabId={ tabId }>
            <Row className='p-4'>
                <Col sm="12" md="4" lg="3">
                    <Label>Вибрати акцію</Label>
                </Col>
                <Col sm="12" md="8" lg="9">
                    <Input type="select" onChange={ selectPromotion }>
                        <option value={ 0 }>Виберіть...</option>
                        { promotions && promotions.map(item => 
                            <option key={ item.id } value={ item.id }>{ item.title }</option>
                        ) }
                    </Input>    
                </Col>
            </Row>
            { value && 
                <div className='p-4'>
                    <h3>{ value.title }</h3>

                    { value.brand && <p className="mb-0">Виробник: { value.brand.value }</p> }
                    <p>Знижка: { value.discountValue }%</p>
                    { value.startDate && <p className="small m-0">Початок акції: { (new Date(value.startDate)).toLocaleDateString() }</p> }
                    { value.endDate && <p className="small m-0">Кінець акції: { (new Date(value.endDate)).toLocaleDateString() }</p> }

                    <hr />
                    <div className="p-0 mb-2 me-0 overflow-auto" style={{ maxHeight: '10rem' }}>{ value.description }</div>
                </div>
            }
        </TabPane>
    );
}

export default PromotionTab;