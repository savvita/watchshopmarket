import { Input, FormFeedback, DropdownItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, UncontrolledTooltip } from 'reactstrap';
import { FaRegTrashAlt, FaRegEdit, FaRegEye, FaCheck, FaBan, FaBars } from "react-icons/fa";

import { useState, useEffect } from 'react';

import './PropertyTable.css';

const PropertyTableRow = ({ idx, item, className, onDelete, onCancel, onAccept, onError, onView }) => {

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
                    <FormFeedback tooltip>The field is required</FormFeedback>
                </div>
            </td>
            <td colSpan="3" className="property-table__collapse__collapsed">
                <UncontrolledDropdown>
                    <DropdownToggle caret color="dark">
                        <FaBars className="property-table__icon"  />
                    </DropdownToggle>
                    <DropdownMenu dark className='text-center'>
                        <DropdownItem>
                            <div id={ item ? `table_row_dropdown_${ item.id }_view` : `table_row_dropdown_view` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                                <FaRegEye className="property-table__icon" onClick={ () => item && onView && onView(item.id) } />
                            </div>
                            <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ item.id }_view` : `table_row_dropdown_view` } >
                                Переглянути
                            </UncontrolledTooltip>
                        </DropdownItem>
                        <DropdownItem>
                            <div id={ item ? `table_row_dropdown_${ item.id }_edit` : `table_row_dropdown_edit` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1 position-relative" }>
                                <FaRegEdit className="property-table__icon" onClick={ () => setEditMode(true) } />
                            </div>
                            <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ item.id }_edit` : `table_row_dropdown_edit` } >
                                Редагувати
                            </UncontrolledTooltip>
                        </DropdownItem>
                        <DropdownItem>
                            <div id={ item ? `table_row_dropdown_${ item.id }_delete` : `table_row_dropdown_delete` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                                <FaRegTrashAlt className="property-table__icon" onClick={ () => onDelete && onDelete(item) } />
                            </div>
                            <UncontrolledTooltip placement="right" target={ item ? `table_row_dropdown_${ item.id }_delete` : `table_row_dropdown_delete` } >
                                Видалити
                            </UncontrolledTooltip>
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
            <td className='text-center property-table__collapse__expanded'>
                <div id={ item ? `table_row_${ item.id }_view` : `table_row_view` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                    <FaRegEye className="property-table__icon" onClick={ () => item && onView && onView(item.id) } />
                </div>
                <UncontrolledTooltip placement="right" target={ item ? `table_row_${ item.id }_view` : `table_row_view` } >
                    Переглянути
                </UncontrolledTooltip>
            </td>
            <td className='text-center property-table__collapse__expanded'>
                <div id={ item ? `table_row_${ item.id }_edit` : `table_row_edit` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1 position-relative" }>
                    <FaRegEdit className="property-table__icon" onClick={ () => setEditMode(true) } />
                </div>
                <UncontrolledTooltip placement="right" target={ item ? `table_row_${ item.id }_edit` : `table_row_edit` } >
                    Редагувати
                </UncontrolledTooltip>
            </td>
            <td className='text-center property-table__collapse__expanded'>
                <div id={ item ? `table_row_${ item.id }_delete` : `table_row_delete` } className={ editMode ? 'd-none' : "d-inline-block overflow-hidden p-1" }>
                    <FaRegTrashAlt className="property-table__icon" onClick={ () => onDelete && onDelete(item) } />
                </div>
                <UncontrolledTooltip placement="right" target={ item ? `table_row_${ item.id }_delete` : `table_row_delete` } >
                    Видалити
                </UncontrolledTooltip>
            </td>
        </tr>
    );
}

export default PropertyTableRow;