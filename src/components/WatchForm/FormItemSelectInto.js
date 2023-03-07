import FormItemSelect from './FormItemSelect';

import { useEffect, useState } from 'react';
import { FormGroup, Input, Label, Row, Col, Button } from 'reactstrap';

const FormItemSelectInto = ({ name, title, items, onChange }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [notSelectedItems, setNotSelectedItems] = useState([]);

    const [selectedItem, setSelectedItem] = useState(-1);
    const [notSelectedItem, setNotSelectedItem] = useState(-1);

    useEffect(() => {
        setNotSelectedItems(items);
    }, [items]);

    const addToSelected = () => {
        if(!notSelectedItem || notSelectedItem <= 0) {
            return;
        }

        const item = notSelectedItems.value.find(item => item.id === parseInt(notSelectedItem));

        if(item) {
            setSelectedItems([...selectedItems, item]);
            setNotSelectedItems({ value: notSelectedItems.value.filter(item => item.id !== parseInt(notSelectedItem)) });
            setSelectedItem(notSelectedItem);
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
            setNotSelectedItems({ value: [...notSelectedItems.value, item] });
            setSelectedItem(items.length > 0 ? items[0].id : -1);
        }
    }

    useEffect(() => {
        onChange && onChange(selectedItems);
    }, [selectedItems]);


    return (
        <fieldset className="border border-secondary rounded-2 p-2">
            <legend className="fs-6 ps-2">{ title }</legend>
            <Row>
                <Col md="6" sm="12">
                    <FormItemSelect name={ name } title='&nbsp;' items={ notSelectedItems } onChange={ (value) => setNotSelectedItem(value) } />
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