import { useEffect, useState } from "react";
import { FaBan, FaCheck } from "react-icons/fa";
import { FormFeedback, Input } from "reactstrap";






const ENInput = ({ visible, onAccept, onCancel, validationRule, validationErrorText }) => {

    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(validationRule) {
            setIsValid(validationRule(value));
        }
        else {
            setIsValid(true);
        }
    }, [validationRule]);

    const handleInput = (e) => {
        setValue(e.target.value);
        if(validationRule) {
            setIsValid(validationRule(e.target.value));
        }
        else {
            setIsValid(true);
        }
    }

    const accept = () => {
        if(!isValid) {
            return;
        }

        onAccept && onAccept(value);
    }

    const cancel = () => {
        setValue("");
        if(validationRule) {
            setIsValid(validationRule(""));
        }
        else {
            setIsValid(true);
        }

        onCancel && onCancel();
    }

    return (
        <div className={ visible ? "d-flex" : "d-none" }>
            <div className="position-relative">
                <Input type="text" value={ value } onInput={ handleInput } invalid={ !isValid } />
                <FormFeedback tooltip>{ validationErrorText }</FormFeedback>
            </div>
            <div className="d-inline-block overflow-hidden p-2">
                <FaCheck className="property-table__icon" onClick={ accept } />
            </div>
            <div className="d-inline-block overflow-hidden p-2">
                <FaBan className="property-table__icon" onClick={ cancel } />
            </div>
        </div>
    )
}

export default ENInput;