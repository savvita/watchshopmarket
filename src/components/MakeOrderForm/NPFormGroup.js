


import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Input, Label, Row } from 'reactstrap';


import { selectValues as selectCities, getAsync as getCities } from '../../app/citySlice';
import { selectValues as selectWarehouses, getAsync as getWarehouses } from '../../app/warehouseSlice';
import AutocompleteSelect from '../AutocompleteSelect/AutocompleteSelect';



const NPFormGroup = ({ className, onSet }) => {
    const cities = useSelector(selectCities);
    const warehouses = useSelector(selectWarehouses);
    const dispatch = useDispatch();

    const [sortedCities, setSortedCities] = useState([]);
    const [sortedWarehouses, setSortedWarehouses] = useState([]);

    const [info, setInfo] = useState({});

    useEffect(() => {
        dispatch(getCities());
    }, []);

    useEffect(() => {
        if(!cities || cities.length === 0) {
            return;
        }
        
        let tmp = [...cities];
        tmp.sort((a, b) => a.description.localeCompare(b.description));
        setSortedCities(tmp);
    }, [cities]);

    useEffect(() => {
        if(!warehouses || warehouses.length === 0) {
            return;
        }
        
        let tmp = [...warehouses];
        tmp.sort((a, b) => parseInt(a.number) - parseInt(b.number));
        setSortedWarehouses(tmp);

        setInfo({ ...info, warehouseRef: tmp[0].ref });
        onSet && onSet({ ...info, warehouseRef: tmp[0].ref });
    }, [warehouses]);

    const setCity = (item) => {
        setInfo({ settlementRef: item.ref, warehouseRef: "" });
        setSortedWarehouses([]);
        dispatch(getWarehouses(item.ref));
    }
    
    const setWarehouse = (e) => {
        setInfo({ ...info, warehouseRef: e.target.value });
        onSet && onSet({ ...info, warehouseRef: e.target.value });
    }

    return (
        <div className={ className ? `make-order-form__np-form-group ${ className }` : 'make-order-form__np-form-group' } >
            <Row className='align-items-center'>
                <Col sm="12" md="4" lg="2" className="mt-2"><Label className="align-self-center">Місто</Label></Col>
                <Col sm="12" md="8" lg="4" className="mt-2">
                    <AutocompleteSelect items={ sortedCities } placeholder="Місто" onSelect={ setCity } />
                </Col>
                <Col sm="12" md="4" lg="2" className="mt-2"><Label className="align-self-center">Відділення</Label></Col>
                <Col sm="12" md="8" lg="4" className="mt-2">
                    <Input type="select" onChange={ setWarehouse }>
                        { sortedWarehouses && sortedWarehouses.map(item => <option key={ item.ref } value={ item.ref }>{ item.description }</option>)}
                    </Input>
                </Col>
            </Row>
        </div>
    );
}

export default NPFormGroup;