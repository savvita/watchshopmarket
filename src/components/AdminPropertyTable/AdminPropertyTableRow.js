import AdminCollapsedActions from '../AdminPropertyTable/AdminCollapsedActions';

import { Input, FormFeedback } from 'reactstrap';
import { FaCheck, FaBan } from "react-icons/fa";

import { useState, useEffect } from 'react';


const AdminPropertyTableRow = ({ idx, item, className, onDelete, onCancel, onAccept, onError, onRestore }) => {

    const [editMode, setEditMode] = useState(!item);
    const [value, setValue] = useState('');
    const [isActive, setIsActive] = useState('true');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(item && item.value) {
            setValue(item.value);
            setIsValid(item.value.length > 0);
            setIsActive(item.isActive);
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
            setIsActive(item.isActive);
            setIsValid(item.value.length > 0);
        }
        else {
            setValue('');
            setIsActive('true');
            setIsValid(false);
        }

        onCancel && onCancel();
    }

    const acceptEditing = () => {
        if(isValid) {
            setValue('');
            setIsValid(false);
            setEditMode(false);
            onAccept && onAccept({ ...item, value: value, isActive: isActive });
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
                    <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                </div>
            </td>
            <td>
                { editMode ? 
                    <Input type="select" value={ isActive } onChange={ (e) => setIsActive(e.target.value) }>
                        <option value={ 'false' }>Ні</option>
                        <option value={ 'true' }>Так</option>
                    </Input>
                    :
                    <p className="p-1 m-0">{ item && item.isActive ? 'Так' : 'Ні' }</p> 
                }
            </td>
            { editMode && <td colSpan={ 3 }>
                <div className="d-inline-block overflow-hidden p-2">
                        <FaCheck className="property-table__icon" onClick={ acceptEditing } />
                </div>
                <div className="d-inline-block overflow-hidden p-2">
                    <FaBan className="property-table__icon" onClick={ cancelEditing } />
                </div>
            </td> }
            <AdminCollapsedActions item={ item } editMode={ editMode } onDelete={ () => onDelete && onDelete(item.id) } onRestore={ () => onRestore && onRestore(item) } onEdit={ () => setEditMode(true) } />
        </tr>
    );
}

export default AdminPropertyTableRow;