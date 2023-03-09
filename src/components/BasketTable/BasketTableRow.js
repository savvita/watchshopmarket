
import { FormGroup, Input, FormFeedback } from 'reactstrap';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectCurrent, getByIdAsync } from '../../app/watchSlice';

import validation from '../../modules/validation';

const BasketTableRow = ({ item, idx, onChange }) => {
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

    return (
        <tr>
            <th scope="row" className='text-center ms-4 me-4'><p className="p-1 m-0">{ idx }</p></th>
            <td style={{ width: '100%' }}>{ watch && watch.title }</td>
            <td className="text-center">{ item && item.unitPrice }&nbsp;&#8372;</td>
            <td className="text-center">
                <FormGroup className='position-relative' style={{ width: '5rem' }}>
                    <Input type="number" min={ 0 } max={ watch && watch.available } value={ item.count } onInput ={ handleInput } invalid={ !isValid } />
                    <FormFeedback tooltip>Некоректне значення</FormFeedback>
                </FormGroup>
            </td>
            <td className="text-center">{ item && item.count && item.unitPrice && item.unitPrice * item.count }&nbsp;&#8372;</td>
        </tr>
    );
}

export default BasketTableRow;