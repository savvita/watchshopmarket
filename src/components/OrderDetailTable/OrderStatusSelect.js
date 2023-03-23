

import { useEffect, useState } from "react";
import { FaBan, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, Label, Input } from "reactstrap";

import { selectValues, getAsync } from "../../app/orderstatusSlice";





const OrderStatusSelect = ({ item, isSelectable, onChange}) => {
       
    const values = useSelector(selectValues);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(item.status.id);
    const [statusses, setStatusses] = useState([]);

    useEffect(() => {
        dispatch(getAsync());
    }, [item, isSelectable]);

    useEffect(() => {
        if(!item) {
            return;
        }

        let tmp = values.filter(item => item.id !== 1);

        if(item.payment && item.payment.id === 2) {
            tmp = tmp.filter(item => item.id !== 5 && item.id !== 6);
        }

        if(item.delivery && item.delivery.id === 1) {
            tmp = tmp.filter(item => item.id !== 7);
        }

        setStatusses([...tmp]);
    }, [values]);

    if(!item || !item.status) {
        return null;
    }
 

    const cancel = () => {
        setSelected(item.status.value);
    }

    const accept = () => {
        onChange && onChange(selected);
    }

    return (
        <div className="text-white mb-1 mt-1">
            { isSelectable ? 
                <FormGroup className="d-flex align-items-center justify-content-start">
                    <Label className="pb-0 pe-2 m-0">Статус: </Label>
                    <Input style={{ maxWidth: '20rem' }} name='status' value={ selected } type="select" onChange={ (e) => setSelected(e.target.value) }>
                        { statusses && statusses.map(item => item.id !== 1 && <option key={ item.id } value={ item.id }>{ item.value }</option>)}
                    </Input>
                    <div className="d-inline-block overflow-hidden p-2">
                        <FaCheck className="property-table__icon" onClick={ accept } />
                    </div>
                    <div className="d-inline-block overflow-hidden p-2">
                        <FaBan className="property-table__icon" onClick={ cancel } />
                    </div>
                </FormGroup>
                :
                <p className="text-white mb-1 mt-1">Статус: { item.status.value }</p>
            }
        </div>
    );
}

export default OrderStatusSelect;