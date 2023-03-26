import CollapsedActions from '../CollapsedActions/CollapsedActions';

import { Input, FormFeedback } from 'reactstrap';
import { FaCheck, FaBan } from "react-icons/fa";

import { useState, useEffect } from 'react';

import './PropertyTable.css';

const PropertyTableRow = ({ idx, item, className, onDelete, onCancel, onAccept, onError, link }) => {

    const [editMode, setEditMode] = useState(!item);
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(item && item.value) {
            setValue(item.value);
            setIsValid(item.value.length > 0);
        }
        else {
            setEditMode(true);
        }
    }, [item, className]);

    const handleInput = (e) => {
        setValue(e.target.value);
        setIsValid(e.target.value.length > 0);
    }

    const cancelEditing = () => {
        
        if(item && item.value) {
            setEditMode(false);
            setValue(item.value);
            setIsValid(item.value.length > 0);
        }
        else {
            setValue('');
            setIsValid(false);
        }

        onCancel && onCancel();
    }

    const acceptEditing = () => {
        if(isValid) {
            setValue('');
            setIsValid(false);
            setEditMode(false);
            onAccept && onAccept({ ...item, value: value });
        }
        else {
            onError && onError("Необхідно вказати значення властивості");
        }
    }

    return (
        <tr className={ className }>
            <th scope="row" className='text-center ms-4 me-4'><p className="p-1 m-0">{ idx }</p></th>
            <td><p className="p-1 m-0">{ item && item.id }</p></td>
            <td style={{ width: '100%' }}>
                <p className={ editMode ? "d-none" : "p-1 m-0" }> { item && item.value }</p>
                <div className={ editMode ? "position-relative d-flex align-items-center" : "d-none"} >
                    <Input className={ isValid ? 'property-table__input' : 'property-table__input__invalid' } invalid={ !isValid } value={ value } onInput={ handleInput }/>
                    <div className="d-inline-block overflow-hidden p-2">
                        <FaCheck className="property-table__icon" onClick={ acceptEditing } />
                    </div>
                    <div className="d-inline-block overflow-hidden p-2">
                        <FaBan className="property-table__icon" onClick={ cancelEditing } />
                    </div>
                    <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                </div>
            </td>
            <CollapsedActions item={ item } editMode={ editMode } onDelete={ () => onDelete && onDelete(item) } onEdit={ () => setEditMode(true) } link={ `${link}/${ item && item.id }` } />
        </tr>
    );
}

export default PropertyTableRow;