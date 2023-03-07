
import { useEffect, useState } from 'react';
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';

const FormItemNumber = ({ name, title, validation, validationErrorText, min, max, onChange }) => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(validation) {
            setIsValid(validation(value));
        }
        else {
            setIsValid(true);
        }
    }, [validation]);

    const handleInput = (e) => {
        setValue(e.target.value);
        if(validation) {
            setIsValid(validation(e.target.value));
        }
        else {
            setIsValid(true);
        }

        onChange && onChange(e.target.value);
    }

    const handleKeyUp = (e) => {
        if((e.which < 48 || e.which > 57) && (e.which != 46 && e.which != 8))
        {
            setIsValid(false);
        }
    }
    return (
        <FormGroup className='position-relative'>
            <Label className="ps-2">{ title }</Label>
            <Input name={ name } type="number" min={ min } max={ max } value={ value } onInput ={ handleInput } invalid={ !isValid } onKeyUp={ handleKeyUp } />
            { validationErrorText && <FormFeedback tooltip>{ validationErrorText }</FormFeedback> }
        </FormGroup>
    );
}

export default FormItemNumber;