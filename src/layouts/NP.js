import { useEffect, useState } from "react";
import { Button, Col, FormGroup, FormText, Input, Label, Row, Spinner } from "reactstrap";


import { useSelector, useDispatch } from 'react-redux';

import { selectLastUpdate as selectLastCityUpdate, selectStatus as selectCityStatus, getLastUpdateAsync as getLastCityUpdate, updateAsync as updateCity } from '../app/citySlice';

import { selectLastUpdate as selectLastWarehouseUpdate, selectStatus as selectWarehouseStatus, getLastUpdateAsync as getLastWarehouseUpdate, updateAsync as updateWarehouse } from '../app/warehouseSlice';


const NP = () => {
    const lastCityUpdate = useSelector(selectLastCityUpdate);
    const lastWarehouseUpdate = useSelector(selectLastWarehouseUpdate);
    const cityStatus = useSelector(selectCityStatus);
    const warehouseStatus = useSelector(selectWarehouseStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLastCityUpdate());
        dispatch(getLastWarehouseUpdate());
    }, []);

    const [cities, setCities] = useState(true);
    const [warehouses, setWarehouses] = useState(true);

    const update = async () => {
        if(cities === true) {
            await dispatch(updateCity());
            dispatch(getLastCityUpdate());
        }

        if(warehouses === true) {
            await dispatch(updateWarehouse());
            dispatch(getLastWarehouseUpdate());
        }
    }

    return (
        <div className="text-white p-3">
            <FormGroup>
                <Row>
                    <Col>
                        <Input type="checkbox" checked={ cities } onChange={ (e) => setCities(e.target.checked) } />
                        <Label check className="ms-3">Список міст</Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormText>
                            <span>Останнє оновлення: </span>
                            { cityStatus === 'loading' ? <Spinner size="sm" color="light">Оновлення...</Spinner> : 
                                <span>{ lastCityUpdate ? new Date(lastCityUpdate).toLocaleString() : 'Ніколи' }</span>
                            }
                        </FormText>
                    </Col>
                </Row>
            </FormGroup>
            <FormGroup>
                <Row>
                    <Col>
                        <Input type="checkbox" checked={ warehouses } onChange={ (e) => setWarehouses(e.target.checked) } />
                        <Label check className="ms-3">Список відділень</Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormText>
                            <span>Останнє оновлення: </span>
                            { warehouseStatus === 'loading' ? <Spinner size="sm" color="light">Оновлення...</Spinner> : 
                                <span>{ lastWarehouseUpdate ? new Date(lastWarehouseUpdate).toLocaleString() : 'Ніколи' }</span>
                            }
                        </FormText>
                    </Col>
                </Row>
            </FormGroup>
            <p className="text-white">* Рекомендовано оновлювати довідники раз на добу</p>

            <Button onClick={ update } disabled={ cityStatus === 'loading' || warehouseStatus === 'loading'}>Оновити</Button>
            { (cityStatus === 'loading' || warehouseStatus === 'loading') && <p className="text-white mt-3">Зачекайте, будь ласка. Оновлення може зайняти декілька хвилин</p> }
        </div>
    );
}

export default NP;