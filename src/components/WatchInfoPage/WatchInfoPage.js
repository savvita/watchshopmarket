
import WatchImageView from './WatchImageView';

import { selectCurrent, selectStatus, getByIdAsync } from '../../app/watchSlice';
import { updateAsync as updateBasket, selectValues as selectBasket } from '../../app/basketSlice';
import { selectCurrent as selectUser } from '../../app/authSlice';

import { useSelector, useDispatch } from 'react-redux';


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Row, Col, Spinner, Badge, Button, FormFeedback, Input, FormGroup} from 'reactstrap';
import { FaCheck, FaShoppingBasket } from 'react-icons/fa';

import './WatchInfoPage.css';
import WatchDetailInfo from './WatchDetailInfo';

import validation from '../../modules/validation';

const WatchInfoPage = () => {
    const [count, setCount] = useState(1);
    const [isValid, setIsValid] = useState(true);

    const [buyDisabled, setBuyDisabled] = useState(false);

    const params = useParams();

    const item = useSelector(selectCurrent);
    const status = useSelector(selectStatus);
    const basket = useSelector(selectBasket);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getByIdAsync(params.id));
    }, []);

    useEffect(() => {
        if(!item) {
            return;
        }

        setBuyDisabled(item.available === 0 || item.onSale !== true);
    }, [item]);


    const addToBasket = () => {
        if(!item) {
            return;
        }
        if(!user || !user.isActive || !user.isActive) {
            navigate("/signin");
        }
        dispatch(updateBasket({ ...basket, details: [...basket.details, { watchId: item.id, count: count }] }));
    }

    const handleCountInput = (e) => {
        const valid = validateCount(e.target.value);
        setIsValid(valid);
        if(valid) {
            setCount(e.target.value);
        }
    }

    const validateCount = (value) => {    
        return validation.positiveIntValidationRule(value);
    }


    return (
        <div>
            <div className={ status === 'loading' ? 'd-flex justify-content-center' : 'd-none' }><Spinner color="light">Loading...</Spinner></div>
            { item &&
                <div className="mt-4">
                    <div className={ status !== 'idle' ? 'd-none' : '' }>
                        <Row>
                            <Col md="12" lg="4">
                                <WatchImageView item={ item } />
                            </Col>
                            <Col md="12" lg="8">
                                <Row>
                                    <Col sm="12">
                                        <h2 className="text-white mb-4">{ item.title }</h2>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12" lg="6">
                                        <p className="text-white mb-3"><strong>Модель: </strong>{ item.model }</p>
                                        { item.brand && <p className="text-white m-0"><strong>Виробник: </strong>{ item.brand.value }</p> }
                                        { item.movementType && <p className="text-white m-0"><strong>Тип механізму: </strong>{ item.movementType.value }</p> }
                                        { item.caseMaterial && <p className="text-white m-0"><strong>Матеріал корпуса: </strong>{ item.caseMaterial.value }</p> }
                                        { item.strapType && <p className="text-white m-0"><strong>Браслет / Ремешок: </strong>{ item.strapType.value }</p> }
                                    </Col>
                                    <Col md="12" lg="6">
                                        { item.discount && item.discount > 0 && 
                                        <div>
                                            <p className="text-white text-decoration-line-through d-inline fs-4">{ item.price }&nbsp;&#8372;</p>
                                            <Badge color="warning" className="d-inline fs-5 ms-3 p-1">-{ item.discount }%</Badge>
                                        </div> }
                                        <p className="text-white fs-2 mb-0">{ item.price - item.price * (item.discount ?? 0) / 100 }&nbsp;&#8372;</p>
                                        { item.available > 0 ? <p className="text-white fs-6"><span className="text-warning"><FaCheck /></span> Є в наявності</p> : <p className="text-white fs-6">Немає в наявності</p> }
                                        <div className="d-flex">
                                            <FormGroup className='position-relative' style={{ width: '5rem' }}>
                                                <Input type="number" min={ 1 } max={ item && item.available } value={ count } onInput ={ handleCountInput } invalid={ !isValid } />
                                                <FormFeedback tooltip>Некоректне значення</FormFeedback>
                                            </FormGroup>
                                            <div className="ms-2">
                                                <div className="position-relative">
                                                    <FaShoppingBasket className="position-absolute start-0 top-50 translate-middle-y ms-2" />
                                                    <Button color="warning" className="ps-5 pe-5" onClick={ addToBasket } disabled={ buyDisabled }>Купити</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <WatchDetailInfo item={ item } className="mt-3" />
                        </Row>
                    </div>
                </div>
            }
        </div>
    );
}

export default WatchInfoPage;