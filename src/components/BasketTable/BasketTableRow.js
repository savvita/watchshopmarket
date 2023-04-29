
import { FormGroup, Input, FormFeedback, UncontrolledTooltip } from 'reactstrap';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getByIdAsync } from '../../app/watchSlice';
import { setValid, selectValid } from "../../app/basketSlice";

import validation from '../../modules/validation';

const BasketTableRow = ({ item, idx, onChange, onDelete }) => {
    const [watch, setWatch] = useState(null);
    
    const [isValid, setIsValid] = useState(false);
    const [errorTxt, setErrorTxt] = useState("");
    
    const dispatch = useDispatch();

    const validBasket = useSelector(selectValid);

    useEffect(() => {
        if(!item) {
            return;
        }

        setIsValid(validateCount(item.count));

        const getWatch = async () => {
            let res = await dispatch(getByIdAsync(item.watchId));

            if(res && res.payload && res.payload.value) {
                setWatch(res.payload.value);
                if(res.payload.value.available < item.count) {
                    setErrorTxt("Немає в наявності");
                    setIsValid(false);
                    setValidBasket(false);
                }
                else {
                    setValidBasket(true);
                }
            }
        }

        getWatch();

    }, [item]);

    const setValidBasket = (value) => {
        const values = validBasket.map(i => {
            if(i.id !== item.id) {
                return i;
            }
            else {
                return {
                    ...i,
                    valid: value
                }
            }
        });
        dispatch(setValid([...values]));
    }

    const handleInput = (e) => {
        const valid = validateCount(e.target.value);
        
        if(watch.available < e.target.value){
            setIsValid(false);
            setErrorTxt("Немає в наявності");
            setValidBasket(false);
        }
        else {
            setIsValid(valid);
            
            if(valid === false) {
                setErrorTxt("Некоректне значення");
                setValidBasket(false);
            }
            else {
                setErrorTxt("");
                setValidBasket(true);
                onChange && onChange(e.target.value);
            }
        }
    }

    const validateCount = (value) => {   
        return validation.positiveIntValidationRule(value);
    }

    const remove = () => {
        if(!item || !onDelete) {
            return;
        }

        onDelete(item.id);
    }

    return (
        <tr className='border border-light border-2 position-relative'>
            <th scope="row" className='text-center ms-4 me-4'><p className="p-1 m-0">{ idx }</p></th>
            <td style={{ width: '100%' }}>{ watch && watch.title }</td>
            <td className="text-center">{ item && item.unitPrice }&nbsp;&#8372;</td>
            <td className="text-center">
                <FormGroup className='position-relative' style={{ width: '5rem' }}>
                    <Input type="number" min={ 1 } max={ watch && watch.available } value={ item.count } onInput ={ handleInput } invalid={ !isValid } />
                    <FormFeedback tooltip>{ errorTxt }</FormFeedback>
                </FormGroup>
            </td>
            <td className="text-center pe-5">{ item && item.count && item.unitPrice && item.unitPrice * item.count }&nbsp;&#8372;</td>
            <td onClick={ remove } className='position-absolute top-0 end-0 text-white m-0 p-0 pe-1 border-0 basket-table__close-icon'>
                <span id={ item ? `basket-table-row__close-icon__${ item.id }` : 'basket-table-row__close-icon' }>X</span>
                <UncontrolledTooltip placement="right" target={ item ? `basket-table-row__close-icon__${ item.id }` : 'basket-table-row__close-icon' }>
                    Видалити
                </UncontrolledTooltip>
            </td>
        </tr>
    );
}

export default BasketTableRow;