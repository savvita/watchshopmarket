
import { useEffect, useState } from 'react';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';

const FormItemInput = ({ name, title, inititalValue, validation, validationErrorText, onInput }) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(inititalValue) {
            setValue(inititalValue);
            if(validation) {
                setIsValid(validation(inititalValue));
            }
            else {
                setIsValid(true);
            }
        }
    }, [inititalValue]);

    useEffect(() => {
        if(validation) {
            setIsValid(validation(value));
        }
        else {
            setIsValid(true);
        }
    }, [validation, value]);


    const handleInput = (e) => {
        setValue(e.target.value);
        if(validation) {
            setIsValid(validation(e.target.value));
        }
        else {
            setIsValid(true);
        }
        onInput && onInput(e.target.value);
    }

    return (
        <FormGroup className='position-relative'>
            <Label className="ps-2">{ title }</Label>
            <Input name={ name } type="text" value={ value } onInput ={ handleInput } invalid={ !isValid } />
            { validationErrorText && <FormFeedback tooltip>{ validationErrorText }</FormFeedback> }
        </FormGroup>
    );
}

export default FormItemInput;