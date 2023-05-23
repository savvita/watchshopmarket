import { useEffect, useState } from "react";
import { FaBan, FaCheck } from "react-icons/fa";
import { FormFeedback, Input, UncontrolledTooltip } from "reactstrap";


import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';


const EditableCell = ({ item, editMode, onAccept, onCancel, validationRule, validationErrorText }) => {
    const [value, setValue] = useState({
        text: '',
        rate: null
    });
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(!item) {
            return;
        }

        setValue({
            text: item.text ?? "",
            rate: item.rate
        });
        if(validationRule) {
            setIsValid(validationRule(item.text));
        }
        else {
            setIsValid(true);
        }
    }, [item]);

    const handleInput = (e) => {
        const isValid = validationRule ? validationRule(e.target.value) : true;
        setValue({
            ...value,
            text: e.target.value
        });
        setIsValid(isValid);
    }

    const accept = () => {
        if(isValid) {
            onAccept && onAccept(value);
        }
    }

    const cancel = () => {
        if(item) {
            setValue({
                text: item.text,
                rate: item.rate
            });
            setIsValid(true);
        }
        onCancel && onCancel();
    }

    const setRate = (e) => {
        setValue({
            ...value,
            rate: e.rating
        })
    }

    return (
        <>
            { editMode ?
                <div>
                    <Rater total={5} rating={value.rate ?? 0} style={{ fontSize: '2rem' }} onRate={ setRate } />
                    <div className="position-relative">
                        <Input type="textarea" value={ value.text } onInput={ handleInput } invalid={ !isValid } style={{ minHeight: '20rem' }} maxLength="500" />
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
                value.text
            }
        </>
    );
}

export default EditableCell;