import { useEffect, useState } from "react";
import { FormFeedback, Input } from "reactstrap";





const EditableCell = ({ value, editMode, validationRule, validationErrorText, onInput, required }) => {
    const [currentValue, setCurrentValue] = useState({ value: '', isValid: true });

    useEffect(() => {
        if(value !== undefined) {
            const isValid = validationRule ? validationRule(value) : true;
            setCurrentValue( { value: value, isValid: isValid });
        }
    }, [value, validationRule]);

    const handleInput = (e) => {
        const isValid = validationRule ? validationRule(e.target.value) : true;
        setCurrentValue( { value: e.target.value, isValid: isValid });
        onInput && onInput({ value: e.target.value, isValid: isValid });
    }

    return (
        <>
            { editMode ?
                <div className={ required ? "position-relative mb-0 required" : "position-relative mb-0" }>
                    <Input type="text" value={ currentValue.value } onInput={ handleInput } invalid={ !currentValue.isValid } />
                    <FormFeedback tooltip>{ validationErrorText }</FormFeedback>
                </div>
                :
                value
            }
        </>
    );
}

export default EditableCell;