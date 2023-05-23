

import { useEffect, useState } from 'react';
import { FaBan, FaCheck, FaPlusCircle } from 'react-icons/fa';
import { FormFeedback, FormGroup, Input, Label, UncontrolledTooltip } from 'reactstrap';

const FormItemSelect = ({ name, title, items, initialIndex, onChange, onAdd }) => {

    const [addMode, setAddMode] = useState(false);
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const [values, setValues] = useState([]);

    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if(initialIndex) {
            setIdx(initialIndex);
        }
    }, [initialIndex]);

    useEffect(() => {
        if(!items || !items.value) {
            return;
        }

        let tmp = [...items.value];
        tmp.sort(comparator);


        setValues([...tmp]);
    }, [items]);


    const comparator = (a, b) => {
        if(a.value < b.value) {
            return -1;
        }

        if(a.value > b.value) {
            return 1;
        }

        return 0;
    }

    const handleInput = (e) => {
        setValue(e.target.value);
        setIsValid(e.target.value.length > 0);
    }

    const accept = async () => {
        if(isValid) {
            const i = onAdd && await onAdd(value);
            if(i) {
                setIdx(i);
            }

            setAddMode(false);
            setValue("");
            setIsValid(false);
        }
    }

    const cancel = () => {
        setValue("");
        setIsValid(false);
        setAddMode(false);
    }

    return (
        <FormGroup>
            <Label className="ps-2 d-flex align-items-center">
                { title }
                <div id={ `${ name }__new` } className="d-inline-block overflow-hidden p-1" onClick={ () => setAddMode(true) }>
                    <FaPlusCircle className="property-table__icon property-table__icon__dark" />
                </div>
                <UncontrolledTooltip placement="right" target={ `${ name }__new` } >
                    Додати нове
                </UncontrolledTooltip>
            </Label>
            <div className={ addMode ? "position-relative d-flex align-items-center mb-2" : 'd-none' }>
                <Input type="text" className={ isValid ? 'property-table__input' : 'property-table__input__invalid' } invalid={ !isValid } value={ value } onInput={ handleInput }/>
                <div className="d-inline-block overflow-hidden p-2">
                    <FaCheck className="property-table__icon property-table__icon__dark" onClick={ accept } />
                </div>
                <div className="d-inline-block overflow-hidden p-2">
                    <FaBan className="property-table__icon property-table__icon__dark" onClick={ cancel } />
                </div>
                <FormFeedback tooltip>Обов’язкове поле</FormFeedback>
            </div>
            <Input name={ name } placeholder={ title } value={ idx ?? 0 } type="select" onChange={ (e) => onChange && onChange(e.target.value) }>
                <option value={ 0 }>Виберіть...</option>
                { values && values.map(item => <option key={ item.id } value={ item.id }>{ item.value }</option>)}
            </Input>
        </FormGroup>
    );
}

export default FormItemSelect;