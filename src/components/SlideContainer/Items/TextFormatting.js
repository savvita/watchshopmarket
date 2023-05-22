import { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";

import validation from '.././../../modules/validation';

const TextFormatting = ({ onAdd, onChange }) => {
    const [item, setItem] = useState({
        text: {
            value: '',
            isValid: false
        },
        size: {
            value: 14,
            isValid: true
        },
        left: {
            value: 0,
            isValid: true
        },
        top: {
            value: 0,
            isValid: true
        },
        color: '#000000'
    });

    const [isValid, setIsValid] = useState(false);

    const handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.getAttribute('name');

        switch(name) {
            case 'text':
                setItem({ ...item, text: { value: value, isValid: validation.notEmptyValidationRule(value) }});
                break;
            case 'size':
                setItem({ ...item, size: { value: value, isValid: validation.positiveIntValidationRule(value) }});
                break;
            case 'left':
                setItem({ ...item, left: { value: value, isValid: validation.intValidationRule(value) }});
                break;
            case 'top':
                setItem({ ...item, top: { value: value, isValid: validation.intValidationRule(value) }});
                break;
            case 'color':
                setItem({ ...item, color: value });
                break;
        }
    }


    useEffect(() => {
        if(!item) {
            return;
        }

        const valid = item.text.isValid && item.size.isValid && item.left.isValid && item.top.isValid;

        setIsValid(valid);

        if(valid) {
            onChange && onChange({ 
                text: item.text.value,
                top: item.top.value,
                left: item.left.value,
                fontSize: item.size.value,
                fontColor: item.color
            });
        }
    }, [item]);


    const add = () => {
        if(isValid) {
            onAdd && onAdd({ 
                text: item.text.value,
                top: item.top.value,
                left: item.left.value,
                fontSize: item.size.value,
                fontColor: item.color
             });
        }

        setItem({
            text: {
                value: '',
                isValid: false
            },
            size: {
                value: 14,
                isValid: true
            },
            left: {
                value: 0,
                isValid: true
            },
            top: {
                value: 0,
                isValid: true
            },
            color: '#000000'
        });
    }

    return (
        <div>
            <Row>
                <Col>
                    <Input type="text" placeholder="Введіть текст" name="text" value={ item.text.value } onInput={ handleInput } />
                </Col>
            </Row>
            <fieldset className="border-bottom pb-2">
                <legend className="fs-5">Шрифт</legend>
                <Row>
                    <Col xs="12" sm="6">
                        <Input type="text" placeholder="Розмір" name="size" value={ item.size.value } onInput={ handleInput } />
                    </Col>
                    <Col xs="12" sm="6" className="d-flex justify-content-start">
                        <Input type="color" style={{ width: '3rem' }} name="color" value={ item.color } onChange={ handleInput } />
                    </Col>
                </Row>
            </fieldset>

            <fieldset className="border-bottom pb-2">
                <legend className="fs-5">Позиція</legend>
                <Row>
                    <Col xs="12" sm="6">
                        <FormGroup floating>
                            <Input id="left" type="text" placeholder="Зліва" name="left" value={ item.left.value } onInput={ handleInput } />
                            <Label for="left">Зліва</Label>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                        <FormGroup floating>
                            <Input id="left" type="text" placeholder="Зверху" name="top" value={ item.top.value } onInput={ handleInput } />
                            <Label for="left">Зверху</Label>
                        </FormGroup>
                    </Col>
                </Row>
            </fieldset>
            <Button className="mt-2" disabled={ !isValid } onClick = { add }>Додати</Button>
        </div>
    );
}

export default TextFormatting;