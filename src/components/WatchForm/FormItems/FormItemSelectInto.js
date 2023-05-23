
import { useEffect, useState } from 'react';
import { FaBan, FaCheck, FaPlusCircle } from 'react-icons/fa';
import { FormGroup, Input, Label, Row, Col, Button, FormFeedback, UncontrolledTooltip } from 'reactstrap';

const FormItemSelectInto = ({ name, title, items, initialValues, onChange, onAdd }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [notSelectedItems, setNotSelectedItems] = useState([]);

    const [selectedItem, setSelectedItem] = useState(-1);
    const [notSelectedItem, setNotSelectedItem] = useState(-1);

    useEffect(() => {
        if(initialValues) {
            setSelectedItems(initialValues);
            if(items && items.value) {
                const values = items.value.filter(i => initialValues.find(item => item.id === i.id) === undefined);
                setNotSelectedItems(values);
                setNotSelectedItem(values.length > 0 ? values[0].id : -1);
            }
            setSelectedItem(initialValues.length > 0 ? initialValues[0].id : -1);
        }

    }, []);

    const comparator = (a, b) => {
        if(a.value < b.value) {
            return -1;
        }

        if(a.value > b.value) {
            return 1;
        }

        return 0;
    }

    useEffect(() => {
        if(!items || !items.value) {
            return;
        }

        let tmp = [...items.value];
        tmp.sort(comparator);

        if(initialValues) {
            setSelectedItems(initialValues);
            const values = tmp.filter(i => initialValues.find(item => item.id === i.id) === undefined);
            setNotSelectedItems(values);
            setNotSelectedItem(values.length > 0 ? values[0].id : -1);

            setSelectedItem(initialValues.length > 0 ? initialValues[0].id : -1);
        }
        else {
            setNotSelectedItems([...tmp]);
        }
    }, [items, initialValues]);

    const addToSelected = () => {
        if(!notSelectedItem || notSelectedItem <= 0) {
            return;
        }

        const item = notSelectedItems.find(item => item.id === parseInt(notSelectedItem));

        if(item) {
            setSelectedItems([...selectedItems, item]);
            setNotSelectedItems(notSelectedItems.filter(item => item.id !== parseInt(notSelectedItem)));
            setSelectedItem(notSelectedItem);
            onChange && onChange([...selectedItems, item]);
        }
    }

    const removeFromSelected = () => {
        if(!selectedItem || selectedItem <= 0) {
            return;
        }

        const item = selectedItems.find(item => item.id === parseInt(selectedItem));

        if(item) {
            const items = selectedItems.filter(item => item.id !== parseInt(selectedItem));
            setSelectedItems(items);
            setNotSelectedItems([...notSelectedItems, item]);
            setSelectedItem(items.length > 0 ? items[0].id : -1);
            onChange && onChange(items);
        }
    }

    const [addMode, setAddMode] = useState(false);
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInput = (e) => {
        setValue(e.target.value);
        setIsValid(e.target.value.length > 0);
    }

    const accept = async () => {
        if(isValid) {
            const i = onAdd && await onAdd(value);
            if(i) {
                setNotSelectedItem(i);
            }

            setAddMode(false);
        }
    }

    const cancel = () => {
        setValue("");
        setIsValid(false);
        setAddMode(false);
    }


    return (
        <fieldset className="border border-secondary rounded-2 p-2">
            <legend className="fs-6 ps-2">
                <Label className="ps-2 d-flex align-items-center">
                    { title }
                    <div id={ `${ name }__new` } className="d-inline-block overflow-hidden p-1" onClick={ () => setAddMode(true) }>
                        <FaPlusCircle className="property-table__icon property-table__icon__dark" />
                    </div>
                    <UncontrolledTooltip placement="right" target={ `${ name }__new` } >
                        Додати нове
                    </UncontrolledTooltip>
                </Label>
            </legend>
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
            <Row>
                <Col md="6" sm="12">
                    <FormGroup>
                        <Label className="ps-2">&nbsp;</Label>
                        <Input name={ name } type="select" value={ notSelectedItem } onChange={ (e) => setNotSelectedItem(e.target.value) }>
                            <option value={ 0 }>Виберіть...</option>
                            { notSelectedItems && notSelectedItems.map(item => <option key={ item.id } value={ item.id }>{ item.value }</option>)}
                        </Input>
                    </FormGroup>
                    <Button style={{ width: '13rem' }} onClick={ addToSelected }>Додати</Button>
                </Col>
                <Col md="6" sm="12">
                    <FormGroup>
                        <Label className="ps-2">Обране</Label>
                        <Input name={ name } placeholder={ title } type="select" value={ selectedItem } onChange={ (e) => setSelectedItem(e.target.value) }>
                            { selectedItems && selectedItems.map(item => <option key={ item.id } value={ item.id }>{ item.value }</option>)}
                        </Input>
                    </FormGroup>
                    <Button style={{ width: '13rem' }} onClick={ removeFromSelected }>Видалити</Button>
                </Col>
            </Row>
        </fieldset>
    );
}

export default FormItemSelectInto;