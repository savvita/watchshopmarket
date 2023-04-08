import { useEffect, useState } from "react";
import { FaBan, FaCheck } from "react-icons/fa";
import { FormFeedback, Input, UncontrolledTooltip } from "reactstrap";





const EditableCell = ({ item, editMode, onAccept, onCancel, validationRule, validationErrorText }) => {
    const [value, setValue] = useState("");
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(!item) {
            return;
        }

        setValue(item.text ?? "");
        if(validationRule) {
            setIsValid(validationRule(item.text));
        }
        else {
            setIsValid(true);
        }
    }, [item]);

    const handleInput = (e) => {
        const isValid = validationRule ? validationRule(e.target.value) : true;
        setValue(e.target.value);
        setIsValid(isValid);
    }

    const accept = () => {
        if(isValid) {
            onAccept && onAccept(value);
        }
    }

    const cancel = () => {
        if(item) {
            setValue(item.text);
            setIsValid(true);
        }
        onCancel && onCancel();
    }

    return (
        <>
            { editMode ?
                <div>
                    <div className="position-relative">
                        <Input type="textarea" value={ value } onInput={ handleInput } invalid={ !isValid } style={{ minHeight: '20rem' }} maxLength="500" />
                        <FormFeedback tooltip>{ validationErrorText }</FormFeedback>
                    </div>
                    <div className="text-nowrap">
                        <div id={ `review__${ item.id }__save` } className="d-inline-block overflow-hidden p-1" onClick={ accept }>
                            <FaCheck className="property-table__icon" />
                        </div>
                        <UncontrolledTooltip placement="right" target={ `review__${ item.id }__save` } >
                            Зберегти
                        </UncontrolledTooltip>
                        <div id={ `review__${ item.id }__cancel` } className="d-inline-block overflow-hidden p-1" onClick={ cancel }>
                            <FaBan className="property-table__icon" />
                        </div>
                        <UncontrolledTooltip placement="right" target={ `review__${ item.id }__cancel` } >
                            Скасувати
                        </UncontrolledTooltip>
                    </div>
                </div>
                :
                value
            }
        </>
    );
}

export default EditableCell;