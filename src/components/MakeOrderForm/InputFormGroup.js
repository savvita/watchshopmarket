
import { useEffect, useState } from "react";
import { FormGroup, Label, Input, FormFeedback, Row, Col } from "reactstrap";


const InputFormGroup = ({ title, placeholder, name, validationRule, validationErrorText, onChange }) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(validationRule) {
            setIsValid(validationRule(value));
        }
        else {
            setIsValid(true);
        }
    }, []);

    const handleInput = (e) => {
        setValue(e.target.value);
        
        if(validationRule) {
            setIsValid(validationRule(e.target.value));
        }
        else {
            setIsValid(true);
        }
        onChange && onChange(e.target.value);
    }

    return (
        <FormGroup className='position-relative'>
            <Row>
                <Col sm="12" md="4">
                    <Label className="ps-2">{ title }</Label>
                </Col>
                <Col sm="12" md="8">
                    <Input name={ name } type="text" value={ value } onInput ={ handleInput } invalid={ !isValid } placeholder={ placeholder } />
                    { validationErrorText && <FormFeedback tooltip>{ validationErrorText }</FormFeedback> }
                </Col>
            </Row>
        </FormGroup>
    );
}

export default InputFormGroup;