import CollapsedActions from '../CollapsedActions/CollapsedActions';

import { Input, FormFeedback } from 'reactstrap';
import { FaCheck, FaBan } from "react-icons/fa";

import { useState, useEffect } from 'react';

import './BrandPropertyTable.css';

const BrandPropertyTableRow = ({ idx, item, countries, className, onDelete, onCancel, onAccept, onError, link }) => {

    const [editMode, setEditMode] = useState(!item);
    const [value, setValue] = useState('');
    const [country, setCountry] = useState(0);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(item) {
            if(item.value) {
                setValue(item.value);
                setIsValid(item.value.length > 0);
            }
            if(item.country) {
                setCountry(item.country.id);
            }
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
        
        if(item) {
            setEditMode(false);
            if(item.value) {
                setValue(item.value);
                setIsValid(item.value.length > 0);
            }
            if(item.country) {
                setCountry(item.country.id);
            }
        }
        else {
            setValue('');
            setCountry(0);
            setIsValid(false);
        }

        onCancel && onCancel();
    }

    const acceptEditing = () => {
        if(isValid) {
            const val = countries.value.find(c => c.id === parseInt(country));
            setValue('');
            setCountry(0);
            setIsValid(false);
            setEditMode(false);

            onAccept && onAccept({ ...item, value: value, country: val });
        }
        else {
            onError && onError("Необхідно вказати значення властивості");
        }
    }

    return (
        <tr className={ className }>
            <th scope="row" className='text-center ms-4 me-4'><p className="p-1 m-0">{ idx }</p></th>
            <td><p className="p-1 m-0">{ item && item.id }</p></td>
            <td>
                <p className={ editMode ? "d-none" : "p-1 m-0" }> { item && item.value }</p>
                <div className={ editMode ? "position-relative d-flex align-items-center" : "d-none"} >
                    <Input className={ isValid ? 'property-table__input' : 'property-table__input__invalid' } invalid={ !isValid } value={ value } onInput={ handleInput }/>
                    <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
                </div>
            </td>
            <td>
                <p className={ editMode ? "d-none" : "p-1 m-0" }> { item && (item.country ? item.country.value : 'Не вказано') }</p>
                <div className={ editMode ? "position-relative d-flex align-items-center" : "d-none"} >
                    <Input type="select" value={ country } onChange={ (e) => setCountry(e.target.value) }>
                        <option value={ 0 }>Виберіть...</option>
                        {countries && countries.value && countries.value.map(country => <option key={ country.id } value={ country.id }>{ country.value }</option>)}
                    </Input>
                </div>
            </td>
            { editMode ? 
            <td colSpan="3">
                <div className="d-inline-block overflow-hidden p-2">
                        <FaCheck className="property-table__icon" onClick={ acceptEditing } />
                    </div>
                    <div className="d-inline-block overflow-hidden p-2">
                        <FaBan className="property-table__icon" onClick={ cancelEditing } />
                </div>
            </td>
            :
            <CollapsedActions item={ item } editMode={ editMode } onDelete={ () => onDelete && onDelete(item) } onEdit={ () => setEditMode(true) } link={ `${link}/${ item && item.id }` } /> }
        </tr>
    );
}

export default BrandPropertyTableRow;