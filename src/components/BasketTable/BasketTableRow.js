
import { FormGroup, Input, FormFeedback, UncontrolledTooltip } from 'reactstrap';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrent, getByIdAsync } from '../../app/watchSlice';

import validation from '../../modules/validation';

const BasketTableRow = ({ item, idx, onChange, onDelete }) => {
    const watch = useSelector(selectCurrent);
    
    const [isValid, setIsValid] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(!item) {
            return;
        }

        setIsValid(validateCount(item.count));

        dispatch(getByIdAsync(item.watchId));
    }, [item]);

    const handleInput = (e) => {
        setIsValid(validateCount(e.target.value));

        onChange && onChange(e.target.value);
    }

    const validateCount = (value) => {
        if(!watch) {
            return false;
        }
        
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
                    <Input type="number" min={ 0 } max={ watch && watch.available } value={ item.count } onInput ={ handleInput } invalid={ !isValid } />
                    <FormFeedback tooltip>Некоректне значення</FormFeedback>
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